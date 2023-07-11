from django.urls import re_path
from .views import PatientUserAuthenticationView,LabUserAuthenticationView,LabUserCreateView,LabInfoListView,\
        PatientUserViewSet,UsernmaeViaSessionsViewSet
        
login_url_patterns = [
    re_path(r'^login-labuser/$', LabUserAuthenticationView.as_view({'post': 'labuser_authentication'}),
            name='login_labuser'),
    re_path(r'^login-patientuser/$', PatientUserAuthenticationView.as_view({'post': 'patientuser_authentication'}),
            name='login_patientuser'),
    re_path(r'^create-labuser/$', LabUserCreateView.as_view({'post': 'createLabUser'}),
                name='create_labuser'),
    re_path(r'^labinfo-details/$', LabInfoListView.as_view({'get': 'get_labinfo'}),
                name='labinfo_details'),
    re_path(r'^patient-details/$', PatientUserViewSet.as_view(), name='patient_details'),   
    re_path(r'^getusername/$', UsernmaeViaSessionsViewSet.as_view({'get': 'knowusername'}),
                name='getusername'),
    
]