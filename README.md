# MWT Builder Platform

MWT Builder es una plataforma full-stack avanzada para la creación y gestión de artefactos de datos (formularios personalizados), inspirada en los constructores de páginas modernos. Permite a los usuarios diseñar estructuras de datos complejas mediante una interfaz visual de arrastrar y soltar (Drag and Drop).

## 🚀 Características Principales

- **Constructor Visual (Drag & Drop)**: Diseña formularios dinámicos con múltiples tipos de campos (Texto, Número, Fecha, Archivo, etc.).
- **Gestión de Secciones**: Soporte para layouts flexibles con secciones de 1, 2 o 3 columnas.
- **Autenticación Segura**: Sistema de login basado en JWT con usuarios personalizados almacenados en la tabla `usuarios_builder`.
- **Panel de Control (Dashboard)**: Visualización y filtrado de artefactos creados, con acciones en bloque para gestión eficiente.
- **Arquitectura de Microservicios**: Separación clara entre el Backend (Django) y el Frontend (React).
- **Diseño Corporativo**: Estética premium basada en los colores y logotipo de MWT.

## 🛠️ Stack Tecnológico

- **Backend**: Python 3.14 + Django 5.x + Django Rest Framework + SimpleJWT.
- **Frontend**: React 18 + Vite + Tailwind CSS + Lucide Icons.
- **Base de Datos**: PostgreSQL.
- **Control de Versiones**: Git / GitHub.

## ⚙️ Configuración del Entorno

### Requisitos Previos

- Python 3.14+
- Node.js 18+
- PostgreSQL 17

### Pasos de Instalación

1.  **Clonar el repositorio**:
    ```bash
    git clone https://github.com/Ale241302/mwt_builder.git
    cd mwt_builder
    ```

2.  **Configurar el Backend**:
    ```bash
    cd backend
    python -m venv venv
    ./venv/Scripts/activate # Windows
    pip install -r requirements.txt
    python manage.py migrate
    python setup_db.py # Inicializa usuarios y roles
    python manage.py runserver
    ```

3.  **Configurar el Frontend**:
    ```bash
    cd ../frontend
    npm install
    npm run dev
    ```

## 🔑 Credenciales por Defecto

- **Usuario**: `Admin`
- **Contraseña**: `MuitoWork2026?`

## 📄 Estructura del Proyecto

- `/backend`: Lógica de servidor, modelos API y gestión de base de datos.
- `/frontend`: Aplicación SPA en React con el constructor visual.
- `script.sql`: Esquema SQL para la inicialización manual de PostgreSQL.

---
© 2026 MWT Builder - Desarrollo Profesional.
