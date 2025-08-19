-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS reparaciones_db
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_general_ci;

-- 2. Usar la base de datos
USE reparaciones_db;

-- 3. Tabla de usuarios
CREATE TABLE usuarios (
  id INT PRIMARY KEY AUTO_INCREMENT,
  correo VARCHAR(160) NOT NULL UNIQUE,
  clave_hash VARCHAR(255) NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tabla de clientes
CREATE TABLE clientes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(80) NOT NULL,
  apellido VARCHAR(80) NOT NULL,
  correo VARCHAR(160),
  telefono VARCHAR(40),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabla de teléfonos
CREATE TABLE telefonos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cliente_id INT NOT NULL,
  marca VARCHAR(80) NOT NULL,
  modelo VARCHAR(80) NOT NULL,
  imei VARCHAR(40),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_telefonos_cliente FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
  UNIQUE KEY uq_imei (imei)
);

-- 6. Tabla de estados de reparación
CREATE TABLE estados_reparacion (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

-- 7. Tabla de reparaciones
CREATE TABLE reparaciones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  telefono_id INT NOT NULL,
  descripcion TEXT NOT NULL,
  estado_id INT NOT NULL,
  costo DECIMAL(10,2) DEFAULT 0,
  reparado_en DATETIME NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_reparaciones_telefono FOREIGN KEY (telefono_id) REFERENCES telefonos(id) ON DELETE CASCADE,
  CONSTRAINT fk_reparaciones_estado FOREIGN KEY (estado_id) REFERENCES estados_reparacion(id)
);

-- 8. Insertar estados iniciales
INSERT INTO estados_reparacion (nombre) VALUES 
('Pendiente'),
('En progreso'),
('Finalizado');
