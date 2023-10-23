from django.urls import path
from . import views


urlpatterns = [
    path('majors', views.ListMajor.as_view(), name='majors'),
    path('reservations', views.create_reservations_for_week, name='reservations'),
    path('implements', views.ImplementAPIView.as_view(), name='implements'),
]
