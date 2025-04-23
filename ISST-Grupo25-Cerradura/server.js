// Importa los módulos necesarios
const express = require('express'); // Framework para manejar solicitudes HTTP
const cors = require('cors'); // Middleware para permitir solicitudes de diferentes orígenes
const http = require('http'); // Módulo HTTP para crear el servidor

const app = express();
app.use(express.json()); // Permite recibir datos en formato JSON en las solicitudes
app.use(cors()); // Habilita CORS para permitir solicitudes desde cualquier origen

// Crea el servidor HTTP utilizando Express
const server = http.createServer(app);

// Configura Socket.IO para la comunicación en tiempo real
const io = require('socket.io')(server, {
    cors: { origin: '*' },  // Permite conexiones desde cualquier origen (ajustar en producción)
    transports: ['websocket'],
    allowEIO3: true, 
});


io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    socket.on('getBatteryLevel', (data) => {
        const token = data.token; // ahora sí recoges el token del mensaje
        console.log("Solicitud de nivel de batería recibida para token:", token);

        // Responder al cliente con el nivel de batería simulado
        socket.emit('batteryLevel', {
            nivel: nivelBateria,
            token: token
        });
    });
});

// Estado de la cerradura (abierta o cerrada)
let cerraduraAbierta = false;

// Endpoint para abrir la cerradura
app.post('/abrirCerradura', (req, res) => {
    const { token } = req.body; // Extrae el token del cuerpo de la solicitud
    
    // Verifica si se proporciona un token válido
    if (token) {
        cerraduraAbierta = true; // Cambia el estado de la cerradura a abierta
        console.log('Cerradura abierta con token:', token);
        
        // Notifica a todos los clientes conectados que la cerradura está abierta
        io.emit('lockStatus', { status: 'abierta', token });
        res.json({ estado: 'abierta' }); // Responde con el estado actualizado
    } else {
        res.status(400).json({ error: 'Token inválido' }); // Devuelve error si no hay token
    }
});

// Endpoint para cerrar la cerradura
app.post('/cerrarCerradura', (req, res) => {
    const { token } = req.body; // Extrae el token del cuerpo de la solicitud
    
    // Verifica si se proporciona un token válido
    if (token) {
        cerraduraAbierta = false; // Cambia el estado de la cerradura a cerrada
        console.log('Cerradura cerrada con token:', token);
        
        // Notifica a todos los clientes conectados que la cerradura está cerrada
        io.emit('lockStatus', { status: 'cerrada', token });
        res.json({ estado: 'cerrada' }); // Responde con el estado actualizado
    } else {
        res.status(400).json({ error: 'Token inválido' }); // Devuelve error si no hay token
    }
});

// Inicia el servidor en el puerto 3555
server.listen(3555, () => {
    console.log('Backend2 (Socket.IO) escuchando en puerto 3555');
});

let nivelBateria = 100;

// Endpoint para actualizar el nivel de batería
app.post('/actualizarBateria', (req, res) => {
    const { nivel } = req.body;
    if (nivel >= 0 && nivel <= 100) {
        nivelBateria = nivel;
        io.emit('bateriaActualizada', { nivel }); // Notifica a todos los clientes
        console.log(`Nivel de batería recibido: ${nivel}%`);
        res.json({ exito: true, nivel });
    } else {
        res.status(400).json({ error: 'Nivel de batería inválido' });
    }
});

// Endpoint para obtener el nivel de batería
app.get('/nivelBateria', (req, res) => {
    res.json({ nivel: nivelBateria });
});


