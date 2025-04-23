import React, { useState, useRef, useEffect } from 'react';

const Cerradura = () => {
    const [estado, setEstado] = useState('cerrada');
    const [error, setError] = useState('');
    const [bluetooth, setBluetooth] = useState(false);
    const [batteryLevel, setBatteryLevel] = useState(20);
    const [showBatteryWarningVideo, setShowBatteryWarningVideo] = useState(false);
    const [showLowBatteryAttemptVideo, setShowLowBatteryAttemptVideo] = useState(false);
    const videoRef = useRef(null);
    const token = 'valid-token';
    const [videoKey, setVideoKey] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setBatteryLevel(prev => Math.max(prev - 1, 0));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (estado === 'abierta' && batteryLevel > 15 && videoRef.current) {
            videoRef.current.play().catch(err => console.error("Error al reproducir video:", err));
        }
    }, [videoKey, estado, batteryLevel]);

    useEffect(() => {
        if (batteryLevel <= 15 && batteryLevel > 0) {
            setShowBatteryWarningVideo(true);
        } else {
            setShowBatteryWarningVideo(false);
        }
    }, [batteryLevel]);

    const generarBluetooth = () => {
        if (batteryLevel === 0) return;
        const resultado = Math.random() < 0.9;
        setBluetooth(resultado);
        alert(resultado
            ? 'Proximidad correctamente verificada. Ahora puedes abrir la cerradura'
            : 'No se pudo verificar la proximidad. Intenta nuevamente');
    };

    const abrirCerradura = () => {
        if (batteryLevel === 0) return;

        if (batteryLevel <= 15) {
            setBluetooth(false);
            setShowLowBatteryAttemptVideo(true);
            return;
        }        

        if (!bluetooth) {
            setError('Es necesario verificar primero la proximidad a la cerradura');
            return;
        }

        fetch('http://localhost:3555/abrirCerradura', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.estado === 'abierta') {
                setEstado('abierta');
                setBluetooth(false);
                setVideoKey(prev => prev + 1);
                setTimeout(() => cerrarCerradura(), 6000);
            }
        })
        .catch(() => setError('No se pudo conectar al servidor'));
    };

    const cerrarCerradura = () => {
        fetch('http://localhost:3555/cerrarCerradura', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        })
        .then(res => res.json())
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
            padding: '20px',
            position: 'relative'
        }}>
            <h2>Estado: {estado === 'cerrada' ? 'Cerrada' : 'Abierta'}</h2>

            <div style={{ width: '300px', border: '1px solid #999', borderRadius: '5px', overflow: 'hidden', background: '#eee' }}>
                <div style={{ 
                    height: '20px',
                    width: `${batteryLevel}%`,
                    backgroundColor: batteryLevel <= 15 ? 'red' : '#4caf50',
                    transition: 'width 0.5s ease'
                }} />
            </div>
            <p style={{ margin: 0, fontWeight: 'bold' }}>
                Nivel de batería: {batteryLevel}%
            </p>

            <div style={{ display: 'flex', gap: '20px' }}>
                <button 
                    onClick={abrirCerradura} 
                    disabled={!bluetooth || batteryLevel === 0}
                    style={{ 
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: (!bluetooth || batteryLevel === 0) ? 'not-allowed' : 'pointer'
                    }}
                >
                    Abrir Cerradura
                </button>
                <button 
                    onClick={generarBluetooth}
                    disabled={batteryLevel === 0}
                    style={{ 
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: batteryLevel === 0 ? 'not-allowed' : 'pointer'
                    }}
                >
                    Verificar Proximidad (Bluetooth)
                </button>
            </div>

            {/* Video principal */}
            <div style={{ position: 'relative' }}>
                <video 
                    key={videoKey}
                    ref={videoRef}
                    autoPlay={estado === 'abierta' && batteryLevel > 15}
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
                    <source src="/cerradura_con_bateria.mp4" type="video/mp4" />
                    Tu navegador no soporta videos HTML5.
                </video>

                {/* Video batería baja en bucle */}
                {showBatteryWarningVideo && !showLowBatteryAttemptVideo && batteryLevel > 0 && (
                    <video
                        loop
                        autoPlay
                        muted
                        playsInline
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            backgroundColor: 'black',
                            zIndex: 10,
                            opacity: 0.95
                        }}
                        controlsList="nodownload nofullscreen noremoteplayback"
                    >
                        <source src="/cerradura_sin_bateria.mp4" type="video/mp4" />
                        Tu navegador no soporta videos HTML5.
                    </video>
                )}

                {/* Video de intento de apertura con batería baja */}
                {showLowBatteryAttemptVideo && batteryLevel > 0 && (
                    <video
                        autoPlay
                        muted
                        playsInline
                        onEnded={() => setShowLowBatteryAttemptVideo(false)}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            backgroundColor: 'black',
                            zIndex: 15
                        }}
                        controlsList="nodownload nofullscreen noremoteplayback"
                    >
                        <source src="/cerradura_sin_bateria_open.mp4" type="video/mp4" />
                        Tu navegador no soporta videos HTML5.
                    </video>
                )}

                {/* Bloqueo total cuando batería = 0 */}
                {batteryLevel === 0 && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'black',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        zIndex: 20,
                        textAlign: 'center',
                        padding: '20px'
                    }}>
                        Batería agotada. El sistema se apaga.
                    </div>
                )}
            </div>

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
