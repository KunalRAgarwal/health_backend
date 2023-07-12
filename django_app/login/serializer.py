from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import LabInfo, LabUser, PatientUser

User = get_user_model()

class LabInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabInfo
        fields = '__all__'


class LabUserSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = LabUser
        fields = '__all__'


class PatientUserSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    username = serializers.SerializerMethodField()

    class Meta:
        model = PatientUser
        fields = '__all__'

    def get_username(self, obj):
        return obj.user.username
