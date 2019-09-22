from django.views.generic import View
from django.shortcuts import render
from rest_framework import generics
from rest_framework import serializers

from mud5games.models import Players
# Create your views here.

class PlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Players
        fields = [
            "name"
        ]


class PlayersListView(generics.ListAPIView):
    queryset = Players.objects.all()
    serializer_class = PlayersSerializer

class FrontendRenderView(View):
    queryset = Players.objects.all()
    serializer_class = PlayersSerializer
    def get(self, request, *args, **kwargs):
        return render(request, "front_end_entry.html", {"data": self.queryset})


