from django.contrib import admin
from .models import LabInfo, LabUser, PatientUser
from django.contrib.sessions.models import Session


admin.site.register(Session)
admin.site.register(LabInfo)
admin.site.register(LabUser)
admin.site.register(PatientUser)
