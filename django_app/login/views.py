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
################################################################
#Login User
################################################################
class UserAuthenticationView(viewsets.ViewSet):
    def user_authentication(self, request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            usertype = request.data.get('usertype')
            # Authenticate the user based on the provided username and password
            user = authenticate(request, username=username, password=password)
            if user is not None:
                
                if user.is_active:
                   
                    login(request, user)
        
                    try:
                        session_key = request.session.session_key
                    except Exception as e:
                        print(traceback.format_exc())
                        session_key = None
                    if usertype == 'labuser':
                        try:
                            labuser = LabUser.objects.get(user=user)
                            labid = labuser.labid.labid
                            return JsonResponse({'session_id': session_key, 'labid': labid, 'message': 'User authenticated successfully'})
                        except LabUser.DoesNotExist:
                            return JsonResponse({'message': 'User is not a LabUser'}, status=500)
                    elif usertype == 'patient':
                        try:
                            patientuser = PatientUser.objects.get(user=user)
                            patientid = patientuser.patientid
                            return JsonResponse({'patientid':patientid,'session_id': session_key,'message': 'User authenticated successfully'})
                        except PatientUser.DoesNotExist:
                            return JsonResponse({'message': 'User is not a PatientUser'}, status=500)
                    else:
                        return JsonResponse({'message': 'Usertype not specified'}, status=500)
                else:
                    return JsonResponse({'message': 'User account is not active'}, status=500)
            else:
                return JsonResponse({'message': 'Invalid credentials'}, status=500)
        except Exception as e:
            print(e)
            print(traceback.format_exc())
            return JsonResponse({'message': str(traceback.format_exc())}, status=500)
            

# class PatientUserAuthenticationView(viewsets.ViewSet):
    
#     def patientuser_authentication(self, request):
#         try:
#             username = request.POST.get('username')
#             password = request.POST.get('password')
#             # Authenticate the user based on the provided username and password
#             user = authenticate(request, username=username, password=password)
#             if user is not None:
#                 # Check if the user is active and has valid credentials
#                 if user.is_active:
#                     # Login the user
#                     login(request, user)
#                     if 'sessionid' in request.COOKIES:
#                         session_key = request.COOKIES['sessionid']
#                     else:
#                         session_key = None
#                     try:
#                         patientuser = PatientUser.objects.get(user=user)
#                         patientid = patientuser.patientid
#                         return JsonResponse({'patientid':patientid,'session_id': session_key,'message': 'User authenticated successfully'})
#                     except PatientUser.DoesNotExist:
#                         return JsonResponse({'message': 'User is not a PatientUser'}, status=500)
#                 else:
#                     return JsonResponse({'message': 'User account is not active'}, status=500)
#             else:
#                 return JsonResponse({'message': 'Invalid credentials'}, status=500)
#         except Exception as e:
#             print(e)
#             print(traceback.format_exc())
#             return JsonResponse({'message': str(traceback.format_exc())}, status=500)

################################################################
#Create a new Lab User
################################################################
class LabUserCreateView(viewsets.ViewSet):
    def createLabUser(self, request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            labid = request.data.get('labid')
            secret_code = request.data.get('secret_code')

            # Check if the user with the given username already exists
            if User.objects.filter(username=username).exists():
                return JsonResponse({'message': 'Username already exists'}, status=400)

            try:
                labinfo = LabInfo.objects.get(labid=labid)
                if labinfo.secretlab != secret_code:
                    return JsonResponse({'message': 'Invalid labid or secret code'}, status=400)
            except LabInfo.DoesNotExist:
                return JsonResponse({'message': 'Invalid labid'}, status=400)

            
            user = User.objects.create_user(username=username, password=password)
            labuser = LabUser.objects.create(labid=labinfo, user=user)

            return JsonResponse({'message': 'LabUser created successfully'},status=200)
        except Exception as e:
            print(e)
            print(traceback.format_exc())
            return JsonResponse({'message': str(traceback.format_exc())}, status=500)
        
################################################################
#Get lab information for a particular lab
################################################################
class LabInfoListView(viewsets.ViewSet):
    def get_labinfo(self, request):
        try:
            labid = self.request.query_params.get('labid')
            lab_info_list = LabInfo.objects.filter(labid=labid)
            paginator = PageNumberPagination()
            paginated_lab_info = paginator.paginate_queryset(lab_info_list, request)
            serializer = LabInfoSerializer(paginated_lab_info, many=True)
            return paginator.get_paginated_response(serializer.data)
        except Exception as e:
            print(e)
            print(traceback.format_exc())
            return JsonResponse({'message': "Server Error"}, status=500)

################################################################
#Get info about all labs
################################################################
class AllLabInfoListView(viewsets.ViewSet):
    def get_all_labinfo(self, request):
        try:
            lab_info_list = LabInfo.objects.all()
            paginator = PageNumberPagination()
            paginated_lab_info = paginator.paginate_queryset(lab_info_list, request)
            serializer = LabInfoSerializer(paginated_lab_info, many=True)
            return paginator.get_paginated_response(serializer.data)
        except Exception as e:
            print(e)
            print(traceback.format_exc())
            return JsonResponse({'message': "Server Error"}, status=500)
        
################################################################
#Get all patients information of a particular labid
################################################################
class PatientUserViewSet(generics.ListAPIView):
    queryset = PatientUser.objects.all()
    serializer_class = PatientUserSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        try:
            user = self.request.user
            labuser = LabUser.objects.filter(user=user).first()
            queryset = PatientUser.objects.filter(labid=labuser.labid)
            return queryset
        except Exception as e:
            print(e)
            print(traceback.format_exc())
            return JsonResponse({'message': str(traceback.format_exc())}, status=500)


################################################################
#Get user name from session code
################################################################
class UsernmaeViaSessionsViewSet(viewsets.ViewSet):
    
    def knowusername(self,request):
        try:
            user = request.user
            return JsonResponse({'username':user.username}, status=200)
        except Exception as e:
            print(e)
            print(traceback.format_exc())
            return JsonResponse({'message': str(traceback.format_exc())}, status=403)
    