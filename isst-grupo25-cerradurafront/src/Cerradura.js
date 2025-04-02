import React, { useState } from 'react';

const Cerradura = () => {
    const [estado, setEstado] = useState('cerrada');
    const [error, setError] = useState('');
    const [bluetooth, setBluetooth] = useState(false);

    // Función para simular la probabilidad de conexión Bluetooth
    const generarBluetooth = () => {
        const probabilidad = Math.random() < 0.9;  // 90% de probabilidad de éxito
        setBluetooth(probabilidad);  // Cambiar el estado de Bluetooth
        if (probabilidad) {
            alert('Bluetooth habilitado, ahora puedes abrir la cerradura');
        } else {
            alert('No se pudo conectar al Bluetooth');
        }
    };

    // Función para simular la apertura y cierre de la cerradura
    const abrirCerradura = (token) => {
        // Solo permitir abrir la cerradura si Bluetooth está habilitado
        if (!bluetooth) {
            setError('Bluetooth no habilitado. No se puede abrir la cerradura.');
            return;
        }

        // Intentar abrir la cerradura si Bluetooth está habilitado
        fetch('http://localhost:3555/abrirCerradura', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.estado === 'abierta') {
                setEstado('abierta');  // Cambiar el estado a "abierta" en la UI

                // Después de 10 segundos, cerramos la cerradura automáticamente
                setTimeout(() => {
                    cerrarCerradura(token);
                }, 10000);
            } else {
                setError('Error al abrir la cerradura');
            }
        })
        .catch(err => setError('No se pudo conectar al servidor'));
    };

    // Función para simular el cierre de la cerradura
    const cerrarCerradura = (token) => {
        fetch('http://localhost:3555/cerrarCerradura', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.estado === 'cerrada') {
                setEstado('cerrada');  // Cambiar el estado a "cerrada" en la UI
            } else {
                setError('Error al cerrar la cerradura');
            }
        })
        .catch(err => setError('No se pudo conectar al servidor'));
    };

    return (
        <div>
            <h2>Cerradura: {estado === 'cerrada' ? 'Cerrada' : 'Abierta'}</h2>
            <button onClick={() => abrirCerradura('valid-token')} disabled={!bluetooth}>
                Abrir Cerradura
            </button>
            <button onClick={() => generarBluetooth()}>
                Habilitar Bluetooth
            </button>
            {error && <div>{error}</div>}
        </div>
    );
};

export default Cerradura;
