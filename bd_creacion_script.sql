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

-- 9. Cambios despues de creacion de tablas
ALTER TABLE usuarios
CHANGE COLUMN correo email VARCHAR(160) NOT NULL;

ALTER TABLE clientes
CHANGE COLUMN correo email VARCHAR(160) NOT NULL;

-- 10. Cargas para trabajar
INSERT INTO clientes (nombre, apellido, email, telefono) VALUES
('Juan', 'Pérez', 'juan.perez@gmail.com', '3001234567'),
('María', 'Gómez', 'maria.gomez@gmail.com', '3002345678'),
('Carlos', 'Ramírez', 'carlos.ramirez@gmail.com', '3003456789'),
('Ana', 'Torres', 'ana.torres@gmail.com', '3004567890'),
('Luis', 'Martínez', 'luis.martinez@gmail.com', '3005678901');

INSERT INTO telefonos (cliente_id, marca, modelo, imei)
VALUES
(
  (SELECT id FROM clientes WHERE email = 'juan.perez@gmail.com'),
  'Samsung', 'Galaxy S23', '356789012345678'
),
(
  (SELECT id FROM clientes WHERE email = 'maria.gomez@gmail.com'),
  'Apple', 'iPhone 14', '356789012345679'
),
(
  (SELECT id FROM clientes WHERE email = 'carlos.ramirez@gmail.com'),
  'Xiaomi', 'Redmi Note 12', '356789012345680'
),
(
  (SELECT id FROM clientes WHERE email = 'ana.torres@gmail.com'),
  'Motorola', 'Moto G Power', '356789012345681'
),
(
  (SELECT id FROM clientes WHERE email = 'luis.martinez@gmail.com'),
  'Huawei', 'P50 Lite', '356789012345682'
);

INSERT INTO reparaciones (telefono_id, descripcion, estado_id, costo, reparado_en)
VALUES
(
  (SELECT id FROM telefonos WHERE imei = '356789012345678'),
  'Pantalla rota, reemplazo necesario',
  2,  -- Suponiendo que 2 = Reparado
  200000.00,
  NOW()
),
(
  (SELECT id FROM telefonos WHERE imei = '356789012345679'),
  'Batería descargándose muy rápido',
  1,  -- Pendiente
  150000.00,
  NULL
),
(
  (SELECT id FROM telefonos WHERE imei = '356789012345680'),
  'Problema de conexión Wi-Fi',
  2,  -- Reparado
  120000.00,
  NOW()
),
(
  (SELECT id FROM telefonos WHERE imei = '356789012345681'),
  'Botón de encendido atascado',
  1,  -- Pendiente
  130000.00,
  NULL
),
(
  (SELECT id FROM telefonos WHERE imei = '356789012345682'),
  'Altavoz con sonido distorsionado',
  2,  -- Reparado
  110000.00,
  NOW()
);
