from rest_framework import serializers
from apps.quotes.models import Cotizacion, CotizacionDetalle


# === DETALLE DE COTIZACIÓN ===
class CotizacionDetalleSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source="producto.descripcion", read_only=True)
    producto_codigo = serializers.CharField(source="producto.codigo", read_only=True)
    subtotal = serializers.DecimalField(max_digits=14, decimal_places=2, read_only=True)
    rentabilidad = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    neto_unitario = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)
    bruto_unitario = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)

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

    neto = serializers.DecimalField(max_digits=14, decimal_places=2, read_only=True)
    descuento_total = serializers.DecimalField(max_digits=14, decimal_places=2, read_only=True)
    flete_total = serializers.DecimalField(max_digits=14, decimal_places=2, read_only=True)
    impuesto = serializers.DecimalField(max_digits=14, decimal_places=2, read_only=True)
    total = serializers.DecimalField(max_digits=14, decimal_places=2, read_only=True)
    exento = serializers.DecimalField(max_digits=14, decimal_places=2, read_only=True)
    rentabilidad_total = serializers.DecimalField(max_digits=14, decimal_places=2, read_only=True)

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

    def create(self, validated_data):
        detalles_data = validated_data.pop("detalles", [])
        cotizacion = Cotizacion.objects.create(**validated_data)

        for detalle_data in detalles_data:
            CotizacionDetalle.objects.create(cotizacion=cotizacion, **detalle_data)

        cotizacion.calcular_totales()
        cotizacion.save(update_fields=[
            "neto", "descuento_total", "flete_total", "impuesto",
            "total", "rentabilidad_total"
        ])
        return cotizacion

    def update(self, instance, validated_data):
        detalles_data = validated_data.pop("detalles", [])

        # Actualizar campos de la cotización
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Manejo de detalles: actualizar existentes o crear nuevos
        detalles_ids = [d.get("id") for d in detalles_data if d.get("id")]
        # Eliminar detalles no enviados
        instance.detalles.exclude(id__in=detalles_ids).delete()

        for detalle_data in detalles_data:
            detalle_id = detalle_data.get("id", None)
            if detalle_id:
                detalle_obj = CotizacionDetalle.objects.get(id=detalle_id, cotizacion=instance)
                for attr, value in detalle_data.items():
                    setattr(detalle_obj, attr, value)
                detalle_obj.save()
            else:
                CotizacionDetalle.objects.create(cotizacion=instance, **detalle_data)

        # Recalcular totales
        instance.calcular_totales()
        instance.save(update_fields=[
            "neto", "descuento_total", "flete_total", "impuesto",
            "total", "rentabilidad_total"
        ])
        return instance
