from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Major
from .serializers import MajorSerializer
# Create your views here.


class ListMajor(generics.ListAPIView):
    queryset = Major.objects.all()
    serializer_class = MajorSerializer
    permission_classes = [AllowAny]
    pagination_class = None
