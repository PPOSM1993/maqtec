# 🏗️ MAQTEC ERP — Stack Actualizado (2025)

MAQTEC ERP es un sistema integral de gestión de clientes, productos, cotizaciones y más, con **frontend moderno (Next.js + TailwindCSS)** y **backend robusto (Django REST Framework + PostgreSQL)**.  
El proyecto está diseñado para ser escalable, modular y con enfoque profesional en DevOps y CI/CD.

---

## 🧩 Backend (Django REST Framework)

| Componente | Descripción |
|------------|-------------|
| Django REST Framework (DRF) | Base del backend y API REST. |
| PostgreSQL | Base de datos principal. |
| Redis | Cache, cola de tareas y notificaciones. |
| Celery + Celery Beat | Tareas asíncronas y programadas (reportes, sincronización, backups). |
| JWT (SimpleJWT) | Autenticación segura por tokens. |
| Django Guardian | Permisos a nivel de objeto. |
| DRF Spectacular | Documentación OpenAPI/Swagger automática. |
| Django Auditlog | Registro automático de auditoría (quién creó, editó o eliminó). |
| Django Storages + S3 | Almacenamiento de archivos (facturas, imágenes, adjuntos). |

---

## 💻 Frontend (Next.js + TailwindCSS)

| Librería / Framework | Uso |
|---------------------|-----|
| Next.js (App Router) | Framework de frontend SSR/SSG. |
| TypeScript | Tipado estático y escalabilidad. |
| TailwindCSS | Estilos rápidos y consistentes. |
| Zustand | Estado global simple y eficiente. |
| shadcn/ui | Componentes reutilizables (cards, modals, tables). |
| TanStack Query (React Query) | Fetch y caché de datos del backend. |
| Framer Motion | Animaciones fluidas para UI. |

---

## 🧱 Infraestructura y DevOps

| Herramienta | Propósito |
|------------|------------|
| Docker + Docker Compose | Contenedorización del backend, frontend, DB y Redis. |
| django-environ | Manejo de variables de entorno (.env). |
| Git + GitHub Actions | Control de versiones y CI/CD. |
| Vercel | Despliegue del frontend (Next.js). |
| Render / Railway / Fly.io / AWS ECS | Opciones de despliegue del backend y base de datos. |
| Sentry | Monitoreo y alertas de errores en producción. |

---

## ⚙️ Instalación y configuración

### 1. Clonar el repositorio

    git clone https://github.com/pedro-hernández/maqtec.git

### 2. Entrar al directorio del proyecto

    cd maqtec