from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth import get_user_model, authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import LabInfo,LabUser,PatientUser
from django.contrib.sessions.models import Session
from rest_framework import generics
import traceback
from .serializer import LabInfoSerializer,PatientUserSerializer
# Create your views here.
User = get_user_model()

class LabUserAuthenticationView(viewsets.ViewSet):
    
    def labuser_authentication(self, request):
        try:
            username = request.POST.get('username')
            password = request.POST.get('password')
            # Authenticate the user based on the provided username and password
            user = authenticate(request, username=username, password=password)
            if user is not None:
                
                if user.is_active:
                    # Login the user
                    login(request, user)
                    if 'sessionid' in request.COOKIES:
                        session_key = request.COOKIES['sessionid']
                    else:
                        session_key = None
                    try:
                        labuser = LabUser.objects.get(user=user)
                        labid = labuser.labid.labid
                        return JsonResponse({'session_id': session_key, 'labid': labid, 'message': 'User authenticated successfully'})
                    except LabUser.DoesNotExist:
                        return JsonResponse({'error': 'User is not a LabUser'}, status=500)
                else:
                    return JsonResponse({'error': 'User account is not active'}, status=500)
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=500)
        except Exception as e:
            print(e)
            print(traceback.format_exc())
            return JsonResponse({'message': str(traceback.format_exc())}, status=500)
            

class PatientUserAuthenticationView(viewsets.ViewSet):
    
    def patientuser_authentication(self, request):
        try:
            username = request.POST.get('username')
            password = request.POST.get('password')
            # Authenticate the user based on the provided username and password
            user = authenticate(request, username=username, password=password)
            if user is not None:
                # Check if the user is active and has valid credentials
                if user.is_active:
                    # Login the user
                    login(request, user)
                    if 'sessionid' in request.COOKIES:
                        session_key = request.COOKIES['sessionid']
                    else:
                        session_key = None
                    try:
                        patientuser = PatientUser.objects.get(user=user)
                        patientid = patientuser.patientid
                        return JsonResponse({'patientid':patientid,'session_id': session_key,'message': 'User authenticated successfully'})
                    except PatientUser.DoesNotExist:
                        return JsonResponse({'error': 'User is not a PatientUser'}, status=500)
                else:
                    return JsonResponse({'error': 'User account is not active'}, status=500)
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=500)
        except Exception as e:
            print(e)
            print(traceback.format_exc())
            return JsonResponse({'message': str(traceback.format_exc())}, status=500)

class LabUserCreateView(viewsets.ViewSet):
    def createLabUser(self, request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            labid = request.data.get('labid')
            secret_code = request.data.get('secret_code')

            # Check if the user with the given username already exists
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)

            try:
                labinfo = LabInfo.objects.get(labid=labid)
                if labinfo.secretlab != secret_code:
                    return JsonResponse({'error': 'Invalid labid or secret code'}, status=400)
            except LabInfo.DoesNotExist:
                return JsonResponse({'error': 'Invalid labid'}, status=400)

            
            user = User.objects.create_user(username=username, password=password)
            labuser = LabUser.objects.create(labid=labinfo, user=user)

            return JsonResponse({'message': 'LabUser created successfully'},status=200)
        except Exception as e:
            print(e)
            print(traceback.format_exc())
            return JsonResponse({'message': str(traceback.format_exc())}, status=500)

class LabInfoListView(viewsets.ViewSet):
    def get_labinfo(self, request):
        try:
            lab_info_list = LabInfo.objects.all()
            paginator = PageNumberPagination()
            paginated_lab_info = paginator.paginate_queryset(lab_info_list, request)
            serializer = LabInfoSerializer(paginated_lab_info, many=True)
            return paginator.get_paginated_response(serializer.data)
        except Exception as e:
            print(e)
            print(traceback.format_exc())
            return JsonResponse({'message': str(traceback.format_exc())}, status=500)

class PatientUserViewSet(generics.ListAPIView):
    queryset = PatientUser.objects.all()
    serializer_class = PatientUserSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        try:
            labid = self.request.query_params.get('labid')
            queryset = PatientUser.objects.filter(labid=labid)
            return queryset
        except Exception as e:
            print(e)
            print(traceback.format_exc())
            return JsonResponse({'message': str(traceback.format_exc())}, status=500)

class UsernmaeViaSessionsViewSet(viewsets.ViewSet):
    
    def knowusername(self,request):
        try:
            user = request.user
            return JsonResponse({'username':user.username}, status=200)
        except Exception as e:
            print(e)
            print(traceback.format_exc())
            return JsonResponse({'message': str(traceback.format_exc())}, status=500)
    