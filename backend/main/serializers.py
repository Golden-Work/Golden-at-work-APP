from rest_framework import serializers
from .models import Major, Implement


class MajorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Major
        fields = '__all__'

class ImplementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Implement
        fields = '__all__'
