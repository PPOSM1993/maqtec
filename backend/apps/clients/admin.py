from django.contrib import admin
from .models import Region, City, Commune, Cliente, ClienteFinanza, ClienteCuenta

# -----------------------------
# Región / Ciudad / Comuna
# -----------------------------
@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre')
    search_fields = ('nombre',)

@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'region')
    list_filter = ('region',)
    search_fields = ('nombre',)

@admin.register(Commune)
class CommuneAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'city')
    list_filter = ('city__region', 'city')
    search_fields = ('nombre',)

# -----------------------------
# Inlines para Cliente
# -----------------------------
class ClienteFinanzaInline(admin.TabularInline):
    model = ClienteFinanza
    extra = 1
    autocomplete_fields = ('actualizado_por',)
    fields = ('credito', 'deuda', 'solicitado', 'dia_pago', 'actualizado_por')
    verbose_name = "Finanza"
    verbose_name_plural = "Finanzas del cliente"

class ClienteCuentaInline(admin.TabularInline):
    model = ClienteCuenta
    extra = 1
    autocomplete_fields = ('actualizado_por',)
    fields = ('banco', 'cuenta_corriente', 'titular', 'monto_cheque', 'mandato', 'actualizado_por')
    verbose_name = "Cuenta"
    verbose_name_plural = "Cuentas del cliente"

# -----------------------------
# Cliente con fieldsets e inlines (Grappelli Tabs)
# -----------------------------
@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'rut', 'fantasia', 'comuna', 'get_city', 'get_region', 'vendedor', 'activo')
    list_filter = ('activo', 'comuna__city', 'comuna__city__region')
    search_fields = ('nombre', 'rut', 'fantasia', 'giro')
    autocomplete_fields = ('comuna', 'vendedor')
    inlines = [ClienteFinanzaInline, ClienteCuentaInline]

    fieldsets = (
        ('Información General', {
            'fields': ('nombre', 'rut', 'fantasia', 'giro', 'activo', 'descuento', 'telefono'),
            'classes': ('grp-collapse grp-open',),
        }),
        ('Ubicación y Responsable', {
            'fields': ('comuna', 'vendedor'),
            'classes': ('grp-collapse grp-open',),
        }),
        ('Finanzas', {
            'fields': (),
            'classes': ('grp-tab',),
        }),
        ('Cuentas', {
            'fields': (),
            'classes': ('grp-tab',),
        }),
    )

    # Métodos para mostrar city y region
    def get_city(self, obj):
        return obj.comuna.city.nombre if obj.comuna else None
    get_city.admin_order_field = 'comuna__city'  # permite ordenar por city
    get_city.short_description = 'Ciudad'

    def get_region(self, obj):
        return obj.comuna.city.region.nombre if obj.comuna else None
    get_region.admin_order_field = 'comuna__city__region'  # permite ordenar por region
    get_region.short_description = 'Región'
# -----------------------------
# ClienteFinanza y ClienteCuenta independientes
# -----------------------------
@admin.register(ClienteFinanza)
class ClienteFinanzaAdmin(admin.ModelAdmin):
    list_display = ('id', 'cliente', 'credito', 'deuda', 'solicitado', 'dia_pago', 'actualizado_por')
    list_filter = ('cliente__comuna__city__region',)
    search_fields = ('cliente__nombre',)
    autocomplete_fields = ('cliente', 'actualizado_por')

@admin.register(ClienteCuenta)
class ClienteCuentaAdmin(admin.ModelAdmin):
    list_display = ('id', 'cliente', 'banco', 'cuenta_corriente', 'titular', 'monto_cheque', 'actualizado_por')
    list_filter = ('banco', 'cliente__comuna__city__region')
    search_fields = ('cliente__nombre', 'banco', 'cuenta_corriente', 'titular')
    autocomplete_fields = ('cliente', 'actualizado_por')
