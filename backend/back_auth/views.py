from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from .models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.decorators import permission_classes


@api_view(['POST'])
def signup(request):
    data = request.data
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        user = User.objects.create_user(**data)
        serializer = UserSerializer(user)
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
