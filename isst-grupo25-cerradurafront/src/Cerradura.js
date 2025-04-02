import React, { useState, useRef, useEffect } from 'react';

// Componente que simula una cerradura con verificación de proximidad y control de apertura/cierre
const Cerradura = () => {
    // Estado de la cerradura ('cerrada' o 'abierta')
    const [estado, setEstado] = useState('cerrada');
    const [error, setError] = useState(''); // Estado para manejar errores
    const [bluetooth, setBluetooth] = useState(false); // Simulación de proximidad por Bluetooth
    const videoRef = useRef(null); // Referencia para el video
    const token = 'valid-token'; // Token de autenticación (simulado)
    const [videoKey, setVideoKey] = useState(0); // Para forzar reinicio del video

    // Efecto para reproducir el video si la cerradura está abierta
    useEffect(() => {
        if (estado === 'abierta' && videoRef.current) {
            videoRef.current.play().catch(e => console.error("Error al reproducir:", e));
        }
    }, [videoKey, estado]);

    // Simula la verificación de proximidad por Bluetooth con una probabilidad del 90%
    const generarBluetooth = () => {
        const probabilidad = Math.random() < 0.9;
        setBluetooth(probabilidad);
        if (probabilidad) {
            alert('Proximidad correctamente verificada. Ahora puedes abrir la cerradura');
        } else {
            alert('No se pudo verificar la proximidad. Intenta nuevamente');
        }
    };

    // Función para abrir la cerradura
    const abrirCerradura = () => {
        if (!bluetooth) {
            setError('Es necesario verificar primero la proximidad a la cerradura');
            return;
        }

        fetch('http://localhost:3555/abrirCerradura', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.estado === 'abierta') {
                setEstado('abierta');
                setBluetooth(false);
                setVideoKey(prev => prev + 1); // Reinicia el video
                
                // La cerradura se cerrará automáticamente después de 6 segundos
                setTimeout(() => {
                    cerrarCerradura();
                }, 6000);
            }
        })
        .catch(err => setError('No se pudo conectar al servidor'));
    };

    // Función para cerrar la cerradura
    const cerrarCerradura = () => {
        fetch('http://localhost:3555/cerrarCerradura', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.estado === 'cerrada') {
                setEstado('cerrada');
                if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                }
            }
        });
    };

    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '20px',
            padding: '20px'
        }}>
            <h2>Estado: {estado === 'cerrada' ? 'Cerrada' : 'Abierta'}</h2>
            
            <div style={{ display: 'flex', gap: '20px' }}>
                {/* Botón para abrir la cerradura */}
                <button 
                    onClick={abrirCerradura} 
                    disabled={!bluetooth}
                    style={{ 
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: !bluetooth ? 'not-allowed' : 'pointer'
                    }}
                >
                    Abrir Cerradura
                </button>
                {/* Botón para verificar proximidad por Bluetooth */}
                <button 
                    onClick={generarBluetooth}
                    style={{ 
                        padding: '10px 20px',
                        fontSize: '16px'
                    }}
                >
                    Verificar Proximidad (Bluetooth)
                </button>
            </div>

            {/* Video que se reinicia cada vez que se abre la cerradura */}
            <video 
                key={videoKey}
                ref={videoRef}
                autoPlay={estado === 'abierta'}
                muted
                playsInline
                style={{ 
                    width: '800px', 
                    maxWidth: '90vw',
                    height: 'auto',
                    backgroundColor: 'white'
                }}
                controlsList="nodownload nofullscreen noremoteplayback"
            >
                <source src="/cerradura.mp4" type="video/mp4" />
                Tu navegador no soporta videos HTML5.
            </video>

            {/* Muestra los errores si existen */}
            {error && (
                <div style={{ 
                    color: 'red', 
                    textAlign: 'center',
                    padding: '10px',
                    backgroundColor: '#ffeeee',
                    borderRadius: '4px'
                }}>
                    {error}
                </div>
            )}
        </div>
    );
};

export default Cerradura;
