from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save
import uuid

# class User(models.Model):
#     id=models.AutoField(primary_key=True)
#     User_Name=models.CharField(max_length=50)
#     Password=models.CharField(max_length=100)
#     Email=models.CharField(max_length=50, unique=True)
#     First_Name=models.CharField(max_length=50)
#     Last_Name=models.CharField(max_length=50)
#     # Token=models.CharField(max_length=100, null=True)
#     # Room=models.ManyToManyField('Rooms', blank=True)
#     # Item=models.ManyToManyField('Items', blank=True)
#     def create(self):
#         return self;

class Player(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, unique=True)
    the_user = models.ForeignKey(User, on_delete=models.CASCADE)
    currentRoom = models.IntegerField(default=0)

    def initialize(self):
        if self.currentRoom == 0:
            self.currentRoom = Room.objects.first().id
            self.save()

    def room(self):
        try:
            return Room.objects.get(id=self.currentRoom)
        except Room.DoesNotExist:
            self.initialize()
            return self.room()


class Room(models.Model):
    Room_Name=models.CharField(max_length=50)
    Description = models.CharField(max_length=500, default="DEFAULT DESCRIPTION")
    connect = models.IntegerField(default=0)

    def connectRooms(self, destinationRoom):
        destinationRoomID = destinationRoom
        try:
            destinationRoom = Room.objects.get(id=destinationRoomID)
        except Room.DoesNotExist:
            print("That room does not exist")
            print(f'Room does not exist: {destinationRoomID}')
        if destinationRoom:
            self.connect = destinationRoomID
            self.save()
        else:
            print("Invalid direction")
            self.connect = 0
            return
            self.save()


class World:
    world=models.CharField()
# class Items(models.Model):
#     Item_Name=models.CharField(max_length=50)
#     Room=models.ManyToManyField('Room', blank=True)
#
#     def __str__(self):
#         return self.Item_Name, self.Room


# @receiver(post_save, sender=User)
# def create_user(sender, instance, created, **kwargs):
#     if created:
#         Player.objects.create(the_user=instance)
#
# @receiver(post_save,sender=User)
# def save_user_player(sender, instance, **kwargs):
#     instance.player.save()
