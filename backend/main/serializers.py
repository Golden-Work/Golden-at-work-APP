from rest_framework import serializers
from .models import Major, Implement, ImplementHistory, Reservation
from django.utils import timezone
from datetime import timedelta

class MajorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Major
        fields = '__all__'

class ImplementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Implement
        fields = '__all__'

    def create(self, validated_data):
        implement =  super().create(validated_data)
        # every time an implement is added, we need to create the corresponding reservations for the current week (if it is not sat or sun)
        today = timezone.now()
        current_weekday = today.isoweekday()
        # if it is sat or sun, do nothing
        if current_weekday == 6 or current_weekday == 7:
            return super().create(validated_data)
        
        reservations = []
        today = today.replace(hour=13, minute=0, second=0, microsecond=0)
        for i in range(5 - current_weekday + 1):
            for j in range(0, 10):
                start_date = today + timedelta(days=i, hours=j)
                end_date = start_date + timedelta(hours=1)
                reservation = Reservation.objects.create(
                    implement=implement,
                    start_date=start_date,
                    end_date=end_date
                )
                reservations.append(reservation)
        


        return implement

class ImplementHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model=ImplementHistory
        fields = '__all__'

class ReservationSerializer(serializers.ModelSerializer):
    implement = ImplementSerializer()
    class Meta:
        model = Reservation
        fields = ['id', 'start_date', 'end_date', 'implement', 'status', 'return_label', 'return_state_description']
