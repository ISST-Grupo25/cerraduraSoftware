// Importa los archivos CSS y componentes necesarios
import './App.css'; // Estilos para la aplicación
import Cerradura from './Cerradura'; // Componente de la cerradura

// Componente principal de la aplicación
function App() {
  return (
    <div className="page-container"> {/* Contenedor principal */}
      <header className="header"> {/* Encabezado de la aplicación */}
        <h1>Simulación Cerradura</h1>
      </header>
      <main className="main-content"> {/* Contenido principal */}
        <Cerradura /> {/* Renderiza el componente Cerradura */}
      </main>
      <footer className="footer"> {/* Pie de página */}
        &copy; 2025 Internet de las Casas. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default App; // Exporta el componente para su uso en otros archivos
