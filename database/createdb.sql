-- crear base de datos
DROP DATABASE IF EXISTS revalida_sucesso;
CREATE DATABASE revalida_sucesso;

-- usar
USE revalida_sucesso;

-- crear tabla usuarios
CREATE TABLE users (
	id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    birthdate DATE NOT NULL,
    phone VARCHAR(255) NOT NULL,
    address TEXT,
    isActive BOOLEAN NOT NULL
);

-- crear tabla usuarios
CREATE TABLE roles (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- crear tabla relacion usuarios roles
CREATE TABLE users_roles (
	user_id BINARY(16) REFERENCES users(id),
    role_id INT REFERENCES roles(id),
    PRIMARY KEY (user_id, role_id)
);

INSERT INTO roles (name) VALUES
('Admin'),
('User');

INSERT INTO users (id, name, email, birthdate, phone, address, isActive) VALUES
(UUID_TO_BIN(UUID()), "Juan Pérez", "juan.perez@example.com", "1985-06-15", "+1234567890", "Calle Falsa 123", True);

INSERT INTO users_roles (user_id, role_id) VALUES
((SELECT id FROM users where name = 'Juan Pérez'), (SELECT id FROM roles where name = 'Admin')),
((SELECT id FROM users where name = 'Juan Pérez'), (SELECT id FROM roles where name = 'User'));

select name, email, birthdate, phone, address, isActive, BIN_TO_UUID(id) id from users;