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

## ⚙️ Instalación y configuración del Backend

### 1. Clonar el repositorio
`
    git clone <URL_DEL_REPO>


### 2.Entrar al directorio del proyecto

    cd maqtec


### 3.Entramos a la crpeta backend

    cd backend

### 4. Creamos el entorno virtual

    python -m venv env

### 5. Activamos el entorno virtual

    source env/bin/activate  #Linux/Mac
    env\Scripts\activate.bat  #Windows

### 6. Instalamos las dependencias

    pip install -r requirements.txt

### 7. Creamos el archivo .env

    touch .env  #Para desarrollo local
    touch .env.local #Para despliegue en producción
    touch .env.example #Para configurar variables de entorno

Los archivos .env y .env.local, al momento de configurarlos, deben quedar ocultos con .gitignore, debido a que su informacion sensible puede contener información de conexión a la base de datos y API REST.

### 8. Configuramos el archivo .env

Ver archivo .env.example para ver las variables de entorno disponibles, ademas se debe crear la base de datos y configurar las credenciales de conexión a la misma, con PostgreSQL, este se encuentra en .env.example.


### 9.Migraciones y creación de superusuario

    python manage.py makemigrations
    python manage.py migrate
    python manage.py createsuperuser


### 10. Ejecutar servidor

    python manage.py runserver

El servidor se ejecutará en http://127.0.0.1:8000/, que es el puerto predeterminado de Django.

---

## ⚙️ Instalación y configuración del Frontend

### 1.Entramos al directorio del proyecto

Primero salimos del directorio del backend, para luego entrar al directorio del frontend

        cd ..
        cd frontend

### 2.Instalamos dependencias

Se usa npm para instalar las dependencias, pero también se puede usar yarn

        npm install
        yarn install

### 3. Ejecutamos el frontend

    npm run dev
    yarn dev

El frontend se ejecutará en http://localhost:3000/, que es el puerto predeterminado de Next.js.

## 🗂️ Estructura del proyecto

maqtec_project/
├── backend/            # Backend Django
│   ├── apps/           # Módulos: authentication, clientes, productos, cotizaciones
│   └── manage.py
├── frontend-web/       # Frontend Web Next.js
├── README.md
└── docker-compose.yml  # Contenedores backend, frontend, DB y Redis

# 🚀 Próximos pasos

- Completar endpoints REST y documentación API (Swagger / Redoc)
- Integración completa de frontend y backend
- Sistema de permisos y roles avanzados
- Mejoras en seguridad y pruebas automatizadas
- Implementar CI/CD completo


# Recursos útiles

- Documentación Django
- Django REST Framework
- Next.js
- TailwindCSS