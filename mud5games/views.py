from django.views.generic import View
from django.views import generic
# from django.contrib.auth.forms import UserCreationForm
# from django.urls import reverse_lazy
from django.shortcuts import render
from rest_framework import generics, viewsets, permissions
from rest_framework import serializers
from rest_framework.response import Response
from knox.models import AuthToken
from mud5games.models import User
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.dispatch import receiver
from django.db.models.signals import post_save

# Create your views here.

# users
# =======================================================
# =======================================================

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        validated_data['email'],
                                        validated_data['password'])
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username' )

# Registration
# =======================================================
# =======================================================

class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    @receiver(post_save, sender=User)
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Login
# =======================================================
# =======================================================

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to Log in with provided Creds")

class LoginApi(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Return User Data From Login
# =======================================================
# =======================================================

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

# Front End Render
# =======================================================
# =======================================================

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
