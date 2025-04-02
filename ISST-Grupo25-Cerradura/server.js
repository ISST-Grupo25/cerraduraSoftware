const express = require('express');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(express.json());
app.use(cors());

// Crea el servidor HTTP
const server = http.createServer(app);

// Configura Socket.IO
const io = require('socket.io')(server, {
    cors: { origin: '*' }  // Ajusta el origin según tu seguridad
});

// Cuando un cliente se conecta
io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);
});

// Estado de la cerradura
let cerraduraAbierta = false;

// Endpoint para abrir la cerradura
app.post('/abrirCerradura', (req, res) => {
    const { token } = req.body;
    // Aquí puedes simular la verificación de conexión Bluetooth si lo deseas
    if (token) {
        cerraduraAbierta = true;
        console.log('Cerradura abierta con token:', token);
        // Envía el mensaje de "cerradura abierta" vía WebSocket a todos los clientes conectados
        io.emit('lockStatus', { status: 'abierta', token });
        res.json({ estado: 'abierta' });
    } else {
        res.status(400).json({ error: 'Token inválido' });
    }
});

// Endpoint para cerrar la cerradura
app.post('/cerrarCerradura', (req, res) => {
    const { token } = req.body;
    if (token) {
        cerraduraAbierta = false;
        console.log('Cerradura cerrada con token:', token);
        // Envía el mensaje de "cerradura cerrada" vía WebSocket
        io.emit('lockStatus', { status: 'cerrada', token });
        res.json({ estado: 'cerrada' });
    } else {
        res.status(400).json({ error: 'Token inválido' });
    }
});

// Inicia el servidor con Socket.IO
server.listen(3555, () => {
    console.log('Backend2 (Socket.IO) escuchando en puerto 3555');
});
