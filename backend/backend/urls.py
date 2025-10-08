from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf.urls.static import static
from backend import settings
from django.views.generic import TemplateView

schema_view = get_schema_view(
    openapi.Info(
        title="🧭 MAQTEC ERP API",
        default_version='v1',
        description="""
        **API del sistema MAQTEC ERP**

        Plataforma modular para gestión de:
        - 👥 Usuarios y roles
        - 🧾 Facturación y cotizaciones
        - 🏗️ Inventario y órdenes de trabajo
        - ⚙️ Mantenimiento y reportes automáticos

        ---
        🔒 Autenticación: JWT (Bearer Token)
        📬 Contacto: soporte@maqtec.cl
        """,
        terms_of_service="https://maqtec.cl/terminos",
        contact=openapi.Contact(email="soporte@maqtec.cl"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/authentication/', include('apps.authentication.urls')),
    path('swagger-ui/', TemplateView.as_view(template_name='swagger-ui.html'), name='swagger-custom'),
    path('grappelli/', include('grappelli.urls')),



    # Swagger / Redoc
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),
         name='schema-redoc'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
