import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LocalStorageService from '../services/LocalStorageService';
import loadingGif from '../extras/loading.gif';
import './css/home.css';

function Home() {
  const [daughters, setDaughters] = useState([]);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Se espera que las hijas se guarden como objetos { name, avatar }
    const savedDaughters = LocalStorageService.getDaughters();
    setDaughters(savedDaughters);
  }, []);

  // Mostrar el splash por 2 segundos y luego ocultarlo
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Mientras showSplash sea true, se muestra el GIF
  if (showSplash) {
    return (
      <div className="splash-screen">
        <img src={loadingGif} />
      </div>
    );
  }

  return (
    <div className="container home-container">
      <h1 className="text-center my-4 animate__animated animate__fadeInDown">
        ¡Elige tu Perfil y completa las tareas!
      </h1>
      <div className="row">
        {daughters.map((daughterName, index) => (
          <div key={index} className="col-md-4">
            <div className="card mb-4 animate__animated animate__zoomIn">
              <Link to={`/perfil/${daughterName}`}
                className="card-body text-center"
                style={{ textDecoration: 'none', color: 'inherit' }}>
                <h5 className="card-title mt-2">{daughterName}</h5>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
