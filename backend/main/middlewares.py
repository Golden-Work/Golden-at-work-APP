from django.contrib.auth.models import User
from .models import LogInfo


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
            data_sent = str(self.body, 'utf-8') if self.body else ''
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