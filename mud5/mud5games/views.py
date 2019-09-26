from django.shortcuts import render
from .models import User, Rooms, Items
from rest_framework import viewsets
from .serializers import UserSerializer, RoomSerializer, ItemsSerializer

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RoomsView(viewsets.ModelViewSet):
    queryset = Rooms.objects.all()
    serializer_class = RoomSerializer

class ItemsView(viewsets.ModelViewSet):
    queryset = Items.objects.all()
    serializer_class = ItemsSerializer
