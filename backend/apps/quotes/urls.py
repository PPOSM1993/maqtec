from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.quotes.views import (
    CotizacionViewSet,
    CotizacionDetalleViewSet,
    search_cotizacion,
    delete_cotizacion,
    cotizacion_detail,
)

router = DefaultRouter()
router.register(r"cotizaciones", CotizacionViewSet, basename="cotizaciones")
router.register(r"detalles", CotizacionDetalleViewSet, basename="detalles")

urlpatterns = [
    path("", include(router.urls)),
    path("quotes/search/", search_cotizacion, name="search_cotizacion"),
    path("quotes/<int:pk>/", cotizacion_detail, name="cotizacion_detail"),
    path("quotes/<int:pk>/delete/", delete_cotizacion, name="delete_cotizacion"),
]
