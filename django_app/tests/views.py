from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from .models import Test
from .serializer import TestSerializer
from login.models import LabUser
class TestListView(generics.ListAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        user = self.request.user
        labuser = LabUser.objects.filter(user=user).first()
        queryset = super().get_queryset()
        labid = labuser.labid if labuser else None  # Retrieve the labid or set it to None if labuser is not found
        print(labuser.user)
        print("****************LabID****************", labid)
        if labid:
            queryset = queryset.filter(labid__labid=labid.labid)
        return queryset

