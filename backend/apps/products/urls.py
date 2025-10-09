from django.urls import path
from .views import (
    ProductoListCreateView,
    ProductoRetrieveUpdateDestroyView,
    search_producto,
    delete_producto,
    producto_detail,
)

urlpatterns = [
    path('products/', ProductoListCreateView.as_view(), name='producto-list-create'),
    path('products/<int:pk>/', ProductoRetrieveUpdateDestroyView.as_view(), name='producto-detail'),
    path('products/search/', search_producto, name='producto-search'),
    path('products/<int:pk>/delete/', delete_producto, name='producto-delete'),
    path('products/<int:pk>/detail/', producto_detail, name='producto-detail-func'),
]