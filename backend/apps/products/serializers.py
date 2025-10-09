from rest_framework import serializers
from .models import Producto, ProductoContabilidad, ProductoArriendo, ProductoEcommerce, ProductoFabricacion


# === SERIALIZERS SECUNDARIOS ===
class ProductoContabilidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoContabilidad
        fields = ["cuenta_compra", "cuenta_venta", "unidad_medida", "peso", "comision", "tipo_moneda"]


class ProductoArriendoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoArriendo
        fields = ["codigo_hora", "precio_hora", "precio_dia", "precio_mes"]


class ProductoEcommerceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoEcommerce
        fields = ["condicion", "garantia", "proveedor_garantia"]


class ProductoFabricacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductoFabricacion
        fields = ["costo_unitario", "margen", "precio_venta", "vigencia_dias"]


# === SERIALIZER PRINCIPAL CON NESTED WRITABLE ===
class ProductoSerializer(serializers.ModelSerializer):
    contabilidad = ProductoContabilidadSerializer(required=False)
    arriendo = ProductoArriendoSerializer(required=False)
    ecommerce = ProductoEcommerceSerializer(required=False)
    fabricacion = ProductoFabricacionSerializer(required=False)

    class Meta:
        model = Producto
        fields = [
            "id",
            "codigo",
            "descripcion",
            "categoria",
            "p_compra",
            "valor_neto",
            "valor_con_iva",
            "precio_minimo",
            "articulo_activo",
            "control_stock",
            "contabilidad",
            "arriendo",
            "ecommerce",
            "fabricacion",
        ]

    def create(self, validated_data):
        contabilidad_data = validated_data.pop("contabilidad", None)
        arriendo_data = validated_data.pop("arriendo", None)
        ecommerce_data = validated_data.pop("ecommerce", None)
        fabricacion_data = validated_data.pop("fabricacion", None)

        producto = Producto.objects.create(**validated_data)

        if contabilidad_data:
            ProductoContabilidad.objects.create(producto=producto, **contabilidad_data)
        if arriendo_data:
            ProductoArriendo.objects.create(producto=producto, **arriendo_data)
        if ecommerce_data:
            ProductoEcommerce.objects.create(producto=producto, **ecommerce_data)
        if fabricacion_data:
            ProductoFabricacion.objects.create(producto=producto, **fabricacion_data)

        return producto

    def update(self, instance, validated_data):
        contabilidad_data = validated_data.pop("contabilidad", None)
        arriendo_data = validated_data.pop("arriendo", None)
        ecommerce_data = validated_data.pop("ecommerce", None)
        fabricacion_data = validated_data.pop("fabricacion", None)

        # Actualizar campos principales del producto
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Actualizar o crear los modelos relacionados
        if contabilidad_data:
            ProductoContabilidad.objects.update_or_create(producto=instance, defaults=contabilidad_data)
        if arriendo_data:
            ProductoArriendo.objects.update_or_create(producto=instance, defaults=arriendo_data)
        if ecommerce_data:
            ProductoEcommerce.objects.update_or_create(producto=instance, defaults=ecommerce_data)
        if fabricacion_data:
            ProductoFabricacion.objects.update_or_create(producto=instance, defaults=fabricacion_data)

        return instance
