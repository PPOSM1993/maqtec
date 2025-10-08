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
    actualizado_por = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=False, allow_null=True
    )

    class Meta:
        model = ClienteFinanza
        fields = ['id', 'credito', 'deuda', 'solicitado', 'dia_pago', 'actualizado_por']

# -----------------------------
# ClienteCuenta
# -----------------------------
class ClienteCuentaSerializer(serializers.ModelSerializer):
    actualizado_por = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=False, allow_null=True
    )

    class Meta:
        model = ClienteCuenta
        fields = ['id', 'banco', 'cuenta_corriente', 'titular', 'monto_cheque', 'mandato', 'actualizado_por']

# -----------------------------
# Cliente con nested finanzas y cuentas
# -----------------------------
class ClienteSerializer(serializers.ModelSerializer):
    finanzas = ClienteFinanzaSerializer(many=True, required=False)
    cuentas = ClienteCuentaSerializer(many=True, required=False)

    class Meta:
        model = Cliente
        fields = [
            'id', 'rut', 'nombre', 'fantasia', 'giro', 'direccion',
            'region', 'comuna', 'vendedor', 'descuento', 'activo',
            'telefono', 'finanzas', 'cuentas'
        ]

    def create(self, validated_data):
        finanzas_data = validated_data.pop('finanzas', [])
        cuentas_data = validated_data.pop('cuentas', [])

        cliente = Cliente.objects.create(**validated_data)

        for f_data in finanzas_data:
            ClienteFinanza.objects.create(cliente=cliente, **f_data)
        for c_data in cuentas_data:
            ClienteCuenta.objects.create(cliente=cliente, **c_data)

        return cliente

    def update(self, instance, validated_data):
        finanzas_data = validated_data.pop('finanzas', [])
        cuentas_data = validated_data.pop('cuentas', [])

        # Actualizar campos del cliente
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Actualizar finanzas
        for f_data in finanzas_data:
            finanza_id = f_data.get('id', None)
            if finanza_id:
                finanza = ClienteFinanza.objects.get(id=finanza_id, cliente=instance)
                for attr, value in f_data.items():
                    setattr(finanza, attr, value)
                finanza.save()
            else:
                ClienteFinanza.objects.create(cliente=instance, **f_data)

        # Actualizar cuentas
        for c_data in cuentas_data:
            cuenta_id = c_data.get('id', None)
            if cuenta_id:
                cuenta = ClienteCuenta.objects.get(id=cuenta_id, cliente=instance)
                for attr, value in c_data.items():
                    setattr(cuenta, attr, value)
                cuenta.save()
            else:
                ClienteCuenta.objects.create(cliente=instance, **c_data)

        return instance
