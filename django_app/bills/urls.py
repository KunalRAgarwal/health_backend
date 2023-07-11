from django.urls import re_path
from .views import CreateBill
        
bill_url_patterns = [
    re_path(r'^create-bill/$', CreateBill.as_view({'post': 'create_bill'}),
            name='create_bill'),
]