# Guía de Despliegue Manual (MWT Builder)

Despliega `builder.muito.work` en el VPS Hostinger (`187.77.218.102`) reutilizando el reverse-proxy de `mwt-nginx` (stack `/opt/mwt`). El TLS termina en `mwt-nginx`; el builder solo escucha en `127.0.0.1:8080`.

## Arquitectura

```
Cloudflare (DNS)
        │
        ▼
[VPS 187.77.218.102]
   mwt-nginx :80/:443  ──proxy_pass──▶  127.0.0.1:8080
                                          │
                                          ▼
                                 mwt-builder-nginx :80
                                  ├── /          → frontend (build estático)
                                  ├── /api/      → mwt-builder-django:8000
                                  ├── /admin/    → mwt-builder-django:8000
                                  └── /static/   → volumen static_collected
```

## Requisitos previos
1. DNS Cloudflare: record `A builder → 187.77.218.102` (DNS only o Proxied; ver Paso 5).
2. Stack `mwt` arriba (`/opt/mwt`) con `mwt-nginx` ocupando 80/443.
3. Docker y docker compose en el VPS.

## Paso 1 — Clonar/actualizar
```bash
cd /opt
[ -d mwt_builder ] || git clone https://github.com/Ale241302/mwt_builder.git
cd mwt_builder
git pull
```

## Paso 2 — `.env`
```bash
cp .env.example .env
nano .env   # ajustar DB_PASSWORD y SECRET_KEY
```

## Paso 3 — Construir y levantar el builder
```bash
docker compose down --remove-orphans
docker compose up --build -d
docker compose ps
docker compose logs -f --tail=100 django
```
El builder queda escuchando solo en `127.0.0.1:8080` (no expuesto a internet directamente).

## Paso 4 — Reverse proxy en `mwt-nginx`
Copia `deploy/mwt-nginx-builder.conf` al stack `/opt/mwt`. La ruta exacta depende de cómo está montado el `conf.d` del `mwt-nginx`. Suele ser:
```bash
sudo cp deploy/mwt-nginx-builder.conf /opt/mwt/nginx/conf.d/builder.muito.work.conf
cd /opt/mwt
docker compose exec nginx nginx -t
docker compose exec nginx nginx -s reload
```
Si no encuentras dónde están los `*.conf` del nginx maestro:
```bash
docker exec mwt-nginx sh -c 'ls /etc/nginx/conf.d/'
docker inspect mwt-nginx --format '{{json .Mounts}}' | jq
```

## Paso 5 — TLS (Let's Encrypt en `mwt-nginx`)
**Opción A — Cloudflare Proxied (naranja) + Full (Strict):** sigue habilitando certbot en origen para que la conexión Cloudflare→VPS use TLS real.

**Opción B — DNS only (gris):** certbot HTTP-01 funciona directo.

```bash
cd /opt/mwt
docker compose run --rm certbot certonly --webroot \
    --webroot-path=/var/www/certbot \
    -d builder.muito.work \
    --email alejandro@muitowork.com --agree-tos --no-eff-email
docker compose exec nginx nginx -s reload
```

## Paso 6 — Verificación
```bash
curl -I http://127.0.0.1:8080/healthz                       # 200 ok
curl -I -H "Host: builder.muito.work" http://127.0.0.1/     # vía mwt-nginx → 200 o 301
curl -I https://builder.muito.work/                         # desde fuera del VPS
```
Login en `https://builder.muito.work/` con `Admin` / `MuitoWork2026?`.

## Migración de datos
`backend/data.json` se carga automáticamente la primera vez que arranca el contenedor `mwt-builder-django` (volumen vacío).

## Rollback rápido
```bash
cd /opt/mwt_builder
docker compose down
```
Los stacks `mwt` y `consola-mwt-one` no se ven afectados.

## Troubleshooting
- **postgres exited(1)** → casi siempre falta `DB_PASSWORD` en `.env`. `docker compose logs db`.
- **502 Bad Gateway** desde fuera → mwt-nginx no encuentra `127.0.0.1:8080`. Comprueba `docker compose ps` y que el puerto está bound (`ss -tlnp | grep 8080`).
- **CSRF / DisallowedHost** → revisa `ALLOWED_HOSTS` y `CSRF_TRUSTED_ORIGINS` en `.env` y reinicia django.
- **mixed content** → Django no detecta HTTPS. Verifica `proxy_set_header X-Forwarded-Proto https;` en `mwt-nginx-builder.conf`.
