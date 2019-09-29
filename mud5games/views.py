from django.views.generic import View
from django.views import generic
# from django.contrib.auth.forms import UserCreationForm
# from django.urls import reverse_lazy
from django.shortcuts import render
from rest_framework import generics, viewsets, permissions
from rest_framework import serializers
from rest_framework.response import Response
from knox.models import AuthToken
from mud5games.models import Player, Room
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.utils.decorators import method_decorator

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
        if user.pk is not None:
            Player.objects.create(the_user=user)
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

# Return User Data From Login
# =======================================================
# =======================================================

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = [ 'id', 'the_user', 'currentRoom' ]


class PlayerApi(generics.ListAPIView):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()
    def get(self, request):
        return self.list(request)

    def put(self, request, pk, format=None):
        player = self.get_object(pk)
        serializer = PlayerSerializer(player, data=requrest.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Room Data
# =======================================================
# =======================================================

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ["id","Room_Name", "Description", "connect" ]

class RoomsApi(generics.ListAPIView):
    serializer_class = RoomSerializer
    queryset = Room.objects.all()
    def get(self, request):
        return self.list(request)


# Front End Render
# =======================================================
# =======================================================

class FrontendRenderView(View):
    # queryset = Players.objects.all()
    # serializer_class = PlayersSerializer
    def get(self, request, *args, **kwargs):
        return render(request, "front_end_entry.html",{})


# class UserView(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

# class UserView(generics.ListAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
