from django.contrib.auth.models import User
from .models import LogInfo
import json

"""
This middleware logs information about the requests made to the API (not read operations)

"""
class RequestLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        self.body = request.body
        response = self.get_response(request)

        # Check if the request was successful (2xx status code)
        if 200 <= response.status_code < 300:
            # Log information
            user = request.user if request.user.is_authenticated else None
            method = request.method
            endpoint = request.path
            data_sent = self.extract_request_data(request)
            response_data = response.content.decode('utf-8')

            if method != 'GET' and method != 'OPTIONS' and not endpoint.startswith('/admin') and not endpoint.startswith('/api/auth/login') and not endpoint.startswith('/api/auth/refresh'):
            # Save log information to the database
                LogInfo.objects.create(
                    user=user,
                    method=method,
                    endpoint=endpoint,
                    data_sent=data_sent,
                    response=response_data,
                )

        return response
    
    def extract_request_data(self, request):
        # Extract and return request data based on content type
        content_type = request.content_type

        if 'application/json' in content_type:
            return str(request.body, 'utf-8') if request.body else ''
        elif 'multipart/form-data' in content_type:
            # Handle form data with images
            form_data = {}
            for key, value in request.POST.items():
                form_data[key] = value

            for key, file in request.FILES.items():
                # Check if the file is an image
                if file.content_type.startswith('image'):
                    form_data[key] = f'Uploaded image: {file.name}'
                else:
                    # Handle other file types if needed
                    form_data[key] = f'Uploaded file: {file.name}'

            return json.dumps(form_data)

        return ''