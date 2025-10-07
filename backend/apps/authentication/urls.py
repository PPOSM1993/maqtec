from django.urls import path
from .views import HelloAuthView

urlpatterns = [
    path('hello/', HelloAuthView.as_view(), name='hello-auth'),
]
