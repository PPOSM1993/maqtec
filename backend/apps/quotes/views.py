from rest_framework import viewsets, permissions, filters, generics, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from apps.quotes.models import Cotizacion, CotizacionDetalle
from apps.quotes.serializers import CotizacionSerializer, CotizacionDetalleSerializer
from apps.quotes.pagination import StandardResultsSetPagination


# === VIEWSET PRINCIPAL ===
class CotizacionViewSet(viewsets.ModelViewSet):
    queryset = (
        Cotizacion.objects.all()
        .select_related("cliente", "vendedor")
        .prefetch_related("detalles__producto")
    )
    serializer_class = CotizacionSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = StandardResultsSetPagination

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["estado", "cliente", "vendedor", "fecha", "nota_venta"]
    search_fields = ["cliente__nombre", "cliente__rut", "oc_cliente", "id"]
    ordering_fields = ["fecha", "total", "cliente__nombre"]
    ordering = ["-fecha"]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)


# === VIEWSET DETALLE ===
class CotizacionDetalleViewSet(viewsets.ModelViewSet):
    queryset = CotizacionDetalle.objects.select_related("cotizacion", "producto")
    serializer_class = CotizacionDetalleSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = StandardResultsSetPagination

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ["cotizacion", "producto", "vendido"]
    search_fields = ["descripcion", "codigo"]
    ordering_fields = ["id", "precio_venta", "subtotal", "cantidad"]
    ordering = ["id"]

# =====================================================
# 🔎 BUSCADOR PERSONALIZADO DE COTIZACIONES
# =====================================================
@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def search_cotizacion(request):
    """
    Permite buscar cotizaciones por número, cliente o número de OC del cliente.
    """
    query = request.GET.get("q", "").strip()
    if query:
        cotizaciones = Cotizacion.objects.filter(
            id__icontains=query
        ) | Cotizacion.objects.filter(
            cliente__nombre__icontains=query
        ) | Cotizacion.objects.filter(
            oc_cliente__icontains=query
        )
    else:
        cotizaciones = Cotizacion.objects.all().order_by("-fecha")

    serializer = CotizacionSerializer(cotizaciones[:50], many=True)  # limitar resultados
    return Response(serializer.data)

# =====================================================
# 🔥 ELIMINAR COTIZACIÓN DIRECTAMENTE (función)
# =====================================================
@api_view(["DELETE"])
@permission_classes([permissions.IsAuthenticated])
def delete_cotizacion(request, pk):
    try:
        cotizacion = Cotizacion.objects.get(pk=pk)
    except Cotizacion.DoesNotExist:
        return Response({"error": "Cotización no encontrada."}, status=status.HTTP_404_NOT_FOUND)

    cotizacion.delete()
    return Response({"message": "Cotización eliminada correctamente."}, status=status.HTTP_204_NO_CONTENT)

# =====================================================
# 📄 DETALLE Y ACTUALIZACIÓN POR FUNCIÓN
# =====================================================
@api_view(["GET", "PUT"])
@permission_classes([permissions.IsAuthenticated])
def cotizacion_detail(request, pk):
    try:
        cotizacion = Cotizacion.objects.get(pk=pk)
    except Cotizacion.DoesNotExist:
        return Response({"error": "Cotización no encontrada."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = CotizacionSerializer(cotizacion)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = CotizacionSerializer(cotizacion, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(updated_by=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
