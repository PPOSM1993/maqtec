from rest_framework import generics, permissions, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from .models import Cliente
from .serializers import ClienteSerializer
from .pagination import CustomPagination


from .models import Region, City, Commune
from .serializers import RegionSerializer, CitySerializer, CommuneSerializer

class ClienteListCreateView(generics.ListCreateAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ["activo", "region", "comuna", "vendedor"]
    search_fields = ["nombre", "rut", "fantasia", "giro", "telefono"]
    ordering_fields = ["nombre", "rut", "descuento"]
    ordering = ["nombre"]
    pagination_class = CustomPagination

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            clients_data = self.get_paginated_response(serializer.data).data
        else:
            serializer = self.get_serializer(queryset, many=True)
            clients_data = serializer.data

        # Siempre traer todas las referencias
        regions = RegionSerializer(Region.objects.all(), many=True).data
        cities = CitySerializer(City.objects.all(), many=True).data
        communes = CommuneSerializer(Commune.objects.all(), many=True).data

        return Response({
            "clients": clients_data,
            "regions": regions,
            "cities": cities,
            "communes": communes,
        })


class ClienteRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [permissions.IsAuthenticated]


# 🔎 Búsqueda personalizada (por nombre, rut, fantasia, giro)
@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def search_cliente(request):
    query = request.GET.get("q", "").strip()
    if query:
        clientes = (
            Cliente.objects.filter(nombre__icontains=query)
            | Cliente.objects.filter(rut__icontains=query)
            | Cliente.objects.filter(fantasia__icontains=query)
            | Cliente.objects.filter(giro__icontains=query)
        )
    else:
        clientes = Cliente.objects.all()

    serializer = ClienteSerializer(clientes, many=True)
    return Response(serializer.data)


# 🔥 Eliminación directa (función)
@api_view(["DELETE"])
@permission_classes([permissions.IsAuthenticated])
def delete_cliente(request, pk):
    try:
        cliente = Cliente.objects.get(pk=pk)
    except Cliente.DoesNotExist:
        return Response(
            {"error": "Cliente no encontrado."}, status=status.HTTP_404_NOT_FOUND
        )

    cliente.delete()
    return Response(
        {"message": "Cliente eliminado correctamente."},
        status=status.HTTP_204_NO_CONTENT,
    )


# 📄 Detalle + Update con función
@api_view(["GET", "PUT"])
@permission_classes([permissions.IsAuthenticated])
def cliente_detail(request, pk):
    try:
        cliente = Cliente.objects.get(pk=pk)
    except Cliente.DoesNotExist:
        return Response(
            {"error": "Cliente no encontrado."}, status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "GET":
        serializer = ClienteSerializer(cliente)
        return Response(serializer.data)

    elif request.method == "PUT":
        serializer = ClienteSerializer(cliente, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
