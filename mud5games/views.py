from django.views.generic import View
from django.views import generic
# from django.contrib.auth.forms import UserCreationForm
# from django.urls import reverse_lazy
from django.shortcuts import render
from rest_framework import generics, viewsets, permissions
from rest_framework import serializers
from rest_framework.response import Response
from knox.models import AuthToken
from .models import User

# Create your views here.

# users
# =======================================================
# =======================================================

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "User_Name", "Password", "Email" )
        extra_kwargs = {'Password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create(User_Name=validated_data['User_Name'],Password=validated_data['Password'], Email=validated_data["Email"] )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'User_Name', 'Password', "Email" )

# Registration
# =======================================================
# =======================================================

class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })

class FrontendRenderView(View):
    # queryset = Players.objects.all()
    # serializer_class = PlayersSerializer
    def get(self, request, *args, **kwargs):
        return render(request, "front_end_entry.html",{})


    # class SignUp(generic.CreateView):
#     form_class = UserCreationForm
#     success_url = reverse_lazy('accounts/login/')
#     template_name = 'registration/registration.html'

class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# class UserView(generics.ListAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
