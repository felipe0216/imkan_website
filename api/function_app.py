"""Imkan.ai website API: contact form (/api/contact) and job applications (/api/apply).

Both endpoints accept either JSON (the current React site) or form data
(multipart/form-data or urlencoded, as posted by the new static site's forms).

Test mode (ADR 0004): submissions from preview environments or localhost are
stored in separate tables and only emailed to FORMS_TEST_RECIPIENTS, so testing
never touches real data or the real inbox. FORMS_TEST_MODE=1/0 forces it on/off.
"""

import azure.functions as func
import base64
import binascii
import html
import json
import logging
import os
import random
import re
import string
import threading
import time
from collections import defaultdict, deque
from datetime import datetime, timezone
from urllib.parse import urlparse

from azure.data.tables import TableEntity, TableServiceClient

app = func.FunctionApp()

# Default recipients for notifications (the Imkan owners). Override with the
# CONTACT_NOTIFICATION_RECIPIENTS env var (comma-separated addresses).
DEFAULT_NOTIFICATION_RECIPIENTS = ['felipe@imkan.ai']

CONTACT_TABLE = 'contactsubmissions'
APPLICATION_TABLE = 'jobapplications'

MAX_CV_BYTES = 5 * 1024 * 1024  # 5 MB

# CV type is decided by the file extension and confirmed by the file's first
# bytes; the browser-sent content type is not trusted.
CV_TYPES = {
    '.pdf': ('application/pdf', (b'%PDF-',)),
    '.doc': ('application/msword', (b'\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1',)),
    '.docx': (
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        (b'PK\x03\x04',),
    ),
}

# Maximum length per text field; longer values are rejected.
FIELD_LIMITS = {
    'firstName': 100,
    'lastName': 100,
    'phone': 40,
    'email': 254,
    'message': 5000,
    'jobTitle': 200,
    'jobId': 100,
    'linkedin': 300,
}

# Hidden field that people never see or fill in; bots often do.
HONEYPOT_FIELD = 'company_website'

EMAIL_RE = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')

# Preview environments of Azure Static Web Apps:
# <app-name>-<pr-number>.<region>.<n>.azurestaticapps.net
PREVIEW_HOST_RE = re.compile(r'^[a-z0-9-]+-\d+\.[a-z0-9]+\.\d+\.azurestaticapps\.net$')
LOCAL_HOSTS = {'localhost', '127.0.0.1', '::1'}

JSON_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
}
PREFLIGHT_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
}


class SubmissionError(ValueError):
    """A problem with the submitted data, reported to the user with a 400."""


# --------------------------------------------------------------------------
# Small helpers
# --------------------------------------------------------------------------


def _response(status_code, body):
    return func.HttpResponse(
        json.dumps(body),
        status_code=status_code,
        mimetype='application/json',
        headers=JSON_HEADERS,
    )


def _now_iso():
    return datetime.now(timezone.utc).replace(tzinfo=None).isoformat()


def _new_row_key():
    suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=7))
    return f'{int(time.time() * 1000)}_{suffix}'


def _env_flag(name):
    value = (os.environ.get(name) or '').strip().lower()
    if value in {'1', 'true', 'yes', 'on'}:
        return True
    if value in {'0', 'false', 'no', 'off'}:
        return False
    return None


def _request_host(req):
    """The host the visitor used, as best the platform tells us."""
    for header in ('x-forwarded-host', 'x-original-host'):
        value = req.headers.get(header)
        if value:
            return value.split(',')[0].strip().split(':')[0].lower()
    original_url = req.headers.get('x-ms-original-url')
    if original_url:
        host = urlparse(original_url).hostname
        if host:
            return host.lower()
    host = req.headers.get('host') or urlparse(req.url).hostname or ''
    return host.split(':')[0].lower()


def is_test_mode(req):
    forced = _env_flag('FORMS_TEST_MODE')
    if forced is not None:
        return forced
    host = _request_host(req)
    return host in LOCAL_HOSTS or bool(PREVIEW_HOST_RE.match(host))


def _client_ip(req):
    forwarded = (req.headers.get('x-forwarded-for') or '').split(',')[0].strip()
    if not forwarded:
        return 'unknown'
    # IPv4 with a port ("1.2.3.4:5678"): drop the port. IPv6 has more colons.
    if forwarded.count(':') == 1:
        forwarded = forwarded.split(':')[0]
    return forwarded


def _notification_recipients(test_mode):
    if test_mode:
        raw = os.environ.get('FORMS_TEST_RECIPIENTS') or ''
        return [addr.strip() for addr in raw.split(',') if addr.strip()]
    raw = os.environ.get('CONTACT_NOTIFICATION_RECIPIENTS')
    if raw:
        return [addr.strip() for addr in raw.split(',') if addr.strip()]
    return list(DEFAULT_NOTIFICATION_RECIPIENTS)


# --------------------------------------------------------------------------
# Rate limiting (per function instance; a burst guard, not a global quota)
# --------------------------------------------------------------------------

_rate_lock = threading.Lock()
_rate_hits = defaultdict(deque)


def _rate_limit_settings():
    try:
        limit = int(os.environ.get('FORMS_RATE_LIMIT', '5'))
    except ValueError:
        limit = 5
    try:
        window = int(os.environ.get('FORMS_RATE_WINDOW_SECONDS', '600'))
    except ValueError:
        window = 600
    return limit, window


def is_rate_limited(endpoint, ip, now=None):
    limit, window = _rate_limit_settings()
    if limit <= 0 or ip == 'unknown':
        return False
    now = time.monotonic() if now is None else now
    key = (endpoint, ip)
    with _rate_lock:
        hits = _rate_hits[key]
        while hits and now - hits[0] > window:
            hits.popleft()
        if len(hits) >= limit:
            return True
        hits.append(now)
        return False


def reset_rate_limits():
    with _rate_lock:
        _rate_hits.clear()


# --------------------------------------------------------------------------
# Reading the request
# --------------------------------------------------------------------------


def _is_form_request(req):
    content_type = (req.headers.get('content-type') or '').lower()
    return content_type.startswith('multipart/form-data') or content_type.startswith(
        'application/x-www-form-urlencoded'
    )


def read_submission(req, field_names):
    """Return (fields, cv) where cv is None or {'bytes', 'name', 'source'}.

    Raises SubmissionError for an unreadable body.
    """
    cv = None
    if _is_form_request(req):
        form = req.form
        fields = {name: (form.get(name) or '') for name in field_names}
        fields[HONEYPOT_FIELD] = form.get(HONEYPOT_FIELD) or ''
        upload = req.files.get('cv') or req.files.get('cvFile')
        if upload is not None and upload.filename:
            data = upload.read(MAX_CV_BYTES + 1)
            cv = {'bytes': data, 'name': upload.filename, 'source': 'upload'}
    else:
        try:
            body = req.get_json()
        except ValueError:
            raise SubmissionError('Request must contain valid JSON or form data')
        if not isinstance(body, dict):
            raise SubmissionError('Request must contain valid JSON or form data')
        fields = {name: body.get(name) or '' for name in field_names}
        fields[HONEYPOT_FIELD] = body.get(HONEYPOT_FIELD) or ''
        cv_base64 = (body.get('cvBase64') or '').strip()
        if cv_base64:
            try:
                data = base64.b64decode(cv_base64, validate=True)
            except (binascii.Error, ValueError):
                raise SubmissionError('Invalid CV file encoding')
            cv = {'bytes': data, 'name': body.get('cvFileName') or '', 'source': 'json'}

    fields = {name: str(value).strip() for name, value in fields.items()}
    for name, limit in FIELD_LIMITS.items():
        if name in fields and len(fields[name]) > limit:
            raise SubmissionError(f'{name} is too long (maximum {limit} characters)')
    return fields, cv


def validate_cv(cv):
    """Return (bytes, safe_name, content_type) or raise SubmissionError."""
    if not cv or not cv.get('name'):
        raise SubmissionError('CV file is required')
    data = cv['bytes']
    if len(data) == 0:
        raise SubmissionError('CV file is empty')
    if len(data) > MAX_CV_BYTES:
        raise SubmissionError('CV file must be 5 MB or smaller')

    safe_name = os.path.basename(cv['name'].replace('\\', '/')).replace('..', '').strip()
    extension = os.path.splitext(safe_name)[1].lower()
    if extension not in CV_TYPES:
        raise SubmissionError('CV must be a PDF or Word document (.pdf, .doc, .docx)')
    content_type, signatures = CV_TYPES[extension]
    if not any(data.startswith(sig) for sig in signatures):
        raise SubmissionError('CV file content does not match its type (.pdf, .doc, .docx)')
    return data, safe_name, content_type


# --------------------------------------------------------------------------
# Storage and email
# --------------------------------------------------------------------------


def _table_name(base, test_mode):
    return f'{base}test' if test_mode else base


def save_entity(table_name, entity):
    connection_string = os.environ.get('AZURE_STORAGE_CONNECTION_STRING')
    if not connection_string:
        raise RuntimeError('Storage connection string not configured')
    table_service = TableServiceClient.from_connection_string(connection_string)
    try:
        table_service.create_table(table_name)
    except Exception:
        pass  # Table already exists.
    table_service.get_table_client(table_name).create_entity(entity)


def _send_email(subject, plain_text, html_body, recipients, reply_to=None, attachments=None):
    """Best-effort email through Azure Communication Services. Returns True if sent."""
    connection_string = os.environ.get('ACS_EMAIL_CONNECTION_STRING')
    sender_address = os.environ.get('ACS_SENDER_ADDRESS')
    if not connection_string or not sender_address:
        logging.warning('ACS email not configured; skipping notification email.')
        return False
    if not recipients:
        logging.info('No notification recipients for this mode; skipping email.')
        return False
    try:
        from azure.communication.email import EmailClient

        message = {
            'senderAddress': sender_address,
            'recipients': {'to': [{'address': addr} for addr in recipients]},
            'content': {'subject': subject, 'plainText': plain_text, 'html': html_body},
        }
        if reply_to:
            message['replyTo'] = [reply_to]
        if attachments:
            message['attachments'] = attachments
        EmailClient.from_connection_string(connection_string).begin_send(message).result()
        logging.info('Notification email sent to %d recipient(s)', len(recipients))
        return True
    except Exception as exc:  # noqa: BLE001 - email must never break a submission
        logging.error('Failed to send notification email: %s', type(exc).__name__)
        return False


def _row(label, value, top=False):
    align = ' vertical-align: top;' if top else ''
    wrap = ' white-space: pre-wrap;' if top else ''
    return (
        f'<tr><td style="padding: 8px 12px; font-weight: bold; background: #f4f4f4; width: 150px;{align}">'
        f'{label}</td><td style="padding: 8px 12px;{wrap}">{html.escape(value)}</td></tr>'
    )


def _email_html(title, intro, rows, submitted_at):
    return (
        '<div style="font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; max-width: 560px;">'
        f'<h2 style="margin: 0 0 16px;">{title}</h2>'
        f'<p style="margin: 0 0 16px; color: #555;">{intro}</p>'
        f'<table style="border-collapse: collapse; width: 100%;">{"".join(rows)}</table>'
        f'<p style="margin: 16px 0 0; color: #888; font-size: 12px;">Submitted {html.escape(submitted_at)} (UTC)</p>'
        '</div>'
    )


def send_notification_email(fields, submitted_at, test_mode):
    full_name = f'{fields["firstName"]} {fields["lastName"]}'.strip()
    message_text = fields['message'] or '(no message provided)'
    prefix = '[TEST] ' if test_mode else ''
    plain = (
        f'{prefix}New contact form submission from imkan.ai\n\n'
        f'Name:    {full_name}\nEmail:   {fields["email"]}\nPhone:   {fields["phone"]}\n'
        f'Message: {message_text}\n\nSubmitted: {submitted_at} (UTC)'
    )
    body = _email_html(
        f'{prefix}New contact form submission',
        'Someone reached out through the imkan.ai website.',
        [
            _row('Name', full_name),
            _row('Email', fields['email']),
            _row('Phone', fields['phone']),
            _row('Message', message_text, top=True),
        ],
        submitted_at,
    )
    return _send_email(
        f'{prefix}New website enquiry: {full_name}',
        plain,
        body,
        _notification_recipients(test_mode),
        reply_to={'address': fields['email'], 'displayName': full_name},
    )


def send_application_email(fields, submitted_at, cv_bytes, cv_name, cv_type, test_mode):
    full_name = f'{fields["firstName"]} {fields["lastName"]}'.strip() or '(not provided)'
    email = fields['email'] or '(not provided)'
    phone = fields['phone'] or '(not provided)'
    linkedin = fields['linkedin'] or '(not provided)'
    cover = fields['message'] or '(no message provided)'
    prefix = '[TEST] ' if test_mode else ''
    plain = (
        f'{prefix}New job application from imkan.ai\n\n'
        f'Role:     {fields["jobTitle"]}\nName:     {full_name}\nEmail:    {email}\n'
        f'Phone:    {phone}\nLinkedIn/Portfolio: {linkedin}\nCV:       {cv_name} (attached)\n\n'
        f'Cover letter:\n{cover}\n\nSubmitted: {submitted_at} (UTC)'
    )
    body = _email_html(
        f'{prefix}New job application',
        'Someone applied through the imkan.ai careers page.',
        [
            _row('Role', fields['jobTitle']),
            _row('Name', full_name),
            _row('Email', email),
            _row('Phone', phone),
            _row('LinkedIn/Portfolio', linkedin),
            _row('CV', f'{cv_name} (attached)'),
            _row('Cover letter', cover, top=True),
        ],
        submitted_at,
    )
    reply_to = {'address': fields['email'], 'displayName': full_name} if fields['email'] else None
    return _send_email(
        f'{prefix}New job application: {fields["jobTitle"]} - {full_name}',
        plain,
        body,
        _notification_recipients(test_mode),
        reply_to=reply_to,
        attachments=[
            {
                'name': cv_name,
                'contentType': cv_type,
                'contentInBase64': base64.b64encode(cv_bytes).decode('ascii'),
            }
        ],
    )


# --------------------------------------------------------------------------
# Handlers
# --------------------------------------------------------------------------

CONTACT_FIELDS = ['firstName', 'lastName', 'phone', 'email', 'message']
APPLICATION_FIELDS = [
    'firstName', 'lastName', 'phone', 'email', 'jobTitle', 'jobId', 'linkedin', 'message',
]


def _preflight_or_method_error(req):
    if req.method == 'OPTIONS':
        return func.HttpResponse(status_code=200, headers=PREFLIGHT_HEADERS)
    if req.method != 'POST':
        return _response(405, {'error': 'Method not allowed'})
    return None


def handle_contact(req):
    early = _preflight_or_method_error(req)
    if early is not None:
        return early

    test_mode = is_test_mode(req)
    ip = _client_ip(req)
    if is_rate_limited('contact', ip):
        return _response(429, {
            'error': 'Too many submissions',
            'message': 'Please wait a few minutes before sending another message.',
        })

    try:
        fields, _ = read_submission(req, CONTACT_FIELDS)

        if fields[HONEYPOT_FIELD]:
            logging.info('Contact form: honeypot filled; discarded')
            return _response(200, {'success': True, 'message': 'Contact form submitted successfully'})

        missing = [name for name in ('firstName', 'lastName', 'phone', 'email') if not fields[name]]
        if missing:
            return _response(400, {
                'error': 'Missing required fields',
                'required': ['firstName', 'lastName', 'phone', 'email'],
            })
        if not EMAIL_RE.match(fields['email']):
            return _response(400, {'error': 'Invalid email format'})

        submitted_at = _now_iso()
        row_key = _new_row_key()
        entity = TableEntity()
        entity['PartitionKey'] = 'contact'
        entity['RowKey'] = row_key
        for name in CONTACT_FIELDS:
            entity[name] = fields[name]
        entity['submittedAt'] = submitted_at
        entity['ipAddress'] = ip
        entity['userAgent'] = req.headers.get('user-agent', 'unknown')

        save_entity(_table_name(CONTACT_TABLE, test_mode), entity)
        logging.info('Contact form saved: %s (test mode: %s)', row_key, test_mode)

        emailed = send_notification_email(fields, submitted_at, test_mode)
        return _response(200, {
            'success': True,
            'message': 'Contact form submitted successfully',
            'submissionId': row_key,
            'emailed': emailed,
            'testMode': test_mode,
        })

    except SubmissionError as exc:
        return _response(400, {'error': 'Invalid request body', 'message': str(exc)})
    except Exception as exc:  # noqa: BLE001
        logging.error('Error processing contact form: %s', type(exc).__name__)
        return _response(500, {
            'error': 'Failed to process contact form',
            'message': 'Something went wrong on our side. Please try again later.',
        })


def handle_apply(req):
    early = _preflight_or_method_error(req)
    if early is not None:
        return early

    test_mode = is_test_mode(req)
    ip = _client_ip(req)
    if is_rate_limited('apply', ip):
        return _response(429, {
            'error': 'Too many submissions',
            'message': 'Please wait a few minutes before sending another application.',
        })

    try:
        fields, cv = read_submission(req, APPLICATION_FIELDS)

        if fields[HONEYPOT_FIELD]:
            logging.info('Job application: honeypot filled; discarded')
            return _response(200, {'success': True, 'message': 'Application submitted successfully'})

        if not fields['jobTitle']:
            return _response(400, {'error': 'Missing required fields', 'required': ['jobTitle', 'cvFile']})

        try:
            cv_bytes, cv_name, cv_type = validate_cv(cv)
        except SubmissionError as cv_error:
            return _response(400, {'error': str(cv_error)})

        if fields['email'] and not EMAIL_RE.match(fields['email']):
            return _response(400, {'error': 'Invalid email format'})

        submitted_at = _now_iso()
        row_key = _new_row_key()
        entity = TableEntity()
        entity['PartitionKey'] = 'application'
        entity['RowKey'] = row_key
        for name in APPLICATION_FIELDS:
            entity[name] = fields[name]
        entity['cvFileName'] = cv_name
        entity['cvContentType'] = cv_type
        entity['cvSizeBytes'] = len(cv_bytes)
        entity['submittedAt'] = submitted_at
        entity['ipAddress'] = ip
        entity['userAgent'] = req.headers.get('user-agent', 'unknown')

        save_entity(_table_name(APPLICATION_TABLE, test_mode), entity)
        logging.info('Job application saved: %s (test mode: %s)', row_key, test_mode)

        emailed = send_application_email(fields, submitted_at, cv_bytes, cv_name, cv_type, test_mode)
        return _response(200, {
            'success': True,
            'message': 'Application submitted successfully',
            'submissionId': row_key,
            'emailed': emailed,
            'testMode': test_mode,
        })

    except SubmissionError as exc:
        return _response(400, {'error': 'Invalid request body', 'message': str(exc)})
    except Exception as exc:  # noqa: BLE001
        logging.error('Error processing job application: %s', type(exc).__name__)
        return _response(500, {
            'error': 'Failed to process application',
            'message': 'Something went wrong on our side. Please try again later.',
        })


@app.route(route='contact', methods=['GET', 'POST', 'OPTIONS'], auth_level=func.AuthLevel.ANONYMOUS)
def contact(req: func.HttpRequest) -> func.HttpResponse:
    return handle_contact(req)


@app.route(route='apply', methods=['GET', 'POST', 'OPTIONS'], auth_level=func.AuthLevel.ANONYMOUS)
def apply(req: func.HttpRequest) -> func.HttpResponse:
    return handle_apply(req)
