from django.views.generic import View
from django.views import generic
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy
from django.shortcuts import render
from rest_framework import generics
from rest_framework import serializers

# from mud5games.models import Players
# Create your views here.

# class PlayersSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Players
#         fields = [
#             "name"
#         ]
#
#
# class PlayersListView(generics.ListAPIView):
#     queryset = Players.objects.all()
#     serializer_class = PlayersSerializer
class SignUp(generic.CreateView):
    form_class = UserCreationForm
    success_url = reverse_lazy('accounts/login/')
    template_name = 'registration/registration.html'

class FrontendRenderView(View):
    # queryset = Players.objects.all()
    # serializer_class = PlayersSerializer
    def get(self, request, *args, **kwargs):
        return render(request, "front_end_entry.html",{})


