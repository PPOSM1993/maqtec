from django.db import models

class Producto(models.Model):
    codigo = models.CharField(max_length=50, unique=True)
    descripcion = models.CharField(max_length=255)
    categoria = models.CharField(max_length=100)
    p_compra = models.DecimalField(max_digits=12, decimal_places=2)
    valor_neto = models.DecimalField(max_digits=12, decimal_places=2)
    valor_con_iva = models.DecimalField(max_digits=12, decimal_places=2)
    precio_minimo = models.DecimalField(max_digits=12, decimal_places=2)
    articulo_activo = models.BooleanField(default=True)
    control_stock = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.codigo} - {self.descripcion}"


class ProductoContabilidad(models.Model):
    producto = models.OneToOneField(Producto, on_delete=models.CASCADE, related_name='contabilidad')
    cuenta_compra = models.CharField(max_length=100)
    cuenta_venta = models.CharField(max_length=100)
    unidad_medida = models.CharField(max_length=50)
    peso = models.DecimalField(max_digits=10, decimal_places=2)
    comision = models.DecimalField(max_digits=10, decimal_places=2)
    tipo_moneda = models.CharField(max_length=20, default='CLP')

    def __str__(self):
        return f"Contabilidad - {self.producto.codigo}"


class ProductoArriendo(models.Model):
    producto = models.OneToOneField(Producto, on_delete=models.CASCADE, related_name='arriendo')
    codigo_hora = models.CharField(max_length=50)
    precio_hora = models.DecimalField(max_digits=10, decimal_places=2)
    precio_dia = models.DecimalField(max_digits=10, decimal_places=2)
    precio_mes = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Arriendo - {self.producto.codigo}"


class ProductoEcommerce(models.Model):
    producto = models.OneToOneField(Producto, on_delete=models.CASCADE, related_name='ecommerce')
    condicion = models.CharField(max_length=100)
    garantia = models.CharField(max_length=100)
    proveedor_garantia = models.CharField(max_length=100)

    def __str__(self):
        return f"Ecommerce - {self.producto.codigo}"


class ProductoFabricacion(models.Model):
    producto = models.OneToOneField(Producto, on_delete=models.CASCADE, related_name='fabricacion')
    costo_unitario = models.DecimalField(max_digits=12, decimal_places=2)
    margen = models.DecimalField(max_digits=5, decimal_places=2)
    precio_venta = models.DecimalField(max_digits=12, decimal_places=2)
    vigencia_dias = models.PositiveIntegerField()

    def __str__(self):
        return f"Fabricación - {self.producto.codigo}"
