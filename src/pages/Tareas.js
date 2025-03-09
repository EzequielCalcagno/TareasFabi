import React, { useState, useEffect } from 'react';
import LocalStorageService from '../services/LocalStorageService';

function Tareas() {
  const [daughters, setDaughters] = useState([]);
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [selectedDaughter, setSelectedDaughter] = useState('');
  const [applyToAll, setApplyToAll] = useState(false);
  const [tasks, setTasks] = useState([]);

  // Cargar la lista de hijas (si no existe, se crean por defecto)
  useEffect(() => {
    let savedDaughters = LocalStorageService.getDaughters();
    if (!savedDaughters || savedDaughters.length === 0) {
      savedDaughters = [];
      LocalStorageService.saveDaughters(savedDaughters);
    }
    setDaughters(savedDaughters);
    setSelectedDaughter(savedDaughters[0]);
  }, []);

  // Cargar las tareas ya creadas
  useEffect(() => {
    const savedTasks = LocalStorageService.getTasks();
    setTasks(savedTasks);
  }, []);

  // Manejar el envío del formulario para crear una tarea
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !points) return;

    const newTasks = [];

    if (applyToAll) {
      daughters.forEach((daughter) => {
        const newTask = {
          id: Date.now() + Math.random(), // Genera un ID único para cada tarea
          description,
          points: parseInt(points, 10),
          daughter: daughter,
          completed: false,
        };
        newTasks.push(newTask);
      });
    } else {
      const newTask = {
        id: Date.now(), // ID único
        description,
        points: parseInt(points, 10),
        daughter: selectedDaughter,
        completed: false,
      };
      newTasks.push(newTask);
    }

    // Agregar las nuevas tareas a localStorage y al estado
    newTasks.forEach((task) => LocalStorageService.addTask(task));
    setTasks([...tasks, ...newTasks]);

    // Limpiar el formulario
    setDescription('');
    setPoints('');
  };

  // Función para eliminar una tarea
  const handleDeleteTask = (taskId) => {
    LocalStorageService.removeTask(taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="container">
      <h1 className="my-4">Gestión de Tareas</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descripción de la tarea
          </label>
          <input
            type="text"
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="points" className="form-label">
            Puntos
          </label>
          <input
            type="number"
            id="points"
            className="form-control"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id="applyToAll"
            className="form-check-input"
            checked={applyToAll}
            onChange={(e) => setApplyToAll(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="applyToAll">
            Aplicar a todas las hijas
          </label>
        </div>
        {/* Si no se aplica a todas, se permite seleccionar la hija */}
        {!applyToAll && (
          <div className="mb-3">
            <label htmlFor="daughter" className="form-label">
              Asignar a
            </label>
            <select
              id="daughter"
              className="form-select"
              value={selectedDaughter}
              onChange={(e) => setSelectedDaughter(e.target.value)}
              required
            >
              {daughters.map((daughter, index) => (
                <option key={index} value={daughter}>
                  {daughter}
                </option>
              ))}
            </select>
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Crear Tarea
        </button>
      </form>

      <hr />

      <h2>Tareas creadas</h2>
      {tasks.length === 0 ? (
        <p>No hay tareas creadas.</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{task.description}</strong> - {task.points} pts - Asignada a: {task.daughter}
              </div>
              <button onClick={() => handleDeleteTask(task.id)} className="btn btn-danger btn-sm">
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tareas;
