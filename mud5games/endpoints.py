from django.conf.urls import include, url
from rest_framework import routers

from mud5games.views import UserView, RegistrationAPI

router = routers.DefaultRouter()
router.register('users', UserView)

urlpatterns = [
    url("^", include(router.urls)),
    url("^auth/register/$", RegistrationAPI.as_view())
]
