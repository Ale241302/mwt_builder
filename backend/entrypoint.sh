#!/bin/bash

# Esperar a que la base de datos esté lista
echo "Esperando a postgres..."
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 0.1
done
echo "PostgreSQL listo"

# Ejecutar migraciones
echo "Ejecutando migraciones..."
python manage.py migrate --noinput

# Recolectar archivos estáticos
echo "Recolectando estáticos..."
python manage.py collectstatic --noinput

# Cargar datos si existe data.json y la DB está vacía
if [ -f "data.json" ]; then
    echo "data.json encontrado. Intentando cargar datos..."
    # Usamos un flag sencillo para no sobreescribir si ya hay datos básicos
    python manage.py loaddata data.json || echo "Error al cargar data.json o datos ya presentes."
fi

# Iniciar Gunicorn
echo "Iniciando servidor Gunicorn..."
gunicorn mwt_builder.wsgi:application --bind 0.0.0.0:8000 --workers 3
