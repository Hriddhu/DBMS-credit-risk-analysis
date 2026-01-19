from django.urls import path
from api.views.auth import login

urlpatterns = [
    path("login/", login),
]


