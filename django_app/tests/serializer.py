from rest_framework import serializers
from .models import Test,TestsConducted

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ['testid', 'name', 'price']

class TestsConductedSerializer(serializers.ModelSerializer):
    billid = serializers.PrimaryKeyRelatedField(source='billid.id', read_only=True)
    test = serializers.PrimaryKeyRelatedField(source='testid.name', read_only=True)

    class Meta:
        model = TestsConducted
        fields = ['id', 'billid', 'test','price','created_on']
