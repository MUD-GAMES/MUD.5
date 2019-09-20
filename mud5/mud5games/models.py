from django.db import models


class User(models.Model):
    User_Name=models.CharField(max_length=50)
    Email=models.CharField(max_length=50, unique=True)
    First_Name=models.CharField(max_length=50)
    Last_Name=models.CharField(max_length=50)
    Token=models.CharField(max_length=100, null=True)
    Room=models.ManyToManyField('Rooms', blank=True)
    Item=models.ManyToManyField('Items', blank=True)

class Rooms(models.Model):
    Room_Name=models.CharField(max_length=50)
    Item=models.ManyToManyField('Items', blank=True)
    
    def __str__(self):
        return self.Room_Name
        
class Items(models.Model):
    Item_Name=models.CharField(max_length=50)
    Room=models.ManyToManyField('Rooms', blank=True)
    
    def __str__(self):
        return self.Item_Name, self.Room
