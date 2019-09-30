from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import User
from mud5games.models import Player, Room
import random
from faker import Faker
fake = Faker()

class Command(BaseCommand):

    def _room_generation(self):

        Room.objects.all().delete()

        r_outside = Room(Room_Name="Outside Cave Entrance",
                       Description="North of you, the cave mount beckons")
        # rooms = [
        #
        # Room(Room_Name="Outside Cave Entrance",
        #                Description="North of you, the cave mount beckons"),
        #
        # Room(Room_Name="Foyer", Description="""Dim light filters in from the south. Dusty
        # passages run north and east."""),
        #
        # Room(Room_Name="Grand Overlook", Description="""A steep cliff appears before you, falling
        # into the darkness. Ahead to the north, a light flickers in
        # the distance, but there is no way across the chasm."""),
        #
        # Room(Room_Name="Narrow Passage", Description="""The narrow passage bends here from west
        # to north. The smell of gold permeates the air."""),
        #
        # Room(Room_Name="Treasure Chamber", Description="""You've found the long-lost treasure
        # chamber! Sadly, it has already been completely emptied by
        # earlier adventurers. The only exit is to the south."""),
        # ]







        # r_foyer.save()
        # r_overlook.save()
        # r_narrow.save()
        # r_treasure.save()
        room_count = 100
        num_rooms = 1
        indexes = [0]
        range_of_rooms = []
        for i in range(room_count):
            range_of_rooms.append(i)

        r_outside.save()
        while num_rooms < room_count:
            # index = random.randrange(4)
            # the_room = rooms[index]
            save_room = Room(num_rooms, fake.word() + " room", fake.paragraph())
            save_room.save()
            num_rooms += 1

        rooms = Room.objects.all()
        for r in rooms:
            index = random.randrange(room_count)
            while index in indexes:
                index = random.randrange(room_count)
            indexes.append(index)
            r.connectRooms(index)


        #
        # # Link rooms together
        # r_outside.connectRooms(r_foyer)
        # r_foyer.connectRooms(r_outside)
        #
        # r_foyer.connectRooms(r_overlook)
        # r_overlook.connectRooms(r_foyer)
        #
        # r_foyer.connectRooms(r_narrow)
        # r_narrow.connectRooms(r_foyer)
        #
        # r_narrow.connectRooms(r_treasure)
        # r_treasure.connectRooms(r_narrow)

        players=Player.objects.all()
        for p in players:
          p.currentRoom=r_outside.id
          p.save()

    def handle(self, *args, **kwargs):
        self._room_generation()
