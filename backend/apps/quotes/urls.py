from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.quotes.views import CotizacionViewSet

router = DefaultRouter()
router.register(r"cotizaciones", CotizacionViewSet, basename="cotizaciones")

urlpatterns = [
    path("", include(router.urls)),
]
