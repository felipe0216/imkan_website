import azure.functions as func
import json
import os
import logging
import re
import html
import base64
import binascii
from datetime import datetime
from azure.data.tables import TableServiceClient, TableEntity
import random
import string

app = func.FunctionApp()

# Default recipients for contact-form notifications (the Imkan owners).
# Can be overridden with the CONTACT_NOTIFICATION_RECIPIENTS env var
# (comma-separated list of email addresses).
DEFAULT_NOTIFICATION_RECIPIENTS = ['felipe@imkan.ai']

MAX_CV_BYTES = 5 * 1024 * 1024  # 5 MB
ALLOWED_CV_CONTENT_TYPES = {
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}


def _optional_text(value):
    text = (value or '').strip()
    return text if text else '(not provided)'


def _validate_cv_attachment(cv_base64, cv_file_name, cv_content_type):
    """Return (bytes, safe_filename) or raise ValueError with a user-facing message."""
    if not cv_base64 or not cv_file_name or not cv_content_type:
        raise ValueError('CV file is required')

    content_type = cv_content_type.strip().lower()
    if content_type not in ALLOWED_CV_CONTENT_TYPES:
        raise ValueError('CV must be a PDF or Word document (.pdf, .doc, .docx)')

    try:
        cv_bytes = base64.b64decode(cv_base64, validate=True)
    except (binascii.Error, ValueError):
        raise ValueError('Invalid CV file encoding')

    if len(cv_bytes) == 0:
        raise ValueError('CV file is empty')

    if len(cv_bytes) > MAX_CV_BYTES:
        raise ValueError('CV file must be 5 MB or smaller')

    safe_name = os.path.basename(cv_file_name).replace('..', '').strip()
    if not safe_name:
        safe_name = 'cv.pdf'

    return cv_bytes, safe_name


def send_notification_email(first_name, last_name, phone, email, message, submitted_at):
    """
    Send a contact-form notification to the Imkan owners via Azure
    Communication Services Email.

    This is best-effort: any failure is logged and swallowed so it never
    blocks a successful submission (the data is already persisted in storage).
    Returns True if the email was sent, False otherwise.
    """
    connection_string = os.environ.get('ACS_EMAIL_CONNECTION_STRING')
    sender_address = os.environ.get('ACS_SENDER_ADDRESS')

    if not connection_string or not sender_address:
        logging.warning(
            'ACS email not configured (ACS_EMAIL_CONNECTION_STRING / '
            'ACS_SENDER_ADDRESS missing); skipping notification email.'
        )
        return False

    recipients_raw = os.environ.get('CONTACT_NOTIFICATION_RECIPIENTS')
    if recipients_raw:
        recipients = [addr.strip() for addr in recipients_raw.split(',') if addr.strip()]
    else:
        recipients = DEFAULT_NOTIFICATION_RECIPIENTS

    if not recipients:
        logging.warning('No notification recipients configured; skipping email.')
        return False

    try:
        from azure.communication.email import EmailClient

        full_name = f'{first_name} {last_name}'.strip()
        message_text = message if message else '(no message provided)'

        plain_text = (
            'New contact form submission from imkan.ai\n\n'
            f'Name:    {full_name}\n'
            f'Email:   {email}\n'
            f'Phone:   {phone}\n'
            f'Message: {message_text}\n\n'
            f'Submitted: {submitted_at} (UTC)'
        )

        html_body = f"""
        <div style="font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; max-width: 560px;">
          <h2 style="margin: 0 0 16px;">New contact form submission</h2>
          <p style="margin: 0 0 16px; color: #555;">Someone reached out through the imkan.ai website.</p>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px 12px; font-weight: bold; background: #f4f4f4; width: 120px;">Name</td><td style="padding: 8px 12px;">{html.escape(full_name)}</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: bold; background: #f4f4f4;">Email</td><td style="padding: 8px 12px;"><a href="mailto:{html.escape(email)}">{html.escape(email)}</a></td></tr>
            <tr><td style="padding: 8px 12px; font-weight: bold; background: #f4f4f4;">Phone</td><td style="padding: 8px 12px;">{html.escape(phone)}</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: bold; background: #f4f4f4; vertical-align: top;">Message</td><td style="padding: 8px 12px; white-space: pre-wrap;">{html.escape(message_text)}</td></tr>
          </table>
          <p style="margin: 16px 0 0; color: #888; font-size: 12px;">Submitted {html.escape(submitted_at)} (UTC)</p>
        </div>
        """

        email_client = EmailClient.from_connection_string(connection_string)
        email_message = {
            'senderAddress': sender_address,
            'recipients': {
                'to': [{'address': addr} for addr in recipients],
            },
            'content': {
                'subject': f'New website enquiry: {full_name}',
                'plainText': plain_text,
                'html': html_body,
            },
            # Let the owners reply directly to the person who submitted the form.
            'replyTo': [{'address': email, 'displayName': full_name}],
        }

        poller = email_client.begin_send(email_message)
        poller.result()
        logging.info(f'Notification email sent to {", ".join(recipients)}')
        return True

    except Exception as e:
        logging.error(f'Failed to send notification email: {str(e)}')
        return False


def send_application_email(
    first_name,
    last_name,
    phone,
    email,
    job_title,
    linkedin,
    message,
    submitted_at,
    cv_file_name,
    cv_content_type,
    cv_base64,
):
    """
    Send a job-application notification to the Imkan owners via Azure
    Communication Services Email.

    Best-effort: any failure is logged and swallowed so it never blocks a
    successful submission (the data is already persisted in storage).
    Returns True if the email was sent, False otherwise.
    """
    connection_string = os.environ.get('ACS_EMAIL_CONNECTION_STRING')
    sender_address = os.environ.get('ACS_SENDER_ADDRESS')

    if not connection_string or not sender_address:
        logging.warning(
            'ACS email not configured (ACS_EMAIL_CONNECTION_STRING / '
            'ACS_SENDER_ADDRESS missing); skipping application email.'
        )
        return False

    recipients_raw = os.environ.get('CONTACT_NOTIFICATION_RECIPIENTS')
    if recipients_raw:
        recipients = [addr.strip() for addr in recipients_raw.split(',') if addr.strip()]
    else:
        recipients = DEFAULT_NOTIFICATION_RECIPIENTS

    if not recipients:
        logging.warning('No notification recipients configured; skipping email.')
        return False

    try:
        from azure.communication.email import EmailClient

        full_name = f'{first_name} {last_name}'.strip() or '(not provided)'
        applicant_email = _optional_text(email)
        phone_text = _optional_text(phone)
        cover_letter = message if message else '(no message provided)'
        linkedin_text = linkedin if linkedin else '(not provided)'

        plain_text = (
            'New job application from imkan.ai\n\n'
            f'Role:     {job_title}\n'
            f'Name:     {full_name}\n'
            f'Email:    {applicant_email}\n'
            f'Phone:    {phone_text}\n'
            f'LinkedIn/Portfolio: {linkedin_text}\n'
            f'CV:       {cv_file_name} (attached)\n\n'
            f'Cover letter:\n{cover_letter}\n\n'
            f'Submitted: {submitted_at} (UTC)'
        )

        html_body = f"""
        <div style="font-family: Arial, Helvetica, sans-serif; color: #1a1a1a; max-width: 560px;">
          <h2 style="margin: 0 0 4px;">New job application</h2>
          <p style="margin: 0 0 16px; color: #555;">Someone applied through the imkan.ai careers page.</p>
          <table style="border-collapse: collapse; width: 100%;">
            <tr><td style="padding: 8px 12px; font-weight: bold; background: #f4f4f4; width: 150px;">Role</td><td style="padding: 8px 12px;">{html.escape(job_title)}</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: bold; background: #f4f4f4;">Name</td><td style="padding: 8px 12px;">{html.escape(full_name)}</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: bold; background: #f4f4f4;">Email</td><td style="padding: 8px 12px;">{html.escape(applicant_email)}</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: bold; background: #f4f4f4;">Phone</td><td style="padding: 8px 12px;">{html.escape(phone_text)}</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: bold; background: #f4f4f4;">LinkedIn/Portfolio</td><td style="padding: 8px 12px;">{html.escape(linkedin_text)}</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: bold; background: #f4f4f4;">CV</td><td style="padding: 8px 12px;">{html.escape(cv_file_name)} (attached)</td></tr>
            <tr><td style="padding: 8px 12px; font-weight: bold; background: #f4f4f4; vertical-align: top;">Cover letter</td><td style="padding: 8px 12px; white-space: pre-wrap;">{html.escape(cover_letter)}</td></tr>
          </table>
          <p style="margin: 16px 0 0; color: #888; font-size: 12px;">Submitted {html.escape(submitted_at)} (UTC)</p>
        </div>
        """

        email_client = EmailClient.from_connection_string(connection_string)
        email_message = {
            'senderAddress': sender_address,
            'recipients': {
                'to': [{'address': addr} for addr in recipients],
            },
            'content': {
                'subject': f'New job application: {job_title} — {full_name}',
                'plainText': plain_text,
                'html': html_body,
            },
            'attachments': [
                {
                    'name': cv_file_name,
                    'contentType': cv_content_type,
                    'contentInBase64': cv_base64,
                }
            ],
        }

        if email and email.strip():
            email_message['replyTo'] = [{'address': email.strip(), 'displayName': full_name}]

        poller = email_client.begin_send(email_message)
        poller.result()
        logging.info(f'Application email sent to {", ".join(recipients)}')
        return True

    except Exception as e:
        logging.error(f'Failed to send application email: {str(e)}')
        return False


@app.route(route="contact", methods=["GET", "POST", "OPTIONS"], auth_level=func.AuthLevel.ANONYMOUS)
def contact(req: func.HttpRequest) -> func.HttpResponse:
    """
    Azure Function to handle contact form submissions.
    Stores data in Azure Table Storage.
    """
    logging.info('Contact form submission received')

    # Handle CORS preflight
    if req.method == 'OPTIONS':
        return func.HttpResponse(
            status_code=200,
            headers={
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        )

    # Only allow POST requests
    if req.method != 'POST':
        return func.HttpResponse(
            json.dumps({'error': 'Method not allowed'}),
            status_code=405,
            mimetype='application/json',
            headers={
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        )

    try:
        # Parse request body
        req_body = req.get_json()
        
        # Extract form data
        first_name = req_body.get('firstName')
        last_name = req_body.get('lastName')
        phone = req_body.get('phone')
        email = req_body.get('email')
        message = (req_body.get('message') or '').strip()

        # Validate required fields
        if not all([first_name, last_name, phone, email]):
            return func.HttpResponse(
                json.dumps({
                    'error': 'Missing required fields',
                    'required': ['firstName', 'lastName', 'phone', 'email']
                }),
                status_code=400,
                mimetype='application/json',
                headers={
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            )

        # Validate email format
        email_regex = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
        if not re.match(email_regex, email):
            return func.HttpResponse(
                json.dumps({'error': 'Invalid email format'}),
                status_code=400,
                mimetype='application/json',
                headers={
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            )

        # Get connection string from environment variable
        connection_string = os.environ.get('AZURE_STORAGE_CONNECTION_STRING')
        
        if not connection_string:
            logging.error('Storage connection string not configured')
            return func.HttpResponse(
                json.dumps({'error': 'Server configuration error'}),
                status_code=500,
                mimetype='application/json',
                headers={
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            )

        # Create table service client
        table_service = TableServiceClient.from_connection_string(connection_string)
        table_client = table_service.get_table_client('contactsubmissions')

        # Create table if it doesn't exist
        try:
            table_service.create_table('contactsubmissions')
        except Exception:
            # Table already exists, that's fine
            pass

        # Create entity
        timestamp = datetime.utcnow().isoformat()
        random_suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=7))
        row_key = f"{int(datetime.utcnow().timestamp() * 1000)}_{random_suffix}"
        
        entity = TableEntity()
        entity['PartitionKey'] = 'contact'
        entity['RowKey'] = row_key
        entity['firstName'] = first_name
        entity['lastName'] = last_name
        entity['phone'] = phone
        entity['email'] = email
        entity['message'] = message
        entity['submittedAt'] = timestamp
        entity['ipAddress'] = req.headers.get('x-forwarded-for', 'unknown')
        entity['userAgent'] = req.headers.get('user-agent', 'unknown')

        # Insert entity
        table_client.create_entity(entity)

        logging.info(f'Contact form saved: {email}')

        # Notify the owners by email (best-effort; never blocks the submission)
        emailed = send_notification_email(
            first_name, last_name, phone, email, message, timestamp
        )

        # Return success
        return func.HttpResponse(
            json.dumps({
                'success': True,
                'message': 'Contact form submitted successfully',
                'submissionId': row_key,
                'emailed': emailed
            }),
            status_code=200,
            mimetype='application/json',
            headers={
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        )

    except ValueError as e:
        logging.error(f'Invalid JSON: {str(e)}')
        return func.HttpResponse(
            json.dumps({
                'error': 'Invalid request body',
                'message': 'Request must contain valid JSON'
            }),
            status_code=400,
            mimetype='application/json',
            headers={
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        )

    except Exception as e:
        logging.error(f'Error processing contact form: {str(e)}')
        
        return func.HttpResponse(
            json.dumps({
                'error': 'Failed to process contact form',
                'message': str(e)
            }),
            status_code=500,
            mimetype='application/json',
            headers={
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        )


@app.route(route="apply", methods=["GET", "POST", "OPTIONS"], auth_level=func.AuthLevel.ANONYMOUS)
def apply(req: func.HttpRequest) -> func.HttpResponse:
    """
    Azure Function to handle job application submissions from the careers page.
    Stores data in Azure Table Storage and emails the owners.
    """
    logging.info('Job application received')

    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
    }

    # Handle CORS preflight
    if req.method == 'OPTIONS':
        return func.HttpResponse(
            status_code=200,
            headers={
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        )

    if req.method != 'POST':
        return func.HttpResponse(
            json.dumps({'error': 'Method not allowed'}),
            status_code=405,
            mimetype='application/json',
            headers=cors_headers
        )

    try:
        req_body = req.get_json()

        first_name = (req_body.get('firstName') or '').strip()
        last_name = (req_body.get('lastName') or '').strip()
        phone = (req_body.get('phone') or '').strip()
        email = (req_body.get('email') or '').strip()
        job_title = (req_body.get('jobTitle') or '').strip()
        job_id = (req_body.get('jobId') or '').strip()
        linkedin = (req_body.get('linkedin') or '').strip()
        message = (req_body.get('message') or '').strip()
        cv_base64 = (req_body.get('cvBase64') or '').strip()
        cv_file_name = (req_body.get('cvFileName') or '').strip()
        cv_content_type = (req_body.get('cvContentType') or '').strip()

        if not job_title:
            return func.HttpResponse(
                json.dumps({
                    'error': 'Missing required fields',
                    'required': ['jobTitle', 'cvFile']
                }),
                status_code=400,
                mimetype='application/json',
                headers=cors_headers
            )

        try:
            cv_bytes, safe_cv_name = _validate_cv_attachment(cv_base64, cv_file_name, cv_content_type)
        except ValueError as cv_error:
            return func.HttpResponse(
                json.dumps({'error': str(cv_error)}),
                status_code=400,
                mimetype='application/json',
                headers=cors_headers
            )

        # Validate email format only when provided.
        if email:
            email_regex = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
            if not re.match(email_regex, email):
                return func.HttpResponse(
                    json.dumps({'error': 'Invalid email format'}),
                    status_code=400,
                    mimetype='application/json',
                    headers=cors_headers
                )

        connection_string = os.environ.get('AZURE_STORAGE_CONNECTION_STRING')

        if not connection_string:
            logging.error('Storage connection string not configured')
            return func.HttpResponse(
                json.dumps({'error': 'Server configuration error'}),
                status_code=500,
                mimetype='application/json',
                headers=cors_headers
            )

        table_service = TableServiceClient.from_connection_string(connection_string)
        table_client = table_service.get_table_client('jobapplications')

        # Create table if it doesn't exist
        try:
            table_service.create_table('jobapplications')
        except Exception:
            pass

        timestamp = datetime.utcnow().isoformat()
        random_suffix = ''.join(random.choices(string.ascii_lowercase + string.digits, k=7))
        row_key = f"{int(datetime.utcnow().timestamp() * 1000)}_{random_suffix}"

        entity = TableEntity()
        entity['PartitionKey'] = 'application'
        entity['RowKey'] = row_key
        entity['firstName'] = first_name
        entity['lastName'] = last_name
        entity['phone'] = phone
        entity['email'] = email
        entity['jobTitle'] = job_title
        entity['jobId'] = job_id
        entity['linkedin'] = linkedin
        entity['message'] = message
        entity['cvFileName'] = safe_cv_name
        entity['cvContentType'] = cv_content_type
        entity['cvSizeBytes'] = len(cv_bytes)
        entity['submittedAt'] = timestamp
        entity['ipAddress'] = req.headers.get('x-forwarded-for', 'unknown')
        entity['userAgent'] = req.headers.get('user-agent', 'unknown')

        table_client.create_entity(entity)

        logging.info(f'Job application saved: {email} for {job_title}')

        # Notify the owners by email (best-effort; never blocks the submission)
        emailed = send_application_email(
            first_name,
            last_name,
            phone,
            email,
            job_title,
            linkedin,
            message,
            timestamp,
            safe_cv_name,
            cv_content_type,
            cv_base64,
        )

        return func.HttpResponse(
            json.dumps({
                'success': True,
                'message': 'Application submitted successfully',
                'submissionId': row_key,
                'emailed': emailed
            }),
            status_code=200,
            mimetype='application/json',
            headers=cors_headers
        )

    except ValueError as e:
        logging.error(f'Invalid JSON: {str(e)}')
        return func.HttpResponse(
            json.dumps({
                'error': 'Invalid request body',
                'message': 'Request must contain valid JSON'
            }),
            status_code=400,
            mimetype='application/json',
            headers=cors_headers
        )

    except Exception as e:
        logging.error(f'Error processing job application: {str(e)}')
        return func.HttpResponse(
            json.dumps({
                'error': 'Failed to process application',
                'message': str(e)
            }),
            status_code=500,
            mimetype='application/json',
            headers=cors_headers
        )
