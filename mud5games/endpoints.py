from django.conf.urls import include, url
from rest_framework import routers

from mud5games.views import UserView, RegistrationAPI, LoginApi, UserAPI

router = routers.DefaultRouter()
# router.register('users', UserView)

urlpatterns = [
    url("^", include(router.urls)),
    url("^auth/register/$", RegistrationAPI.as_view()),
    url("^auth/login/$", LoginApi.as_view()),
    url("^auth/user/$", UserAPI.as_view())
]
