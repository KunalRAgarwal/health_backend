from django.contrib.sessions.models import Session
from django.http import JsonResponse
from django.utils import timezone
from django.urls import resolve
class SessionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        current_url = resolve(request.path_info).url_name
        print(current_url)
        if 'login' in current_url or 'admin' in current_url or  '/admin' in request.path_info:
            response = self.get_response(request)
            print("**************************************************************************")
            return response
        else:
            print("******************************In-Else********************************************")
            session_token = request.headers.get('Authorization')
            if session_token:
                session_key = session_token

                try:
                    session = Session.objects.get(session_key=session_key)
                    if session.expire_date > timezone.now():  # Check if the session is not expired
                        request.session = session.get_decoded()  # Set the session data in the request
                        request.user_id = request.session.get('_auth_user_id')
                    else:
                        return JsonResponse({'error': 'Session expired'}, status=401)
                except Session.DoesNotExist:
                    return JsonResponse({'error': 'Invalid session'}, status=401)

                response = self.get_response(request)
                return response
            else:
                return JsonResponse({'error': 'Token Not present'}, status=401)
