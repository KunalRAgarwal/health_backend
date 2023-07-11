from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.contrib.auth import get_user_model

class User(AbstractUser):
    pass

class LabInfo(models.Model):
    labid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    secretlab = models.CharField(max_length=255)  # Add secretlab code field

    def __str__(self):
        return self.name


class LabUser(models.Model):
    labid = models.ForeignKey(LabInfo, on_delete=models.CASCADE)
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} - Lab ID: {self.labid}"


class PatientUser(models.Model):
    patientid = models.AutoField(primary_key=True)
    labid = models.ForeignKey(LabInfo, on_delete=models.CASCADE)
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.user.username} - Patient ID: {self.patientid}"

# Update related_name for groups and user_permissions in the custom User model
User._meta.get_field('groups').remote_field.related_name = 'login_users'
User._meta.get_field('user_permissions').remote_field.related_name = 'login_users'
