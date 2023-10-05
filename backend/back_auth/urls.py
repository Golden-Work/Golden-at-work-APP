from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('login', TokenObtainPairView.as_view(), name='login'),
    path('refresh', TokenRefreshView.as_view(), name='refresh'),
    path('signup', views.signup, name='signup'),
    path('logout', views.logout, name='logout'),
    path('delete', views.delete_user, name='delete'),
    path('update', views.update_user, name='update'),
    path('self', views.get_user, name='self'),
]
