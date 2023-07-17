from django.conf import settings
from django.shortcuts import redirect

class SessionExpiredMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # Check if session has expired or invalid
        if not request.session.session_key:
            return redirect(settings.SESSION_EXPIRED_REDIRECT)

        return response
