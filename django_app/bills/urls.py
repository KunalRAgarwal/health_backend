from django.urls import re_path
from .views import CreateBill,ViewAllBills
        
bill_url_patterns = [
    re_path(r'^create-bill/$', CreateBill.as_view({'post': 'create_bill'}),
            name='create_bill'),
    re_path(r'^patient-allbills/$', ViewAllBills.as_view(), name='patient_allbills'), 
]