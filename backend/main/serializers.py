from rest_framework import serializers
from .models import Major, Implement, Reservation


class MajorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Major
        fields = '__all__'

class ImplementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Implement
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    implement = ImplementSerializer()
    class Meta:
        model = Reservation
        fields = ['id', 'start_date', 'end_date', 'implement', 'status', 'return_label', 'return_state_description']
