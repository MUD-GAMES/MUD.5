from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('User', views.UserView)
router.register('Rooms', views.RoomsView)
router.register('Items', views.ItemsView)

urlpatterns = [
    path('', include(router.urls))
]