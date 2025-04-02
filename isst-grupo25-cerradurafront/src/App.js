import logo from './logo.svg';
import './App.css';
import Cerradura from './Cerradura';

function App() {
  return (
    <div className="page-container">
      <header className="header">
        <h1>Simulación Cerradura</h1>
      </header>
      <main className="main-content">
        <Cerradura />
      </main>
      <footer className="footer">
        &copy; 2025 Internet de las Casas. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default App;
