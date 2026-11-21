"""Tests for the contact and application endpoints. Storage and email are faked."""

import base64
import json
import os
import sys

import azure.functions as func
import pytest

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import function_app as fa  # noqa: E402

PDF = b'%PDF-1.4 test file'
DOCX = b'PK\x03\x04 fake docx'
PROD_HOST = {'x-forwarded-host': 'imkan.ai'}


@pytest.fixture(autouse=True)
def fakes(monkeypatch):
    saved, emails = [], []
    monkeypatch.setattr(fa, 'save_entity', lambda table, entity: saved.append((table, dict(entity))))
    monkeypatch.setattr(
        fa, '_send_email',
        lambda subject, plain, html_body, recipients, reply_to=None, attachments=None: (
            emails.append({'subject': subject, 'recipients': recipients, 'attachments': attachments}) or True
        ),
    )
    for name in ('FORMS_TEST_MODE', 'FORMS_TEST_RECIPIENTS', 'CONTACT_NOTIFICATION_RECIPIENTS',
                 'FORMS_RATE_LIMIT', 'FORMS_RATE_WINDOW_SECONDS'):
        monkeypatch.delenv(name, raising=False)
    fa.reset_rate_limits()
    return saved, emails


def json_request(path, body, headers=None, method='POST'):
    h = {'content-type': 'application/json', 'x-forwarded-for': '203.0.113.7', **PROD_HOST, **(headers or {})}
    return func.HttpRequest(method=method, url=f'https://imkan.ai/api/{path}', headers=h,
                            body=json.dumps(body).encode())


def multipart_request(path, fields, files=None, headers=None):
    boundary = 'testboundary123'
    parts = []
    for name, value in fields.items():
        parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="{name}"\r\n\r\n{value}\r\n'.encode())
    for name, (filename, data, ctype) in (files or {}).items():
        parts.append(
            f'--{boundary}\r\nContent-Disposition: form-data; name="{name}"; filename="{filename}"\r\n'
            f'Content-Type: {ctype}\r\n\r\n'.encode() + data + b'\r\n'
        )
    parts.append(f'--{boundary}--\r\n'.encode())
    h = {'content-type': f'multipart/form-data; boundary={boundary}', 'x-forwarded-for': '203.0.113.7',
         **PROD_HOST, **(headers or {})}
    return func.HttpRequest(method='POST', url=f'https://imkan.ai/api/{path}', headers=h, body=b''.join(parts))


CONTACT = {'firstName': 'Ada', 'lastName': 'Lovelace', 'phone': '+966500000000',
           'email': 'ada@example.com', 'message': 'Hello'}


def body(resp):
    return json.loads(resp.get_body())


# ---------------- contact ----------------

def test_contact_json_still_works(fakes):
    saved, emails = fakes
    resp = fa.handle_contact(json_request('contact', CONTACT))
    assert resp.status_code == 200
    assert body(resp)['success'] is True and body(resp)['testMode'] is False
    assert saved[0][0] == 'contactsubmissions'
    assert saved[0][1]['email'] == 'ada@example.com'
    assert emails[0]['recipients'] == ['felipe@imkan.ai']


def test_contact_multipart_from_new_site(fakes):
    saved, _ = fakes
    resp = fa.handle_contact(multipart_request('contact', CONTACT))
    assert resp.status_code == 200
    assert saved[0][1]['firstName'] == 'Ada'


def test_contact_missing_fields():
    resp = fa.handle_contact(json_request('contact', {**CONTACT, 'phone': ''}))
    assert resp.status_code == 400
    assert body(resp)['error'] == 'Missing required fields'


def test_contact_bad_email():
    resp = fa.handle_contact(json_request('contact', {**CONTACT, 'email': 'nope'}))
    assert resp.status_code == 400


def test_contact_field_too_long():
    resp = fa.handle_contact(json_request('contact', {**CONTACT, 'message': 'x' * 5001}))
    assert resp.status_code == 400


def test_contact_invalid_json():
    req = func.HttpRequest(method='POST', url='https://imkan.ai/api/contact',
                           headers={'content-type': 'application/json', **PROD_HOST}, body=b'{bad')
    assert fa.handle_contact(req).status_code == 400


def test_options_and_get():
    assert fa.handle_contact(json_request('contact', {}, method='OPTIONS')).status_code == 200
    assert fa.handle_contact(json_request('contact', {}, method='GET')).status_code == 405


def test_honeypot_discards_without_saving(fakes):
    saved, emails = fakes
    resp = fa.handle_contact(multipart_request('contact', {**CONTACT, 'company_website': 'spam.example'}))
    assert resp.status_code == 200
    assert saved == [] and emails == []


def test_rate_limit(monkeypatch):
    monkeypatch.setenv('FORMS_RATE_LIMIT', '2')
    assert fa.handle_contact(json_request('contact', CONTACT)).status_code == 200
    assert fa.handle_contact(json_request('contact', CONTACT)).status_code == 200
    assert fa.handle_contact(json_request('contact', CONTACT)).status_code == 429
    other_ip = json_request('contact', CONTACT, headers={'x-forwarded-for': '198.51.100.1:443'})
    assert fa.handle_contact(other_ip).status_code == 200


def test_server_error_hides_details(monkeypatch):
    def boom(table, entity):
        raise RuntimeError('secret connection detail')
    monkeypatch.setattr(fa, 'save_entity', boom)
    resp = fa.handle_contact(json_request('contact', CONTACT))
    assert resp.status_code == 500
    assert 'secret' not in resp.get_body().decode()


# ---------------- test mode ----------------

@pytest.mark.parametrize('host,expected', [
    ('imkan.ai', False),
    ('www.imkan.ai', False),
    ('nice-bush-0890c9503.5.azurestaticapps.net', False),
    ('nice-bush-0890c9503-25.westeurope.5.azurestaticapps.net', True),
    ('localhost', True),
])
def test_test_mode_by_host(fakes, host, expected):
    saved, _ = fakes
    resp = fa.handle_contact(json_request('contact', CONTACT, headers={'x-forwarded-host': host}))
    assert body(resp)['testMode'] is expected
    assert saved[0][0] == ('contactsubmissionstest' if expected else 'contactsubmissions')


def test_test_mode_uses_test_recipients_only(fakes, monkeypatch):
    _, emails = fakes
    monkeypatch.setenv('FORMS_TEST_MODE', '1')
    monkeypatch.setenv('FORMS_TEST_RECIPIENTS', 'qa@example.com')
    fa.handle_contact(json_request('contact', CONTACT))
    assert emails[0]['recipients'] == ['qa@example.com']
    assert emails[0]['subject'].startswith('[TEST]')


def test_test_mode_without_recipients_sends_to_nobody(monkeypatch):
    monkeypatch.setenv('FORMS_TEST_MODE', '1')
    assert fa._notification_recipients(True) == []


def test_force_production_mode(fakes, monkeypatch):
    saved, _ = fakes
    monkeypatch.setenv('FORMS_TEST_MODE', '0')
    fa.handle_contact(json_request('contact', CONTACT, headers={'x-forwarded-host': 'localhost'}))
    assert saved[0][0] == 'contactsubmissions'


# ---------------- apply ----------------

APPLY = {'jobTitle': 'Data Scientist', 'email': 'ada@example.com', 'firstName': 'Ada'}


def test_apply_multipart_upload(fakes):
    saved, emails = fakes
    resp = fa.handle_apply(multipart_request('apply', APPLY, {'cv': ('cv.pdf', PDF, 'application/pdf')}))
    assert resp.status_code == 200, body(resp)
    entity = saved[0][1]
    assert saved[0][0] == 'jobapplications'
    assert entity['cvFileName'] == 'cv.pdf' and entity['cvContentType'] == 'application/pdf'
    assert base64.b64decode(emails[0]['attachments'][0]['contentInBase64']) == PDF


def test_apply_json_base64_still_works(fakes):
    saved, _ = fakes
    req = json_request('apply', {**APPLY, 'cvBase64': base64.b64encode(DOCX).decode(),
                                 'cvFileName': 'cv.docx', 'cvContentType': 'application/octet-stream'})
    resp = fa.handle_apply(req)
    assert resp.status_code == 200
    assert saved[0][1]['cvContentType'].endswith('wordprocessingml.document')


def test_apply_requires_cv():
    assert fa.handle_apply(multipart_request('apply', APPLY)).status_code == 400


def test_apply_rejects_wrong_extension():
    resp = fa.handle_apply(multipart_request('apply', APPLY, {'cv': ('cv.exe', PDF, 'application/pdf')}))
    assert resp.status_code == 400


def test_apply_rejects_mismatched_content():
    resp = fa.handle_apply(multipart_request('apply', APPLY, {'cv': ('cv.pdf', b'MZ not a pdf', 'application/pdf')}))
    assert resp.status_code == 400
    assert 'does not match' in body(resp)['error']


def test_apply_rejects_oversized_cv():
    big = PDF + b'0' * (fa.MAX_CV_BYTES + 1)
    resp = fa.handle_apply(multipart_request('apply', APPLY, {'cv': ('cv.pdf', big, 'application/pdf')}))
    assert resp.status_code == 400
    assert '5 MB' in body(resp)['error']


def test_apply_strips_path_from_filename(fakes):
    saved, _ = fakes
    fa.handle_apply(multipart_request('apply', APPLY, {'cv': ('../../evil/cv.pdf', PDF, 'application/pdf')}))
    assert saved[0][1]['cvFileName'] == 'cv.pdf'
    # Windows-style paths arrive through the JSON route unescaped.
    saved.clear()
    fa.handle_apply(json_request('apply', {**APPLY, 'cvBase64': base64.b64encode(PDF).decode(),
                                           'cvFileName': 'C:\\Users\\x\\cv.pdf'}))
    assert saved[0][1]['cvFileName'] == 'cv.pdf'


def test_apply_requires_job_title():
    resp = fa.handle_apply(multipart_request('apply', {**APPLY, 'jobTitle': ''},
                                             {'cv': ('cv.pdf', PDF, 'application/pdf')}))
    assert resp.status_code == 400
