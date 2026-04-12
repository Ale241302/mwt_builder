-- Script to initialize MWT Builder Database
-- Database: mwt_builder_db

-- Drop tables if they exist
DROP TABLE IF EXISTS api_artefacto;
DROP TABLE IF EXISTS api_role;

-- Table for Roles
CREATE TABLE api_role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

-- Table for Artifacts
CREATE TABLE api_artefacto (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    structure_json JSONB NOT NULL
);

-- Insert initial roles
INSERT INTO api_role (name) VALUES ('Admin');
INSERT INTO api_role (name) VALUES ('CEO');

-- Note: The actual User table is managed by Django, 
-- but we can add role integration logic in Django models.
