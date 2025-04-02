import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importa los estilos globales
import App from './App'; // Importa el componente principal de la aplicación
import reportWebVitals from './reportWebVitals'; // Importa la herramienta para medir el rendimiento

// Crea el root de la aplicación y lo monta en el elemento con id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> {/* Activa el modo estricto de React para detectar problemas potenciales */}
    <App /> {/* Renderiza el componente principal de la aplicación */}
  </React.StrictMode>
);

// Si deseas medir el rendimiento de tu aplicación, puedes usar reportWebVitals
// Para registrar los resultados, pasa una función como argumento (ej. reportWebVitals(console.log))
// O envíalos a un endpoint de analítica. Más info: https://bit.ly/CRA-vitals
reportWebVitals();