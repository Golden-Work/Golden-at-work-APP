from django.urls import path
from . import views


urlpatterns = [
    path('majors', views.ListMajor.as_view(), name='majors'),
    path('reservations', views.ReservationsAPIView.as_view(), name='reservations'),
    path('reservations/<int:pk>', views.UpdateDestroyReservation.as_view(), name='reservation_detail'),
    path('reserve', views.reserve, name='reserve'),
    path('cancel/<int:pk>', views.cancel, name='cancel'),
    path('implements', views.ImplementAPIView.as_view(), name='implements'),
    path('implements/<int:id>', views.DeleteImplement.as_view(), name='delete_implement'),
    path('favorits/<int:pk>', views.implements_favorites, name='favorits')
]
