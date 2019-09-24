"""mud5 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.generic.base import TemplateView
# from mud5games.views import FrontendRenderView, PlayersListView
from mud5games.views import FrontendRenderView
# from django.conf.urls import include, url as re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    # path('', TemplateView.as_view(template_name='home.html'), name='home'),
    # re_path('players', PlayersListView.as_view(), name="list")
]

urlpatterns += [
    # re_path(r'(?P<path>.*)', TemplateView.as_view(template_name='front_end_entry.html'))
    re_path('.*', FrontendRenderView.as_view())
]

