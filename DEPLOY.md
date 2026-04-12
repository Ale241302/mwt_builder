# Guía de Despliegue Manual (MWT Builder)

Esta guía explica cómo desplegar la aplicación en tu VPS de Hostinger usando Docker.

## Requisitos Previos en el VPS
1. Tener **Docker** y **Docker Compose** instalados.
2. Tener el puerto **80** y **443** abiertos en el firewall.
3. El dominio `builder.mwt.one` debe apuntar a la IP del VPS.

## Paso 1: Clonar y Preparar
Clona el repositorio en tu VPS:
```bash
git clone https://github.com/Ale241302/mwt_builder.git
cd mwt_builder
```

## Paso 2: Configurar Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto:
```bash
nano .env
```
Pega y ajusta lo siguiente:
```env
DB_NAME=mwt_builder_db
DB_USER=postgres
DB_PASSWORD=tu_password_seguro
SECRET_KEY=una_clave_muy_segura_aqui
DEBUG=False
ALLOWED_HOSTS=builder.mwt.one,backend
```

## Paso 3: Obtener Certificados SSL (Primera Vez)
Para obtener los certificados por primera vez con Certbot, ejecuta:
```bash
docker-compose up -d nginx
docker-compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot -d builder.mwt.one
```
Sigue las instrucciones en pantalla. Una vez obtenidos, reinicia Nginx:
```bash
docker-compose restart nginx
```

## Paso 4: Iniciar la Aplicación
Ejecuta el comando principal:
```bash
docker-compose up --build -d
```
Esto construirá las imágenes, iniciará la base de datos, correrá las migraciones y cargará automáticamente tus datos de `data.json`.

## Paso 5: Verificación
Accede a `https://builder.mwt.one` en tu navegador.

---
**Nota sobre Migración de Datos**: El archivo `backend/data.json` se cargará automáticamente la primera vez que inicies el contenedor del backend.
