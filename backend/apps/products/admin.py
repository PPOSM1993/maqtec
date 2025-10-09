from django.contrib import admin
from .models import Producto, ProductoContabilidad, ProductoArriendo, ProductoEcommerce, ProductoFabricacion

# === INLINES PARA MODELOS RELACIONADOS ===
class ProductoContabilidadInline(admin.StackedInline):
    model = ProductoContabilidad
    extra = 0
    can_delete = False
    verbose_name_plural = "Contabilidad"

class ProductoArriendoInline(admin.StackedInline):
    model = ProductoArriendo
    extra = 0
    can_delete = False
    verbose_name_plural = "Arriendo"

class ProductoEcommerceInline(admin.StackedInline):
    model = ProductoEcommerce
    extra = 0
    can_delete = False
    verbose_name_plural = "Ecommerce"

class ProductoFabricacionInline(admin.StackedInline):
    model = ProductoFabricacion
    extra = 0
    can_delete = False
    verbose_name_plural = "Fabricación"


# === ADMIN PRINCIPAL DEL PRODUCTO ===
@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = (
        "codigo",
        "descripcion",
        "categoria",
        "articulo_activo",
        "control_stock",
        "p_compra",
        "valor_neto",
        "valor_con_iva",
        "precio_minimo",
    )
    list_filter = ("categoria", "articulo_activo", "control_stock")
    search_fields = ("codigo", "descripcion")
    ordering = ("codigo",)
    inlines = [
        ProductoContabilidadInline,
        ProductoArriendoInline,
        ProductoEcommerceInline,
        ProductoFabricacionInline,
    ]


# === ADMIN ESPECÍFICO (opcional) PARA MODELOS SECUNDARIOS ===
@admin.register(ProductoContabilidad)
class ProductoContabilidadAdmin(admin.ModelAdmin):
    list_display = ("producto", "cuenta_compra", "cuenta_venta", "unidad_medida", "tipo_moneda")
    list_filter = ("unidad_medida", "tipo_moneda")
    search_fields = ("producto__codigo", "producto__descripcion")


@admin.register(ProductoArriendo)
class ProductoArriendoAdmin(admin.ModelAdmin):
    list_display = ("producto", "codigo_hora", "precio_hora", "precio_dia", "precio_mes")
    search_fields = ("producto__codigo", "producto__descripcion")


@admin.register(ProductoEcommerce)
class ProductoEcommerceAdmin(admin.ModelAdmin):
    list_display = ("producto", "condicion", "garantia", "proveedor_garantia")
    list_filter = ("condicion",)
    search_fields = ("producto__codigo", "producto__descripcion")


@admin.register(ProductoFabricacion)
class ProductoFabricacionAdmin(admin.ModelAdmin):
    list_display = ("producto", "costo_unitario", "margen", "precio_venta", "vigencia_dias")
    search_fields = ("producto__codigo", "producto__descripcion")
