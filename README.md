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
git clone https://github.com/tu-usuario/ISST-Grupo25-Cerradura.git
cd ISST-Grupo25-Cerradura
```

### 2️⃣ Instala dependencias

#### Backend (Node.js)
```sh
cd backend
npm install
npm start  # Inicia el servidor en http://localhost:3555
```

#### Frontend (React)
```sh
cd frontend
npm install
npm run dev  # Inicia la app en http://localhost:3000
```

## 🔧 Endpoints del Backend

| Método | Ruta | Descripción |
|--------|------|-------------|
| **POST** | `/abrirCerradura` | Abre la cerradura con un token válido |
| **POST** | `/cerrarCerradura` | Cierra la cerradura con un token válido |

### Ejemplo de petición:
```sh
curl -X POST http://localhost:3555/abrirCerradura \ 
  -H "Content-Type: application/json" \ 
  -d '{"token": "clave-secreta"}'
```

## 🖥️ Interfaz Frontend

- **Botón "Abrir"** → Envía una petición al backend para abrir la cerradura.
- **Botón "Cerrar"** → Envía una petición al backend para cerrar la cerradura.
- **Mensaje de estado** → Muestra si la cerradura está abierta o cerrada.

---

© 2025 Internet de las Casas. Todos los derechos reservados.

