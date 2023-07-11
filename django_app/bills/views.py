from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Bills
from login.models import PatientUser
from tests.models import TestsConducted
from django.http import JsonResponse
import traceback
from rest_framework import viewsets, status
from django.db import transaction
from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from .serializer import BillSerializer

class CreateBill(viewsets.ViewSet):
    @transaction.atomic
    def create_bill(self, request):
        try:
            
            labid = request.POST.get('labid')
            totalprice = request.POST.get('totalprice')
            testconducted_ids = request.POST.get('testconducted_ids')
            testconducted_ids = testconducted_ids.split(',')

            
            if 'patientid' in request.POST:
                patientid = request.POST.get('patientid')
            else:
                
                username = request.POST.get('username')
                email=request.POST.get('email')
                name=request.POST.get('name')
                phone=request.POST.get('phone')
                user = User.objects.create_user(username=username, password='livehealth')
                patient_user = PatientUser.objects.create(user=user,labid_id=labid,email=email,phone=phone)
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

class ViewAllBills(generics.ListAPIView):
    queryset = Bills.objects.all()
    serializer_class = BillSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        patientid = self.request.query_params.get('patientid')
        queryset = Bills.objects.filter(patientid=patientid)
        return queryset