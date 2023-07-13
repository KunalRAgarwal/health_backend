from django.urls import re_path
from django.views.decorators.csrf import csrf_exempt
from .views import UserAuthenticationView,LabUserCreateView,LabInfoListView,\
        PatientUserViewSet,UsernmaeViaSessionsViewSet,AllLabInfoListView
        
login_url_patterns = [
    re_path(r'^login/$', UserAuthenticationView.as_view({'post': 'user_authentication'}),
            name='login'),
    re_path(r'^create-labuser/$', LabUserCreateView.as_view({'post': 'createLabUser'}),
                name='create_labuser'),
    re_path(r'^labinfo-details/$', LabInfoListView.as_view({'get': 'get_labinfo'}),
                name='labinfo_details'),
    re_path(r'^labinfo-details-all/$', AllLabInfoListView.as_view({'get': 'get_all_labinfo'}),
                name='labinfo_details_all'),
#     AllLabInfoListView
    re_path(r'^patient-details/$', PatientUserViewSet.as_view(), name='patient_details'),   
    re_path(r'^getusername/$', UsernmaeViaSessionsViewSet.as_view({'get': 'knowusername'}),
                name='getusername'),
    
]