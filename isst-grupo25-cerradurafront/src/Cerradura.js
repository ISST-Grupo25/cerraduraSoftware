import React, { useState, useRef, useEffect } from 'react';

const Cerradura = () => {
    const [estado, setEstado] = useState('cerrada');
    const [error, setError] = useState('');
    const [bluetooth, setBluetooth] = useState(false);
    const videoRef = useRef(null);
    const token = 'valid-token';
    const [videoKey, setVideoKey] = useState(0); // Para forzar reinicio del componente de video

    // Efecto para reproducir el video si la cerradura está abierta
    useEffect(() => {
        if (estado === 'abierta' && videoRef.current) {
            videoRef.current.play().catch(e => console.error("Error al reproducir:", e));
        }
    }, [videoKey, estado]);

    const generarBluetooth = () => {
        const probabilidad = Math.random() < 0.9;
        setBluetooth(probabilidad);
        if (probabilidad) {
            alert('Proximidad correctamente verificada. Ahora puedes abrir la cerradura');
        } else {
            alert('No se pudo verificar la proximidad. Intenta nuevamente');
        }
    };

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
                // Forzamos el remount del video actualizando la key para reiniciarlo
                setVideoKey(prev => prev + 1);
                // La cerradura se mantendrá abierta 10 segundos antes de cerrarse
                setTimeout(() => {
                    cerrarCerradura();
                }, 6000);
            }
        })
        .catch(err => setError('No se pudo conectar al servidor'));
    };

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

            {/* El video se muestra siempre, pero se reinicia actualizando su key */}
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
                    backgroundColor: 'white' // Fondo blanco para el video
                }}
                controlsList="nodownload nofullscreen noremoteplayback"
                >
                <source src="/cerradura.mp4" type="video/mp4" />
                Tu navegador no soporta videos HTML5.
            </video>


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
