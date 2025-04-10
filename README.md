# 🔐 Sistema de Control de Cerradura Inteligente

Este proyecto es una solución de cerradura inteligente que permite abrir y cerrar una cerradura virtual mediante una API REST y una interfaz en React.

## 🚀 Funcionamiento Básico

- **Frontend:** React
- **Backend:** Node.js + Express
- **Comunicación:** API REST y WebSockets

## 📌 Características

✅ Autenticación por token  
✅ Estado de la cerradura (abierta/cerrada)  
✅ Interfaz React para control remoto  
✅ Simulación de verificación por proximidad (Bluetooth)

## ⚙️ Configuración

### 1️⃣ Clona el repositorio
```sh
git clone https://github.com/ISST-Grupo25/cerraduraSoftware.git
cd cerraduraSoftware
```

### 2️⃣ Instala dependencias

#### Backend (Node.js)
```sh
cd ISST-Grupo25-Cerradura
node server.js # Inicia el servidor en http://localhost:3555
```

#### Frontend (React)
```sh
cd isst-grupo25-cerradurafront
npm install
npm start  # Inicia la app en http://localhost:3000
```
## 📽️ Demo
Previamente, en la página web de IoH se tendrá que introducir un pin correcto en la reserva. Si este es correcto:

1. Pulsa **"Verificar proximidad"** hasta que sea aceptada.
2. Pulsa **"Abrir cerradura"**.
3. Se reproducirá un video simulando la apertura.
4. Después de 6 segundos, la cerradura se cerrará automáticamente.

## 📡 API del Backend

### POST `/abrirCerradura`
Abre la cerradura si el token es válido.

**Body:**
```json
{
  "token": "valid-token"
}
```

**Respuesta:**
```json
{
  "estado": "abierta"
}
```

### POST `/cerrarCerradura`
Cierra la cerradura si el token es válido.

**Body:**
```json
{
  "token": "valid-token"
}
```

**Respuesta:**
```json
{
  "estado": "cerrada"
}
```

---

© 2025 Internet de las Casas. Todos los derechos reservados.
