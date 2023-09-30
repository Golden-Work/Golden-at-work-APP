from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from .models import User


@api_view(['POST'])
def signup(request):
    data = request.data
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        user = User.objects.create_user(**data)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
