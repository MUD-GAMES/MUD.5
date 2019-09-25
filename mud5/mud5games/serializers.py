from .models import User, Rooms, Items
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('User_Name', 'Email', 'First_Name', 'Last_name', 'Room', 'Item')

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rooms
        fields = ('Room_Name', 'Item')

class ItemsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Items
        fields = ('Item_Name', 'Room')