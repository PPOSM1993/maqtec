from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Region, City, Commune, Cliente, ClienteFinanza, ClienteCuenta

User = get_user_model()

# -----------------------------
# Region / City / Commune
# -----------------------------
class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Region
        fields = ['id', 'nombre']

class CitySerializer(serializers.ModelSerializer):
    region = RegionSerializer(read_only=True)

    class Meta:
        model = City
        fields = ['id', 'nombre', 'region']

class CommuneSerializer(serializers.ModelSerializer):
    city = CitySerializer(read_only=True)

    class Meta:
        model = Commune
        fields = ['id', 'nombre', 'city']

# -----------------------------
# ClienteFinanza
# -----------------------------
class ClienteFinanzaSerializer(serializers.ModelSerializer):
    actualizado_por = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = ClienteFinanza
        fields = ['id', 'credito', 'deuda', 'solicitado', 'dia_pago', 'actualizado_por']

# -----------------------------
# ClienteCuenta
# -----------------------------
class ClienteCuentaSerializer(serializers.ModelSerializer):
    actualizado_por = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = ClienteCuenta
        fields = ['id', 'banco', 'cuenta_corriente', 'titular', 'monto_cheque', 'mandato', 'actualizado_por']

# -----------------------------
# Cliente
# -----------------------------
class ClienteSerializer(serializers.ModelSerializer):
    region = RegionSerializer(read_only=True)
    comuna = CommuneSerializer(read_only=True)
    vendedor = serializers.StringRelatedField(read_only=True)
    finanzas = ClienteFinanzaSerializer(many=True, read_only=True)
    cuentas = ClienteCuentaSerializer(many=True, read_only=True)

    class Meta:
        model = Cliente
        fields = [
            'id', 'rut', 'nombre', 'fantasia', 'giro', 'direccion',
            'region', 'comuna', 'vendedor', 'descuento', 'activo',
            'telefono', 'finanzas', 'cuentas'
        ]
