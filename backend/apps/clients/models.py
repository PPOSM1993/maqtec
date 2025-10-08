from django.db import models
from django.conf import settings
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator

# Validators
rut_validator = RegexValidator(
    regex=r'^(\d{7,8})-([\dkK])$',
    message='El RUT debe tener el formato 12345678-5.'
)

telefono_validator = RegexValidator(
    regex=r'^(\+?56)?(\s?)(0?9\d{8}|2\d{7})$',
    message='Número de teléfono inválido. Debe ser formato celular o fijo chileno.'
)

# -----------------------------
# Regiones / Ciudades / Comunas
# -----------------------------
class Region(models.Model):
    nombre = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

class City(models.Model):
    nombre = models.CharField(max_length=100)
    region = models.ForeignKey(Region, on_delete=models.PROTECT, related_name='cities')

    def __str__(self):
        return f"{self.nombre} ({self.region.nombre})"

class Commune(models.Model):
    nombre = models.CharField(max_length=100)
    city = models.ForeignKey(City, on_delete=models.PROTECT, related_name='communes')

    def __str__(self):
        return f"{self.nombre} ({self.city.nombre})"

# -----------------------------
# Cliente
# -----------------------------
class Cliente(models.Model):
    rut = models.CharField(max_length=12, validators=[rut_validator], unique=True)
    nombre = models.CharField(max_length=200)
    fantasia = models.CharField(max_length=200, blank=True, null=True)
    giro = models.CharField(max_length=200, blank=True, null=True)
    direccion = models.CharField(max_length=300, blank=True, null=True)
    region = models.ForeignKey(Region, on_delete=models.PROTECT, related_name='clientes')
    comuna = models.ForeignKey(Commune, on_delete=models.PROTECT, related_name='clientes')

    vendedor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='clientes')
    descuento = models.DecimalField(max_digits=5, decimal_places=2, default=0.0,
                                    validators=[MinValueValidator(0), MaxValueValidator(100)])
    activo = models.BooleanField(default=True)
    telefono = models.CharField(max_length=12, validators=[telefono_validator], blank=True, null=True)

    def __str__(self):
        return f"{self.nombre} ({self.rut})"

    class Meta:
        ordering = ['nombre']

# -----------------------------
# ClienteFinanza
# -----------------------------
class ClienteFinanza(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='finanzas')
    credito = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    deuda = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    solicitado = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    dia_pago = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(31)])
    actualizado_por = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True,
                                        related_name='finanzas_actualizadas')

    def __str__(self):
        return f"Finanzas de {self.cliente.nombre}"

# -----------------------------
# ClienteCuenta
# -----------------------------
class ClienteCuenta(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='cuentas')
    banco = models.CharField(max_length=200)
    cuenta_corriente = models.CharField(max_length=50)
    titular = models.CharField(max_length=200)
    monto_cheque = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    mandato = models.CharField(max_length=200, blank=True, null=True)
    actualizado_por = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True,
                                        related_name='cuentas_actualizadas')

    def __str__(self):
        return f"Cuenta de {self.cliente.nombre} - {self.banco}"
