from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from decouple import config
from django.contrib.auth.models import User
from .models import *
from rest_framework.decorators import api_view
from django.http import HttpResponse
import json

@csrf_exempt
@api_view(["GET"])
def initialize(request):
    user = request.user
    return HttpResponse(user)
    # return JsonResponse({"username": user.User_Name})
