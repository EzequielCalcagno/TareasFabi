import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import tareaCompletadaSound from '../sounds/tareaCompletada.mp3';
import logroSound from '../sounds/logro.mp3';
import './css/perfil.css';
import LocalStorageService from '../services/LocalStorageService';

function Perfil() {
  const { nombre } = useParams();
  const [tasks, setTasks] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [isTopPerformer, setIsTopPerformer] = useState(false);
  const [localAchievements, setLocalAchievements] = useState([]);

  // Cargar las tareas del localStorage o un conjunto de tareas por defecto
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const daughterTasks = storedTasks.filter(task => task.daughter === nombre);
    setTasks(daughterTasks);

    const ach = LocalStorageService.getAchievementsByDaughter(nombre);
    setLocalAchievements(ach);
  }, [nombre]);

  // Recalcular el número de tareas completadas cuando tasks cambie
  useEffect(() => {
    const count = tasks.filter(task => task.completed).length;
    setCompletedCount(count);
    checkTopPerformer();
  }, [tasks]);

  // Efecto para revisar, agregar o remover logros según condiciones
  useEffect(() => {
    // Medalla Brillante: se obtiene si completedCount >= 5
    if (completedCount >= 5 && !localAchievements.includes('Medalla Brillante')) {
      playAchievementSound();
      LocalStorageService.addAchievement(nombre, 'Medalla Brillante');
    } else if (completedCount < 5 && localAchievements.includes('Medalla Brillante')) {
      LocalStorageService.removeAchievement(nombre, 'Medalla Brillante');
    }
    // Trofeo de Estrella: se obtiene si completedCount >= 10
    if (completedCount >= 10 && !localAchievements.includes('Trofeo de Estrella')) {
      playAchievementSound();
      LocalStorageService.addAchievement(nombre, 'Trofeo de Estrella');
    } else if (completedCount < 10 && localAchievements.includes('Trofeo de Estrella')) {
      LocalStorageService.removeAchievement(nombre, 'Trofeo de Estrella');
    }
    // Estrella del Día: se obtiene si es top performer
    if (isTopPerformer && !localAchievements.includes('Estrella del Día')) {
      playAchievementSound();
      LocalStorageService.addAchievement(nombre, 'Estrella del Día');
    } else if (!isTopPerformer && localAchievements.includes('Estrella del Día')) {
      LocalStorageService.removeAchievement(nombre, 'Estrella del Día');
    }
    // Actualizamos el estado de logros desde localStorage
    setLocalAchievements(LocalStorageService.getAchievementsByDaughter(nombre));
  }, [completedCount, isTopPerformer, localAchievements, nombre]);

  const playAchievementSound = () => {
    const audio = new Audio(logroSound);
    audio.play().catch(err => console.log('Error reproduciendo sonido de logro:', err));
  };

  // Función para marcar o desmarcar una tarea
  const handleTaskToggle = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        const newStatus = !task.completed;
        // Reproducir sonido solo si se marca como completada
        if (newStatus) {
          const audio = new Audio(tareaCompletadaSound);
          audio.play().catch(err => console.log('Error reproduciendo sonido:', err));
        }
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);

    // Actualizar el localStorage globalmente
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const newAllTasks = allTasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    localStorage.setItem('tasks', JSON.stringify(newAllTasks));
  };

  // Función para determinar logros basados en la cantidad de tareas completadas
  const getAchievements = () => {
    const achievements = [];
    if (completedCount >= 5) {
      achievements.push({ id: 1, title: '5 Tareas Completadas', icon: '🏅' });
    }
    if (completedCount >= 10) {
      achievements.push({ id: 2, title: '10 Tareas Completadas', icon: '🏆' });
    }
    if (isTopPerformer) {
      achievements.push({ id: 3, title: 'Estrella del Día', icon: '🌟' });
    }
    return achievements;
  };

  // Función para determinar cuál hija es la que tiene más tareas completadas en general
  const checkTopPerformer = () => {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const performerCounts = {};
    allTasks.forEach(task => {
      if (task.completed) {
        performerCounts[task.daughter] = (performerCounts[task.daughter] || 0) + 1;
      }
    });
    let topDaughter = null;
    let maxCount = 0;
    for (let daughter in performerCounts) {
      if (performerCounts[daughter] > maxCount) {
        maxCount = performerCounts[daughter];
        topDaughter = daughter;
      }
    }
    // Actualizamos el estado si la hija actual es la que tiene mayor cantidad
    setIsTopPerformer(topDaughter === nombre);
  };

  const achievements = getAchievements();
  // Calcular el porcentaje de progreso
  const progressPercentage = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="container perfil-container animate__animated animate__fadeIn">
      <h1 className="my-4 animate__animated animate__fadeInDown">Hola, {nombre}!</h1>

      {/* Sección de Logros */}
      {achievements.length === 0 ? (
        <p className="animate__animated animate__fadeIn"></p>
      ) : (
        <div className="achievements-section mt-4">
          <h3 className="animate__animated animate__fadeInDown">¡Logros!</h3>
          <div className="d-flex flex-wrap justify-content-center">
            {achievements.map(achievement => (
              <div key={achievement.id} className="achievement-card m-2 animate__animated animate__zoomIn">
                <span className="achievement-icon" role="img" aria-label="Logro">
                  {achievement.icon}
                </span>
                <p className="achievement-title">{achievement.title}</p>
              </div>
            ))}
          </div>
        </div>
      )
      }

      {/* Barra de Progreso */}
      {tasks.length > 0 && (
        <div className="progress mb-4 animate__animated animate__fadeIn">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{ width: `${progressPercentage}%` }}
            aria-valuenow={progressPercentage}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {progressPercentage}%
          </div>
        </div>
      )}

      <h2 className="animate__animated animate__fadeInDown">Tus Tareas</h2>
      {tasks.length === 0 ? (
        <p className="animate__animated animate__fadeIn">
          No tienes tareas asignadas para hoy.
        </p>
      ) : (
        <ul className="list-group">
          {tasks.map(task => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center animate__animated animate__fadeInUp"
            >
              <span className="task-desc">
                {task.description} - <strong>{task.points} pts</strong>
              </span>
              <button
                onClick={() => handleTaskToggle(task.id)}
                className={`btn btn-sm ${task.completed ? 'btn-success task-completed' : 'btn-secondary'}`}
              >
                {task.completed ? '¡Buen trabajo!' : 'Marcar como completada'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Perfil;
