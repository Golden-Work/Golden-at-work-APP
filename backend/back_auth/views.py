from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, MyTokenObtainPairSerializer
from .models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView
from django.core.mail import send_mail
from django.http import JsonResponse
from django.conf import settings

@api_view(['POST'])
def signup(request):
    data = request.data
    serializer = UserSerializer(data=data)
    if serializer.is_valid():

        first_name = data['first_name']
        last_name = data['last_name']
        email = data['email']
        password = data['password']
        major = data['major']
        document = data['document']
        user = User.objects.create_user(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password,
            major_id=major,
            document=document,
            is_active=True
        )
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

    if not user.is_active:
        return Response({'message': 'Usuario no activo'}, status=status.HTTP_400_BAD_REQUEST)

    # generate a random token and save it in the database
    user.generate_password_reset_token()

    subject = 'Recuperación de contraseña'
    message = f'Hola {user.first_name} {user.last_name},\n\nPara recuperar tu contraseña ingresa al siguiente link: {settings.FRONTEND_URL}/reset-password/?token={user.recovery_token}'
    from_email = settings.EMAIL_HOST_USER
    to_email = [email]

    send_mail(subject, message, from_email, to_email, fail_silently=False)

    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
def password_reset_confirm(request, token):
    data = request.data
    email = data['email']
    password = data['password']
    user = User.objects.get(email=email)    

    if user.recovery_token != token:
        return Response({'message': 'Token inválido'}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(password)
    user.recovery_token = None
    user.save()

    return Response(status=status.HTTP_200_OK)

@api_view(['POST'])
def welcome_email(request):
    data = request.data
    email = data['eemail']

    subject = '¡Bienvenido a Golden-App!'
    message = ''
    html_message = f"""
        <html>
            <body>
                <img src="https://static.wikia.nocookie.net/logopedia/images/7/78/Universidad_Nacional_de_Colombia_Coat_of_Arms_Redesign_Color_%282016%29.png/revision/latest/scale-to-width-down/250?cb=20210520153054&path-prefix=es" alt="UN Logo">
                <p>Hola,</p>
                <p>Bienvenido a Golden-App! Estamos construyendo una comunidad comprometida para planificar, desarrollar y desplegar una plataforma de administración que simplifique y mejore el proceso de préstamo de los artículos del edificio 401.</p>
                <p>Recuerda que puedes continuar en: <a href="{settings.FRONTEND_URL}/login">{settings.FRONTEND_URL}/login</a></p>
            </body>
        </html>
    """
    from_email = settings.EMAIL_HOST_USER
    to_email = [email]

    try:
        send_mail(subject, message, from_email, to_email, fail_silently=False, html_message=html_message)
        return Response({'message': 'Correo de bienvenida enviado'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': 'Error al enviar el correo de bienvenida'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class MyTokenObtainPairView(TokenObtainPairView):
    """
    Makes JWT deliver the custom attributes
    """

    serializer_class = MyTokenObtainPairSerializer
