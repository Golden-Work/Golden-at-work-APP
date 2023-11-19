from rest_framework import generics
from .models import Major, Implement, Reservation
from .serializers import MajorSerializer, ImplementSerializer, ReservationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser, BasePermission, SAFE_METHODS
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.utils import timezone
import datetime
from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


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


class DeleteImplement(generics.DestroyAPIView):
    queryset = Implement.objects.all()
    serializer_class = ImplementSerializer
    permission_classes = [IsAdminUser]
    lookup_url_kwarg = 'id'
    

class ReservationsAPIView(APIView):
    permission_classes = [IsAdminUser|ReadOnly]


    def get(self, request, format=None):
        """
        Get week reservations (monday to friday)
        """
        # filter reservations by the current week or if it is friday, get current week and next week reservations
        if timezone.now().isoweekday() >= 5:
            reservations = Reservation.objects.filter(start_date__week__in=[timezone.now().isocalendar()[1], timezone.now().isocalendar()[1]+1]).select_related('implement', 'borrowed_by')
        else:
            reservations = Reservation.objects.filter(start_date__week=timezone.now().isocalendar()[1]).select_related('implement')

        serializer = ReservationSerializer(reservations, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, format=None):
        """
        Creates reservations for the next week (monday to friday)

        For every implement, create reservations
        in time slots from 8:00 to 18:00 with 1 hour intervals.

        This endpoint is only accessible by admins and it is called
        every friday or saturday or sunday at 6:00 pm (UTC-5) by a cron job.
        """
        implements = Implement.objects.all()
        reservations = []
        today = timezone.now()
        # get next monday
        monday = today + datetime.timedelta(days=-today.weekday(), weeks=1)
        # use UTC-5 timezone
        # set the initial time to monday 8:00 am (UTC-5)
        monday = monday.replace(hour=13, minute=0, second=0, microsecond=0)
        for implement in implements:
            # for every day of the week
            for i in range(5):
                # for every hour of the day (from 8:00 to 18:00)
                for j in range(0, 10):
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
    
class UpdateDestroyReservation(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    permission_classes = [IsAdminUser]

    # allow partial updates
    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def reserve(request):
    user = request.user
    reservation_id = request.data['reservation_id']
    reservation = Reservation.objects.get(id=reservation_id)

    if reservation.status != 'AVAILABLE':
        return Response({'message': 'El implemento ya no está disponible'}, status=status.HTTP_400_BAD_REQUEST)
    
    reservation.borrowed_by = user
    reservation.status = 'RESERVED'
    reservation.generate_cancel_token()
    reservation.save()
    serializer = ReservationSerializer(reservation)
    subject = 'Tu implemento ha sido reservado'
    cancel_url = f'{settings.FRONTEND_URL}/reservation/{reservation_id}/cancel/?token={reservation.cancel_token}'
    html_message = render_to_string('reservation-email.html', {'reservation': reservation, 'user': user, 'cancel_url': cancel_url})
    plain_message = strip_tags(html_message)
    from_email = settings.EMAIL_HOST_USER
    to_email = [user.email]

    # send email to user
    send_mail(subject, plain_message, from_email, to_email, html_message=html_message)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PUT'])
def cancel(request, pk):
    token = request.data['token']
    reservation = Reservation.objects.get(pk=pk)
    if str(reservation.cancel_token) != token:
        return Response({'message': 'Token inválido'}, status=status.HTTP_400_BAD_REQUEST)

    if reservation.status != 'RESERVED':
        return Response({'message': 'El implemento no está reservado'}, status=status.HTTP_400_BAD_REQUEST)
    
    reservation.borrowed_by = None
    reservation.status = 'AVAILABLE'
    reservation.save()
    serializer = ReservationSerializer(reservation)
    return Response(serializer.data, status=status.HTTP_200_OK)



    