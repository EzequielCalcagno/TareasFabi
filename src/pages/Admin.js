import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Admin() {
  const [magicWord, setMagicWord] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Define la palabra mágica esperada
    if (magicWord === 'abracadabra') {
      setLoggedIn(true);
    } else {
      alert('Palabra mágica incorrecta. Intenta de nuevo.');
      setMagicWord('');
    }
  };

  if (!loggedIn) {
    return (
      <div className="container">
        <h1 className="my-4">Ingreso para padres</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="magicWord" className="form-label">
              Introduce la palabra mágica:
            </label>
            <input
              type="password"
              id="magicWord"
              className="form-control"
              value={magicWord}
              onChange={(e) => setMagicWord(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Entrar
          </button>
        </form>
      </div>
    );
  }

  // Si la autenticación es exitosa, se muestran las opciones de administración
  return (
    <div className="container">
      <h1 className="my-4">Panel de Administración</h1>
      <div className="list-group">
        <Link to="/agregarHijas" className="list-group-item list-group-item-action">
          Agregar Hijas
        </Link>
        <Link to="/tareas" className="list-group-item list-group-item-action">
          Gestión de Tareas
        </Link>
      </div>
    </div>
  );
}

export default Admin;
