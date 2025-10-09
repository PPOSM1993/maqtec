from django.db import models
from django.conf import settings
from django.utils import timezone
from apps.clients.models import Cliente
from apps.products.models import Producto

class BaseModel(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="%(class)s_created",
    )
    updated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="%(class)s_updated",
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True

class Cotizacion(BaseModel):
    ESTADO_CHOICES = [
        ("pendiente", "Pendiente"),
        ("aceptada", "Aceptada"),
        ("rechazada", "Rechazada"),
        ("nula", "Nula"),
        ("parcial", "Parcial Confección"),
    ]

    CONDICION_CHOICES = [
        ("cheque", "Cheque"),
        ("cheque_pie_30_60", "Cheque Pie-30-60"),
        ("credito", "Crédito"),
        ("credito_pie_30_60", "Crédito Pie-30-60"),
        ("efectivo", "Efectivo"),
        ("mixto", "Mixto"),
        ("sodexo", "Pago Sodexo"),
        ("tarjeta_credito", "Tarjeta Crédito"),
        ("debito", "Débito"),
        ("transferencia", "Transferencia"),
    ]

    UNIDAD_NEGOCIO_CHOICES = [
        ("administracion", "Administración"),
        ("repuestos", "Repuestos"),
        ("servicio_tecnico", "Servicio Técnico"),
        ("ventas", "Ventas"),
    ]

    CENTRO_COSTO_CHOICES = [
        ("administracion", "Administración"),
        ("servicio_tecnico", "Servicio Técnico"),
        ("ventas", "Ventas"),
    ]

    fecha = models.DateField(default=timezone.now)
    iva = models.DecimalField(max_digits=10, decimal_places=2, default=19)
    descuento = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    porcentaje_max = models.DecimalField(max_digits=5, decimal_places=2, default=0)

    sucursal = models.CharField(max_length=100, blank=True, null=True)
    bodega = models.CharField(max_length=100, blank=True, null=True)  # futuro modal (Principal, Consumo Interno, Taller)

    cliente = models.ForeignKey(Cliente, on_delete=models.PROTECT, related_name="cotizaciones")
    condicion = models.CharField(max_length=50, choices=CONDICION_CHOICES, default="efectivo")
    unidad_negocio = models.CharField(max_length=50, choices=UNIDAD_NEGOCIO_CHOICES, default="ventas")
    centro_costo = models.CharField(max_length=50, choices=CENTRO_COSTO_CHOICES, default="ventas")
    vendedor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name="cotizaciones_emitidas")
    rechazo = models.TextField(blank=True, null=True)
    entrega = models.PositiveIntegerField(default=7)
    validez = models.PositiveIntegerField(default=30)
    nota_venta = models.CharField(max_length=100, blank=True, null=True)
    fecha_inicio = models.DateField(default=timezone.now)
    fecha_entrega = models.DateField(blank=True, null=True)
    oc_cliente = models.CharField(max_length=100, blank=True, null=True)

    # TOTALES
    neto = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    descuento_total = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    flete_total = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    impuesto = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    exento = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    rentabilidad_total = models.DecimalField(max_digits=14, decimal_places=2, default=0)
    estado = models.CharField(max_length=30, choices=ESTADO_CHOICES, default="pendiente")

    class Meta:
        ordering = ["-fecha"]

    def __str__(self):
        return f"Cotización #{self.id} - {self.cliente.nombre}"


class CotizacionDetalle(BaseModel):
    cotizacion = models.ForeignKey(Cotizacion, on_delete=models.CASCADE, related_name="detalles")
    producto = models.ForeignKey(Producto, on_delete=models.PROTECT, related_name="detalles_cotizacion")

    codigo = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=255)
    stock = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    ancho = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    alto = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    mts2 = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    cantidad = models.DecimalField(max_digits=10, decimal_places=2)
    unidad = models.CharField(max_length=20, blank=True, null=True)
    flete = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    moneda = models.CharField(max_length=10, default="CLP")
    plazo = models.PositiveIntegerField(default=0)
    precio_ref = models.DecimalField(max_digits=12, decimal_places=2)
    total_ref = models.DecimalField(max_digits=12, decimal_places=2)
    p_compra = models.DecimalField(max_digits=12, decimal_places=2)
    rentabilidad = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    precio_venta = models.DecimalField(max_digits=12, decimal_places=2)
    neto_unitario = models.DecimalField(max_digits=12, decimal_places=2)
    exento_unitario = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    bruto_unitario = models.DecimalField(max_digits=12, decimal_places=2)
    subtotal = models.DecimalField(max_digits=14, decimal_places=2)
    vendido = models.BooleanField(default=False)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return f"{self.descripcion} x {self.cantidad}"
