from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Major, Implement, Reservation
from .serializers import MajorSerializer, ImplementSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from django.utils import timezone
import datetime




class ListMajor(generics.ListAPIView):
    queryset = Major.objects.all()
    serializer_class = MajorSerializer
    permission_classes = [AllowAny]
    pagination_class = None

class ImplementAPIView(generics.ListCreateAPIView):
    queryset = Implement.objects.all()
    serializer_class = ImplementSerializer
    permission_classes = [AllowAny]

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.request.method == 'GET':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]

@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_reservations_for_week(request):
    """
    Creates reservations for the next week (monday to friday)

    For every implement, create reservations
    in time slots from 8:00 to 18:00 with 1 hour intervals.

    This endpoint is only accessible by admins and it is called
    every monday at 2:00 am by a cloud function.
    """
    implements = Implement.objects.all()
    reservations = []
    monday = timezone.now()
    for implement in implements:
        # for every day of the week
        for i in range(5):
            # for every hour of the day
            for j in range(8, 18):
                start_date = monday + datetime.timedelta(days=i, hours=j)
                end_date = start_date + datetime.timedelta(hours=1)
                reservation = Reservation(
                    implement=implement,
                    start_date=start_date,
                    end_date=end_date
                )
                reservations.append(reservation)
    Reservation.objects.bulk_create(reservations)
    return Response(status=status.HTTP_201_CREATED)

    