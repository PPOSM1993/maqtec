from rest_framework import serializers
from apps.quotes.models import Cotizacion, CotizacionDetalle
from apps.clients.models import Cliente
from apps.products.models import Producto


# === DETALLE DE COTIZACIÓN ===
class CotizacionDetalleSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source="producto.descripcion", read_only=True)
    producto_codigo = serializers.CharField(source="producto.codigo", read_only=True)

    class Meta:
        model = CotizacionDetalle
        fields = [
            "id",
            "producto",
            "producto_codigo",
            "producto_nombre",
            "codigo",
            "descripcion",
            "stock",
            "ancho",
            "alto",
            "mts2",
            "cantidad",
            "unidad",
            "flete",
            "moneda",
            "plazo",
            "precio_ref",
            "total_ref",
            "p_compra",
            "rentabilidad",
            "precio_venta",
            "neto_unitario",
            "exento_unitario",
            "bruto_unitario",
            "subtotal",
            "vendido",
        ]


# === COTIZACIÓN PRINCIPAL ===
class CotizacionSerializer(serializers.ModelSerializer):
    cliente_nombre = serializers.CharField(source="cliente.nombre", read_only=True)
    cliente_rut = serializers.CharField(source="cliente.rut", read_only=True)
    vendedor_nombre = serializers.CharField(source="vendedor.username", read_only=True)
    detalles = CotizacionDetalleSerializer(many=True)

    class Meta:
        model = Cotizacion
        fields = [
            "id",
            "fecha",
            "iva",
            "descuento",
            "porcentaje_max",
            "sucursal",
            "bodega",
            "cliente",
            "cliente_nombre",
            "cliente_rut",
            "condicion",
            "unidad_negocio",
            "centro_costo",
            "vendedor",
            "vendedor_nombre",
            "rechazo",
            "entrega",
            "validez",
            "nota_venta",
            "fecha_inicio",
            "fecha_entrega",
            "oc_cliente",
            "neto",
            "descuento_total",
            "flete_total",
            "impuesto",
            "total",
            "exento",
            "rentabilidad_total",
            "estado",
            "created_at",
            "updated_at",
            "detalles",
        ]

    # === Sobrescribimos create/update para manejar detalles anidados ===
    def create(self, validated_data):
        detalles_data = validated_data.pop("detalles", [])
        cotizacion = Cotizacion.objects.create(**validated_data)

        for detalle_data in detalles_data:
            CotizacionDetalle.objects.create(cotizacion=cotizacion, **detalle_data)

        return cotizacion

    def update(self, instance, validated_data):
        detalles_data = validated_data.pop("detalles", [])
        # Actualizar campos de la cotización
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Actualizar los detalles (simple: borra y recrea)
        instance.detalles.all().delete()
        for detalle_data in detalles_data:
            CotizacionDetalle.objects.create(cotizacion=instance, **detalle_data)

        return instance
