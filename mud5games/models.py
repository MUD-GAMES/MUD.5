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
    the_user = models.OneToOneField(User, on_delete=models.CASCADE)
    # currentRoom = models.IntegerField(default=0)
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


class Rooms(models.Model):
    Room_Name=models.CharField(max_length=50)
    Description = models.CharField(max_length=500, default="DEFAULT DESCRIPTION")
    N_to = models.IntegerField(default=0)
    S_to = models.IntegerField(default=0)
    E_to = models.IntegerField(default=0)
    W_to = models.IntegerField(default=0)
    Item=models.ManyToManyField('Items', blank=True)

    def connectRooms(self, destinationRoom, direction):
        destinationRoomID = destinationRoom.id
        try:
            destinationRoom = Room.objects.get(id=destinationRoomID)
        except Room.DoesNotExist:
            print("That room does not exist")
        else:
            if direction == "n":
                self.n_to = destinationRoomID
            elif direction == "s":
                self.s_to = destinationRoomID
            elif direction == "e":
                self.e_to = destinationRoomID
            elif direction == "w":
                self.w_to = destinationRoomID
            else:
                print("Invalid direction")
                return
            self.save()

class Items(models.Model):
    Item_Name=models.CharField(max_length=50)
    Room=models.ManyToManyField('Rooms', blank=True)

    def __str__(self):
        return self.Item_Name, self.Room


# @receiver(post_save, sender=User)
# def create_user(sender, instance, created, **kwargs):
#     if created:
#         Player.objects.create(the_user=instance)
#
# @receiver(post_save,sender=User)
# def save_user_player(sender, instance, **kwargs):
#     instance.player.save()
