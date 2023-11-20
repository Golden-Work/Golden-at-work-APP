from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('login', views.MyTokenObtainPairView.as_view(), name='login'),
    path('refresh', TokenRefreshView.as_view(), name='refresh'),
    path('signup', views.signup, name='signup'),
    path('logout', views.logout, name='logout'),
    path('delete', views.delete_user, name='delete'),
    path('update', views.update_user, name='update'),
    path('self', views.get_user, name='self'),
    path('welcome_email', views.welcome_email, name='welcome_email'),
    path('reset-password', views.password_reset, name='password-reset'),
    path('reset-password/<str:token>', views.password_reset_confirm,
         name='password-reset-confirm'),
]
