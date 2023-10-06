from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from .models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.decorators import permission_classes
from django.core.mail import send_mail
from decouple import config
from django.conf import settings


FRONTEND_URL = config('FRONTEND_URL')


@api_view(['POST'])
def signup(request):
    data = request.data
    data['is_active'] = False
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        user = User.objects.create_user(**data)
        serializer = UserSerializer(user)

        # send email to user
        ####################

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """Blacklist the refresh token: extract token from the header
      during logout request user and refresh token is provided"""
    try:
        REFRESH_TOKEN = request.data["refresh"]
        refresh_token = RefreshToken(REFRESH_TOKEN)
        refresh_token.blacklist()
    except TokenError as e:
        return Response({'message': e.args[0], 'code': 1000}, status=status.HTTP_400_BAD_REQUEST)

    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user
    data = request.data

    serializer = UserSerializer(user, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request):
    request.user.delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def password_reset(request):
    data = request.data
    email = data['email']
    user = User.objects.get(email=email)

    # generate a random token and save it in the database
    user.generate_password_reset_token()

    subject = 'Recuperación de contraseña'
    message = f'Hola {user.first_name} {user.last_name},\n\nPara recuperar tu contraseña ingresa al siguiente link: {FRONTEND_URL}/password-reset/{user.recovery_token}'
    from_email = settings.EMAIL_HOST_USER
    to_email = [email]

    send_mail(subject, message, from_email, to_email, fail_silently=False)

    return Response(status=status.HTTP_200_OK)
