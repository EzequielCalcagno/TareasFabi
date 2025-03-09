import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Puntos from './pages/Puntos';
import Perfil from './pages/Perfil';
import Admin from './pages/Admin';
import AgregarHijas from './pages/AgregarHijas';
import Tareas from './pages/Tareas';
import BackgroundMusic from './pages/BackgroundMusic';

function App() {
  // Formatea la fecha en español
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="mb-4">
      <div className="container-fluid nav-bar bg-transparent mb-4">
        <nav className="navbar navbar-expand-lg bg-white navbar-light py-0 px-4">
          <BackgroundMusic />
          <Link to="/" className="navbar-brand d-flex align-items-center text-center">
            <h1>¡Buenos días!</h1>
          </Link>
          <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto">
              <Link to="/puntos" className="nav-item nav-link">Puntajes</Link>
            </div>
            <Link to="/admin" className="btn btn-primary px-3">
              Acceso para padres
            </Link>
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perfil/:nombre" element={<Perfil />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/agregarHijas" element={<AgregarHijas />} />
        <Route path="/tareas" element={<Tareas />} />
        <Route path="/puntos" element={<Puntos />} />
      </Routes>
    </div>
  );
}

export default App;
