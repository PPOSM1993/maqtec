from django.urls import path
from .views import (
    ClienteListCreateView,
    ClienteRetrieveUpdateDestroyView,
    search_cliente,
    delete_cliente,
    cliente_detail
)

urlpatterns = [
    path('clients/', ClienteListCreateView.as_view(), name='clients-list-create'),
    path('clients/<int:pk>/', ClienteRetrieveUpdateDestroyView.as_view(), name='clients-detail'),
    path('clients/search/', search_cliente, name='clients-search'),
    path('clients/delete/<int:pk>/', delete_cliente, name='clients-delete'),
    path('clients/detail/<int:pk>/', cliente_detail, name='clients-detail-func'),
]
