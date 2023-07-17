from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Bills
from login.models import PatientUser,LabUser
from tests.models import TestsConducted
from django.http import JsonResponse
import traceback
from rest_framework import viewsets, status
from django.db import transaction
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from .serializer import BillSerializer


################################################################
#View to create a new Bill for the a new/old Patient
################################################################

class CreateBill(viewsets.ViewSet):
    @transaction.atomic
    def create_bill(self, request):
        try:
            user = request.user
            labid = LabUser.objects.filter(user=user).values_list('labid', flat=True).first()
            totalprice = request.data.get('totalprice')
            testconducted_ids = request.data.get('testconducted_ids')
            testconducted_ids = testconducted_ids.split(',')

            if 'patientid' in request.data:
                patientid = request.data.get('patientid')
            else:
                username = request.data.get('username')
                try:
                    userexists = User.objects.get(username=username)
                    if(userexists):
                        return JsonResponse({'message': 'Username already exist'}, status=500)
                except User.DoesNotExist:
                    pass
               
                
                
                email=request.data.get('email')
                name=request.data.get('name')
                phone=request.data.get('phone')
                
               
                user = User.objects.create_user(username=username, password='livehealth')
                patient_user = PatientUser.objects.create(user=user,labid_id=labid,email=email\
                    ,phone=phone,name=name)
                patientid = patient_user.patientid
                

            
            bill = Bills.objects.create(labid_id=labid, patientid_id=patientid, totalprice=totalprice)

            
            for testconducted_id in testconducted_ids:
                testconducted = TestsConducted.objects.create(billid=bill, testid_id=testconducted_id)

           
            return JsonResponse({'message': 'Bill created successfully'})
        except Exception as e:
            
            transaction.set_rollback(True)
            print(e)
            print(traceback.format_exc())
            return JsonResponse({'message': str(traceback.format_exc())}, status=500)

################################################################
#View to get a list of all bill orders of a certain patient
################################################################
class ViewAllBills(generics.ListAPIView):
    queryset = Bills.objects.all()
    serializer_class = BillSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        user = self.request.user
        patient_user = PatientUser.objects.filter(user=user).first()
        patientid = patient_user.patientid
        queryset = Bills.objects.filter(patientid=patientid)
        return queryset