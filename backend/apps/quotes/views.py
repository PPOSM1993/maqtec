from rest_framework import viewsets, permissions, filters, status
from django_filters.rest_framework import DjangoFilterBackend  # ✅ Correcto
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from django.shortcuts import get_object_or_404

from apps.quotes.models import Cotizacion, CotizacionDetalle
from apps.quotes.serializers import CotizacionSerializer, CotizacionDetalleSerializer
from apps.quotes.pagination import StandardResultsSetPagination


class CotizacionViewSet(viewsets.ModelViewSet):
    """
    ViewSet unificado para Cotizaciones con:
    - CRUD completo
    - búsqueda personalizada
    - soft delete
    """
    queryset = (
        Cotizacion.objects.filter(is_active=True)
        .select_related("cliente", "vendedor")
        .prefetch_related("detalles__producto")
    )
    serializer_class = CotizacionSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = StandardResultsSetPagination

    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]

    filterset_fields = ["estado", "cliente", "vendedor", "fecha", "nota_venta"]
    search_fields = ["cliente__nombre", "cliente__rut", "oc_cliente", "id"]
    ordering_fields = ["fecha", "total", "cliente__nombre"]
    ordering = ["-fecha"]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def perform_update(self, serializer):
        serializer.save(updated_by=self.request.user)

    def perform_destroy(self, instance):
        # Soft delete
        instance.is_active = False
        instance.save(update_fields=["is_active"])

    @action(detail=False, methods=["get"], url_path="search")
    def search(self, request):
        """
        Búsqueda personalizada de cotizaciones por número, cliente o OC.
        """
        query = request.GET.get("q", "").strip()
        if query:
            queryset = self.queryset.filter(
                Q(id__icontains=query) |
                Q(cliente__nombre__icontains=query) |
                Q(oc_cliente__icontains=query)
            ).order_by("-fecha")
        else:
            queryset = self.queryset.order_by("-fecha")

        page = self.paginate_queryset(queryset[:50])
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=["get", "put", "patch"], url_path="detalles")
    def detalles(self, request, pk=None):
        """
        Endpoint para ver o actualizar una cotización y sus detalles.
        - GET: retorna cotización con detalles
        - PUT/PATCH: actualiza cotización y detalles
        """
        cotizacion = get_object_or_404(Cotizacion, pk=pk, is_active=True)

        if request.method == "GET":
            serializer = self.get_serializer(cotizacion)
            return Response(serializer.data)

        serializer = self.get_serializer(cotizacion, data=request.data, partial=(request.method=="PATCH"))
        if serializer.is_valid():
            serializer.save(updated_by=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
