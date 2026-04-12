-- Script to initialize MWT Builder Database
-- Database: mwt_builder_db
-- Schema: public
-- Adapter: Postgresql
-- Host: 127.0.0.1
-- Username: postgres
-- Password: 241302
-- Port: 5432

-- Table for Roles
CREATE TABLE api_role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Table for Artifacts
CREATE TABLE api_artefacto (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_by_id INTEGER NOT NULL REFERENCES auth_user(id),
    status VARCHAR(50) DEFAULT 'Published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    structure_json JSONB NOT NULL
);

-- Note: auth_user table is managed by Django.
-- Admin user credentials for Login: Admin / MuitoWork2026?

-- Insert initial roles
INSERT INTO api_role (name) VALUES ('Admin');
INSERT INTO api_role (name) VALUES ('CEO');
