import azure.functions as func
import json
import os
import logging
import re
from datetime import datetime
from azure.data.tables import TableServiceClient, TableEntity
import random
import string

app = func.FunctionApp()

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
        entity['submittedAt'] = timestamp
        entity['ipAddress'] = req.headers.get('x-forwarded-for', 'unknown')
        entity['userAgent'] = req.headers.get('user-agent', 'unknown')

        # Insert entity
        table_client.create_entity(entity)

        logging.info(f'Contact form saved: {email}')

        # Return success
        return func.HttpResponse(
            json.dumps({
                'success': True,
                'message': 'Contact form submitted successfully',
                'submissionId': row_key
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
