from django.urls import re_path
from .views import PatientUserAuthenticationView,LabUserAuthenticationView,LabUserCreateView,LabInfoListView,\
        PatientUserViewSet
        
login_url_patterns = [
    re_path(r'^login-labuser/$', LabUserAuthenticationView.as_view({'post': 'labuser_authentication'}),
            name='login_labuser'),
    re_path(r'^login-patientuser/$', PatientUserAuthenticationView.as_view({'post': 'patientuser_authentication'}),
            name='login_patientuser'),
    re_path(r'^create/$', LabUserCreateView.as_view({'post': 'patientuser_authentication'}),
                name='create'),
    re_path(r'^labinfo-details/$', LabInfoListView.as_view({'get': 'get_labinfo'}),
                name='labinfo_details'),
    re_path(r'^patient-details/$', PatientUserViewSet.as_view(), name='patient_details'),   
]