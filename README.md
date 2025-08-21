# reparacion_celulares
Una aplicación en Angular para gestionar una pequeña empresa de reparación de telefonos móviles

# 📱 Reparación Celulares

Aplicación web fullstack para gestionar reparaciones de teléfonos móviles.  
Incluye un **frontend en Angular 17** y un **backend en Node.js + Express + TypeScript**, con soporte para base de datos en **MySQL local** o en **Railway (producción)**.

---

## 📂 Estructura del repositorio

- `rep_tel_FE/` → Aplicación frontend (Angular).
- `rep_tel_BE/` → Servidor backend (Node.js + Express + TS).
- `bd_creacion_script.sql` → Script SQL para crear las tablas de la base de datos.

---

## ✅ Requisitos previos

- [Node.js](https://nodejs.org/) (>= v16 recomendado)  
- [Angular CLI](https://angular.io/cli)  
- [MySQL](https://dev.mysql.com/downloads/) **o** usar la base de datos en Railway  

---

## 🗄️ Configuración de la base de datos

### 🔹 Opción 1 – Base de datos local
1. Crea una base de datos vacía en MySQL.
2. Ejecuta el script para crear las tablas:

   ```bash
   mysql -u USUARIO -p BASE_DE_DATOS < bd_creacion_script.sql
Configura el archivo .env.dev en el backend con tus credenciales locales.
### 🔹 Opción 2 – Usar la base de datos en Railway (Producción)
* Si no quieres crear una base de datos local, puedes usar la instancia que ya está en Railway.
Solo copia el archivo .env.production como .env dentro de rep_tel_BE.

## ⚙️ Variables de entorno (Backend)

### Ejemplo `.env.dev`
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_password
DB_NAME=reparaciones
PORT=3000
```
### Ejemplo `.env.prod`
```env
DB_HOST=containers-us-west-xxx.railway.app
DB_USER=railway
DB_PASS=********
DB_NAME=railway
PORT=3000
```

## ▶️ Ejecución en modo local

### 1. Backend (Node.js + Express + TypeScript)
```bash
cd rep_tel_BE
npm install
npm run dev
```
El backend por defecto corre en: http://localhost:3000

### 2. Frontend (Angular)
```bash
cd rep_tel_FE
npm install
npm run start
```
El frontend por defecto corre en: http://localhost:4200

## 🔄 Proxy entre Frontend y Backend
El proyecto ya incluye un archivo proxy.conf.json en rep_tel_FE que permite redirigir automáticamente las peticiones al backend durante el desarrollo.

Ejemplo de configuración:

```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

¿Cómo funciona?

Cuando el frontend hace una petición a /api/..., Angular redirige al backend (http://localhost:3000).

Por ejemplo, la ruta /api/users en el frontend se convierte en http://localhost:3000/api/users en el backend.

## 🌍 Acceso a la aplicación
Frontend → http://localhost:4200

Backend → http://localhost:3000

## 🛠️ Tecnologías utilizadas
Frontend → Angular 17, Angular Material, Flex Layout

Backend → Node.js, Express, TypeScript, JWT, bcrypt

Base de datos → MySQL (local o Railway)
