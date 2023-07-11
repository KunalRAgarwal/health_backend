from rest_framework import serializers
from .models import Test,TestsConducted

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ['testid', 'name', 'price']

class TestsConductedSerializer(serializers.ModelSerializer):
    test = TestSerializer(source='testid', read_only=True)

    class Meta:
        model = TestsConducted
        fields = ['id', 'billid', 'test', 'price']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['billid'] = instance.billid.id
        return representation
