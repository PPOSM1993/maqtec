from django.contrib import admin
from .models import Cotizacion, CotizacionDetalle


class CotizacionDetalleInline(admin.TabularInline):
    model = CotizacionDetalle
    extra = 1
    autocomplete_fields = ["producto"]
    fields = [
        "producto", "codigo", "descripcion", "cantidad", "unidad",
        "precio_venta", "neto_unitario", "subtotal", "vendido"
    ]
    readonly_fields = ["subtotal"]


@admin.register(Cotizacion)
class CotizacionAdmin(admin.ModelAdmin):
    list_display = [
        "id", "fecha", "cliente", "vendedor",
        "condicion", "estado", "total", "created_at"
    ]
    list_filter = ["estado", "condicion", "unidad_negocio", "centro_costo", "fecha"]
    search_fields = ["id", "cliente__nombre", "cliente__rut", "nota_venta", "oc_cliente"]
    date_hierarchy = "fecha"

    autocomplete_fields = ["cliente", "vendedor"]
    inlines = [CotizacionDetalleInline]

    fieldsets = (
        ("Información General", {
            "fields": (
                "fecha", "cliente", "vendedor", "estado", "nota_venta", "oc_cliente"
            )
        }),
        ("Condiciones y Logística", {
            "fields": (
                "condicion", "unidad_negocio", "centro_costo",
                "sucursal", "bodega", "entrega", "validez"
            ),
            "classes": ("collapse",)
        }),
        ("Totales", {
            "fields": (
                "neto", "descuento_total", "flete_total",
                "impuesto", "exento", "total", "rentabilidad_total"
            ),
        }),
        ("Auditoría", {
            "fields": ("created_at", "updated_at", "created_by", "updated_by", "is_active"),
            "classes": ("collapse",)
        }),
    )

    readonly_fields = ["created_at", "updated_at"]
    ordering = ["-fecha"]


@admin.register(CotizacionDetalle)
class CotizacionDetalleAdmin(admin.ModelAdmin):
    list_display = [
        "id", "cotizacion", "producto", "cantidad", "precio_venta", "subtotal", "vendido"
    ]
    list_filter = ["vendido", "moneda"]
    search_fields = ["descripcion", "producto__codigo", "producto__descripcion"]
    autocomplete_fields = ["cotizacion", "producto"]
    ordering = ["cotizacion__id", "id"]
