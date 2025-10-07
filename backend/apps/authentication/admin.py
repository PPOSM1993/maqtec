from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, Role, UserRole

# Inline para UserRole (mostrar roles directamente en el usuario)
class UserRoleInline(admin.TabularInline):
    model = UserRole
    extra = 1

# Personalizamos el admin del User
class UserAdmin(BaseUserAdmin):
    list_display = ("email", "username", "is_staff", "is_active")
    list_filter = ("is_staff", "is_active")
    search_fields = ("email", "username")
    ordering = ("email",)
    inlines = [UserRoleInline]
    fieldsets = (
        (None, {"fields": ("email", "username", "password")}),
        ("Permisos", {"fields": ("is_active", "is_staff", "is_superuser")}),
        ("Grupos y permisos", {"fields": ("groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "username", "password1", "password2", "is_active", "is_staff", "is_superuser"),
        }),
    )

# Admin de Role
class RoleAdmin(admin.ModelAdmin):
    list_display = ("nombre", "descripcion")
    search_fields = ("nombre",)

# Admin de UserRole (opcional, si quieres manejar relaciones directamente)
class UserRoleAdmin(admin.ModelAdmin):
    list_display = ("user", "role")
    search_fields = ("user__email", "role__nombre")

# Registramos en admin
admin.site.register(User, UserAdmin)
admin.site.register(Role, RoleAdmin)
admin.site.register(UserRole, UserRoleAdmin)
