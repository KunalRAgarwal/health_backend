from rest_framework import serializers
from .models import Bills
from tests.models import TestsConducted
from tests.serializer import TestsConductedSerializer

class BillSerializer(serializers.ModelSerializer):
    labname = serializers.PrimaryKeyRelatedField(source='labid.name', read_only=True)
    labemail = serializers.PrimaryKeyRelatedField(source='labid.email', read_only=True)
    labphone = serializers.PrimaryKeyRelatedField(source='labid.phone', read_only=True)
    testconducted_set = serializers.SerializerMethodField()

    class Meta:
        model = Bills
        fields = ['id', 'labid', 'patientid', 'totalprice', 'testconducted_set','labname','labemail','labphone']

    def get_testconducted_set(self, obj):
        testconducted_qs = TestsConducted.objects.filter(billid=obj.id)
        serializer = TestsConductedSerializer(testconducted_qs, many=True)
        return serializer.data