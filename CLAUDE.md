# CLAUDE.md - MWT Builder Project

## Project Overview
MWT Builder is a data artifact builder (forms) with a Django backend and a React frontend.

## Common Commands

### Backend (Django)
- **Run Server**: `python manage.py runserver`
- **Create Migrations**: `python manage.py makemigrations`
- **Apply Migrations**: `python manage.py migrate`
- **Shell**: `python manage.py shell`
- **Create Superuser**: `python manage.py createsuperuser`
- **Setup Initial Data**: `python setup_db.py` (Creates Admin user and Roles)

### Frontend (React + Vite)
- **Install Dependencies**: `npm install`
- **Run Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`

## Project Structure & Architecture
- **Backend**: Django using **Custom User Model** `api.UsuarioBuilder` mapping to `usuarios_builder` table in PostgreSQL.
- **Frontend**: React with Tailwind CSS and Lucide Icons.
- **Authentication**: JWT via `djangorestframework-simplejwt`.
- **Primary Feature**: Drag & Drop artifact builder storing structures as JSON in the database.

## Coding Standards
- **Python/Django**: Clean code, use DRF serializers, ensure PSR (PostgreSQL) integrity.
- **React**: Functional components, Tailwind for styling, custom hooks for API calls.
- **Aesthetics**: Follow MWT corporate colors (`#0B1E3A`, `#00B286`, `#1DE394`).

## Security
- User credentials for local dev: `Admin` / `MuitoWork2026?`.
- Database: `mwt_builder_db` on `localhost:5432` with user `postgres`.
