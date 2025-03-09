import React, { useEffect, useState } from 'react';
import './css/puntos.css';

function Puntos() {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const initialSummary = {};
    allTasks.forEach(task => {
      if (!initialSummary[task.daughter]) {
        initialSummary[task.daughter] = 0;
      }
      if (task.completed) {
        initialSummary[task.daughter] += task.points;
      }
    });
    setSummary(initialSummary);
  }, []);

  return (
    <div className="container game-summary">
      <h1 className="my-4 text-center animate__animated animate__bounceIn">¡Puntajes!</h1>
      {Object.keys(summary).length === 0 ? (
        <p className="text-center animate__animated animate__fadeIn">
          ¡Aún no hay datos! Completa tareas para ganar puntos.
        </p>
      ) : (
        <div className="row justify-content-center">
          {Object.entries(summary).map(([daughter, points]) => (
            <div key={daughter} className="col-md-4">
              <div className="card mb-4 shadow-lg animate__animated animate__fadeInUp">
                <div className="card-body text-center">
                  <h2 className="card-title">{daughter}</h2>
                  <p className="display-4">
                    {points} <span style={{ fontSize: '0.5em' }}>pts</span>
                  </p>
                  <div className="star-animation" role="img" aria-label="Estrella">⭐</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Puntos;
