🔐 Sistema de Control de Cerradura Inteligente
Frontend: React | Backend: Node.js + Express

🚀 Funcionamiento Básico
Este proyecto permite abrir y cerrar una cerradura virtual mediante una API REST.

📌 Características
✅ Autenticación por token
✅ Estado de la cerradura (abierta/cerrada)
✅ Interfaz React para control remoto

⚙️ Configuración
1. Clona el repositorio
bash
Copy
git clone https://github.com/tu-usuario/ISST-Grupo25-Cerradura.git
cd ISST-Grupo25-Cerradura
2. Instala dependencias
Backend (Node.js)
bash
Copy
cd backend
npm install
npm start  # Inicia el servidor en http://localhost:3555
Frontend (React)
bash
Copy
cd frontend
npm install
npm run dev  # Inicia la app en http://localhost:3000
🔧 Endpoints del Backend
Método	Ruta	Descripción
POST	/abrirCerradura	Abre la cerradura con un token válido
POST	/cerrarCerradura	Cierra la cerradura con un token válido
Ejemplo de petición:

bash
Copy
curl -X POST http://localhost:3555/abrirCerradura \
  -H "Content-Type: application/json" \
  -d '{"token": "clave-secreta"}'
🖥️ Interfaz Frontend
Botón "Abrir" → Envía una petición al backend para abrir la cerradura.

Botón "Cerrar" → Envía una petición al backend para cerrar la cerradura.

Mensaje de estado → Muestra si la cerradura está abierta o cerrada.