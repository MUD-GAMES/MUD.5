from django.conf.urls import include, url
from rest_framework import routers

from mud5games.views import  RegistrationAPI, LoginApi, UserAPI, PlayerApi, RoomsApi

router = routers.DefaultRouter()
# router.register('player', PlayerApi)

urlpatterns = [
    url("^", include(router.urls)),
    url("^auth/register/$", RegistrationAPI.as_view()),
    url("^auth/login/$", LoginApi.as_view()),
    url("^auth/user/$", UserAPI.as_view()),
    url("^auth/player/$", PlayerApi.as_view()),
    url("^auth/rooms/$", RoomsApi.as_view())
]
