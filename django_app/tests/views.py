from rest_framework import generics
from rest_framework.pagination import PageNumberPagination
from .models import Test
from .serializer import TestSerializer

class TestListView(generics.ListAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        labid = self.request.query_params.get('labid')
        print("****************LabID****************",labid)
        if labid:
            queryset = queryset.filter(labid__labid=labid)
        return queryset
