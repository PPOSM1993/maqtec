# MAQTEC - Backend

Este es el **backend** del sistema MAQTEC, desarrollado con **Django REST Framework**, diseñado para la gestión de usuarios, roles, clientes, productos, cotizaciones y finanzas.

## 📦 Tecnologías

- **Python 3.10**
- **Django 5.2.7**
- **Django REST Framework**
- **PostgreSQL** para base de datos
- **Redis** para cache y tareas asíncronas (opcional)
- **Docker / Docker Compose** (opcional, para desarrollo y producción)
- **JWT** para autenticación
- **CORS** configurado para el frontend

## ⚙️ Instalación

1. Clonar el repositorio:

    ```bash
        git clone <URL_DEL_REPO>
    ```

2. Entrar al directorio del proyecto:

    ```bash
        cd backend
    ```

3. Crear y activar el entorno virtual:
    ```bash
        python -m venv env
        source env/bin/activate  # Linux/Mac
        env\Scripts\activate     # Windows
    ```

4. Instalar dependencias:

    ```bash
        pip install -r requirements.txt
    ```

5. Crear archivo de configuración .env:

    ```bash
        touch .env (para Linux)
    ```

4. Configurar variables de entorno .env:

    ```bash
        DJANGO_SECRET_KEY=tu_secret_key
        DJANGO_DEBUG=True
        DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1

        # PostgreSQL
        POSTGRES_DB=nombre_bd
        POSTGRES_USER=postgres
        POSTGRES_PASSWORD=password
        POSTGRES_HOST=localhost/127.0.0.1
        POSTGRES_PORT=5432

        # CORS / CSRF
        CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
        CSRF_TRUSTED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

        # Redis
        REDIS_URL=redis://localhost:6379/0
    ```
5. Crear la base de datos (PostgreSQL) si no existe:

    ```bash
        CREATE DATABASE maqtec_db;
        CREATE USER postgres WITH PASSWORD '1234';
        ALTER ROLE postgres SET client_encoding TO 'utf8';
        ALTER ROLE postgres SET default_transaction_isolation TO 'read committed';
        ALTER ROLE postgres SET timezone TO 'UTC';
        GRANT ALL PRIVILEGES ON DATABASE maqtec_db TO postgres;
    ```

6. Ejecutar migraciones:

    ```bash
        python manage.py makemigrations
        python manage.py migrate
    ```

7. Crear un superusuario:

    ```bash
        python manage.py createsuperuser
        # Se solicitarán email, username, first_name, last_name y password
    ```

8. Ejecutar el servidor:

    ```bash
        python manage.py runserver
    ```

    El backend estará disponible en: http://127.0.0.1:8000/
