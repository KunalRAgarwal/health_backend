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


class CreateBill(viewsets.ViewSet):
    @transaction.atomic
    def create_bill(self, request):
        try:
            # Retrieve data from the request payload
            labid = request.POST.get('labid')
            totalprice = request.POST.get('totalprice')
            testconducted_ids = request.POST.get('testconducted_ids')
            testconducted_ids = testconducted_ids.split(',')

            # Check if patient ID is present in the payload
            if 'patientid' in request.POST:
                patientid = request.POST.get('patientid')
            else:
                # If patient ID is not present, create a new User and associate it with the PatientUser
                username = request.POST.get('username')
                user = User.objects.create_user(username=username, password='livehealth')
                patient_user = PatientUser.objects.create(user=user, labid_id=labid)
                patientid = patient_user.patientid
                print("********************************Inside PatientUser Created********************************",username)

            # Create a new instance of the Bills model
            bill = Bills.objects.create(labid_id=labid, patientid_id=patientid, totalprice=totalprice)

            # Create instances of TestConducted for the provided testconducted_ids and associate them with the bill
            for testconducted_id in testconducted_ids:
                testconducted = TestsConducted.objects.create(billid=bill, testid_id=testconducted_id)

            # Return a success response
            return JsonResponse({'message': 'Bill created successfully'})
        except Exception as e:
            # Rollback the transaction if any exception occurs
            transaction.set_rollback(True)
            print(e)
            print(traceback.format_exc())
            return JsonResponse({'message': str(traceback.format_exc())}, status=500)

