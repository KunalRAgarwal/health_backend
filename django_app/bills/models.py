from django.db import models
from login.models import LabInfo, PatientUser

class Bills(models.Model):
    labid = models.ForeignKey(LabInfo, on_delete=models.CASCADE)
    patientid = models.ForeignKey(PatientUser, on_delete=models.CASCADE)
    totalprice = models.IntegerField()

    def __str__(self):
        return f"Bill ID: {self.pk} - Lab ID: {self.labid} - Patient ID: {self.patientid}"

