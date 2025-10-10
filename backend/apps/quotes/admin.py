from django.contrib import admin
from .models import Cotizacion, CotizacionDetalle


class CotizacionDetalleInline(admin.TabularInline):
    model = CotizacionDetalle
    extra = 1
    autocomplete_fields = ["producto"]
    fields = [
        "producto", "codigo", "descripcion",
        "cantidad", "unidad", "precio_venta", "neto_unitario",
        "bruto_unitario", "subtotal", "flete", "moneda", "vendido"
    ]
    readonly_fields = ["subtotal", "neto_unitario", "bruto_unitario"]
    show_change_link = True


@admin.register(Cotizacion)
class CotizacionAdmin(admin.ModelAdmin):
    list_display = [
        "id", "fecha", "cliente", "vendedor", "condicion",
        "estado", "moneda", "total", "created_at"
    ]
    list_filter = [
        "estado", "condicion", "unidad_negocio", "centro_costo",
        "moneda", ("fecha", admin.DateFieldListFilter)
    ]
    search_fields = [
        "id", "cliente__nombre", "cliente__rut",
        "nota_venta", "oc_cliente", "vendedor__username"
    ]
    date_hierarchy = "fecha"
    ordering = ["-fecha"]
    autocomplete_fields = ["cliente", "vendedor"]
    inlines = [CotizacionDetalleInline]

    readonly_fields = [
        "created_at", "updated_at", 
        "neto", "descuento_total", "flete_total", "impuesto",
        "exento", "total", "rentabilidad_total"
    ]

    fieldsets = (
        ("🧾 Información General", {
            "fields": (
                "fecha", "cliente", "vendedor",
                "estado", "moneda", "nota_venta", "oc_cliente"
            )
        }),
        ("🏢 Condiciones Comerciales", {
            "fields": (
                "condicion", "unidad_negocio", "centro_costo",
                "sucursal", "bodega", "entrega", "validez"
            ),
            "classes": ("collapse",)
        }),
        ("👥 Contacto y Referencias", {
            "fields": (
                "rechazo",
            ),
            "classes": ("collapse",)
        }),
        ("💰 Totales", {
            "fields": (
                "neto", "descuento_total", "flete_total", "impuesto",
                "exento", "total", "rentabilidad_total"
            ),
        }),
        ("🕒 Auditoría", {
            "fields": ("created_at", "updated_at", "created_by", "updated_by", "is_active"),
            "classes": ("collapse",)
        }),
    )


@admin.register(CotizacionDetalle)
class CotizacionDetalleAdmin(admin.ModelAdmin):
    list_display = [
        "id", "cotizacion", "producto", "cantidad", "precio_venta",
        "subtotal", "moneda", "vendido"
    ]
    list_filter = ["vendido", "moneda", "cotizacion__estado"]
    search_fields = [
        "descripcion", "codigo", "producto__codigo",
        "producto__descripcion", "cotizacion__id"
    ]
    autocomplete_fields = ["cotizacion", "producto"]
    ordering = ["cotizacion__id", "id"]
    readonly_fields = ["subtotal", "neto_unitario", "bruto_unitario"]
