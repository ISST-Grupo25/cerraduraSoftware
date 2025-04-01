const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let cerraduraAbierta = false;  // Estado de la cerradura (cerrada o abierta)

// Endpoint para abrir la cerradura
app.post('/abrirCerradura', (req, res) => {
    const { token } = req.body;  // Recibir el token

    if (token) {  // Verificar si el token es válido
        cerraduraAbierta = true;
        console.log('Cerradura abierta con token:', token);
        res.json({ estado: 'abierta' });  // Confirmar que la cerradura se abrió
    } else {
        res.status(400).json({ error: 'Token inválido' });
    }
});

// Endpoint para cerrar la cerradura
app.post('/cerrarCerradura', (req, res) => {
    const { token } = req.body;

    if (token) {  // Verificar si el token es válido
        cerraduraAbierta = false;
        console.log('Cerradura cerrada con token:', token);
        res.json({ estado: 'cerrada' });  // Confirmar que la cerradura se cerró
    } else {
        res.status(400).json({ error: 'Token inválido' });
    }
});

// Iniciar el servidor
app.listen(3555, () => {
    console.log('Backend2 escuchando en puerto 3555');
});
