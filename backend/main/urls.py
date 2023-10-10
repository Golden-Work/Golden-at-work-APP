from django.urls import path
from . import views


urlpatterns = [
    path('majors', views.ListMajor.as_view(), name='majors'),
]
