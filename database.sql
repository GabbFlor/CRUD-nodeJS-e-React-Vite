-- Crie o banco de dados
CREATE DATABASE testeReactVite;

-- Selecione o banco de dados
USE testeReactVite;

-- Crie a tabela "users"
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);