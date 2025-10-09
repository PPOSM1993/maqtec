from rest_framework import generics, permissions, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from .models import Producto
from .serializers import ProductoSerializer
from .pagination import CustomPagination


# === LIST / CREATE ===
class ProductoListCreateView(generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [permissions.IsAuthenticated]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['categoria', 'articulo_activo', 'control_stock']
    search_fields = ['codigo', 'descripcion']
    ordering_fields = ['codigo', 'descripcion', 'valor_neto', 'precio_minimo']
    ordering = ['codigo']
    pagination_class = CustomPagination


# === RETRIEVE / UPDATE / DELETE ===
class ProductoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [permissions.IsAuthenticated]


# 🔎 Búsqueda personalizada (por código o descripción)
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def search_producto(request):
    query = request.GET.get('q', '').strip()
    if query:
        productos = Producto.objects.filter(
            codigo__icontains=query
        ) | Producto.objects.filter(
            descripcion__icontains=query
        )
    else:
        productos = Producto.objects.all()

    serializer = ProductoSerializer(productos, many=True)
    return Response(serializer.data)


# 🔥 Eliminación directa (función)
@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_producto(request, pk):
    try:
        producto = Producto.objects.get(pk=pk)
    except Producto.DoesNotExist:
        return Response({"error": "Producto no encontrado."}, status=status.HTTP_404_NOT_FOUND)

    producto.delete()
    return Response({"message": "Producto eliminado correctamente."}, status=status.HTTP_204_NO_CONTENT)


# 📄 Detalle + Update con función
@api_view(['GET', 'PUT'])
@permission_classes([permissions.IsAuthenticated])
def producto_detail(request, pk):
    try:
        producto = Producto.objects.get(pk=pk)
    except Producto.DoesNotExist:
        return Response({"error": "Producto no encontrado."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProductoSerializer(producto)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProductoSerializer(producto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
