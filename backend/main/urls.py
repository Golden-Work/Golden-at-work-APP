from django.urls import path
from . import views


urlpatterns = [
    path('majors', views.ListMajor.as_view(), name='majors'),
    path('reservations', views.ReservationsAPIView.as_view(), name='reservations'),

    path('implements', views.ImplementAPIView.as_view(), name='implements'),
]
