from django.utils import timezone 
from django.db import models
from django.conf import settings


# === BASE MODEL PARA HERENCIA ===
class BaseModel(models.Model):
    created_at = models.DateTimeField(default=timezone.now)  # sin paréntesis
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


# === MODELO PRINCIPAL ===
class Producto(BaseModel):
    CATEGORIAS = [
        ("herramienta", "Herramienta"),
        ("maquinaria", "Maquinaria"),
        ("insumo", "Insumo"),
        ('repuesto', 'Repuesto'),
        ("servicio", "Servicio"),
        ("otro", "Otro"),
    ]

    codigo = models.CharField(max_length=50, unique=True)
    descripcion = models.CharField(max_length=255)
    categoria = models.CharField(max_length=50, choices=CATEGORIAS)
    p_compra = models.DecimalField(max_digits=12, decimal_places=2)
    valor_neto = models.DecimalField(max_digits=12, decimal_places=2)
    valor_con_iva = models.DecimalField(max_digits=12, decimal_places=2)
    precio_minimo = models.DecimalField(max_digits=12, decimal_places=2)
    articulo_activo = models.BooleanField(default=True)
    control_stock = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.codigo} - {self.descripcion}"

    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
        ordering = ["codigo"]


# === PRODUCTO CONTABILIDAD ===
class ProductoContabilidad(BaseModel):
    UNIDADES = [
        ("unidad", "Unidad"),
        ("kg", "Kilogramo"),
        ("lt", "Litro"),
        ("m2", "Metro cuadrado"),
        ("m3", "Metro cúbico"),
    ]

    MONEDAS = [
        ("CLP", "Peso Chileno"),
        ("USD", "Dólar"),
        ("EUR", "Euro"),
    ]

    producto = models.OneToOneField(Producto, on_delete=models.CASCADE, related_name="contabilidad")
    cuenta_compra = models.CharField(max_length=100)
    cuenta_venta = models.CharField(max_length=100)
    unidad_medida = models.CharField(max_length=20, choices=UNIDADES)
    peso = models.DecimalField(max_digits=10, decimal_places=2)
    comision = models.DecimalField(max_digits=10, decimal_places=2)
    tipo_moneda = models.CharField(max_length=10, choices=MONEDAS, default="CLP")

    def __str__(self):
        return f"Contabilidad - {self.producto.codigo}"


# === PRODUCTO ARRIENDO ===
class ProductoArriendo(BaseModel):
    producto = models.OneToOneField(Producto, on_delete=models.CASCADE, related_name="arriendo")
    codigo_hora = models.CharField(max_length=50)
    precio_hora = models.DecimalField(max_digits=10, decimal_places=2)
    precio_dia = models.DecimalField(max_digits=10, decimal_places=2)
    precio_mes = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Arriendo - {self.producto.codigo}"


# === PRODUCTO ECOMMERCE ===
class ProductoEcommerce(BaseModel):
    CONDICIONES = [
        ("nuevo", "Nuevo"),
        ("usado", "Usado"),
        ("refabricado", "Refabricado"),
    ]

    producto = models.OneToOneField(Producto, on_delete=models.CASCADE, related_name="ecommerce")
    condicion = models.CharField(max_length=50, choices=CONDICIONES, default="nuevo")
    garantia = models.CharField(max_length=100)
    proveedor_garantia = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"Ecommerce - {self.producto.codigo}"


# === PRODUCTO FABRICACIÓN ===
class ProductoFabricacion(BaseModel):
    producto = models.OneToOneField(Producto, on_delete=models.CASCADE, related_name="fabricacion")
    costo_unitario = models.DecimalField(max_digits=12, decimal_places=2)
    margen = models.DecimalField(max_digits=5, decimal_places=2)
    precio_venta = models.DecimalField(max_digits=12, decimal_places=2)
    vigencia_dias = models.PositiveIntegerField()

    def __str__(self):
        return f"Fabricación - {self.producto.codigo}"
