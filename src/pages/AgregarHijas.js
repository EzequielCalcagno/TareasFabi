import React, { useState, useEffect } from 'react';
import LocalStorageService from '../services/LocalStorageService';

function AgregarHijas() {
    const [nombre, setNombre] = useState('');
    const [daughters, setDaughters] = useState([]);

    // Cargar la lista de hijas desde localStorage al iniciar el componente
    useEffect(() => {
        const savedDaughters = LocalStorageService.getDaughters();
        setDaughters(savedDaughters);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombre.trim() === '') return;
        // Agregar la nueva hija al localStorage
        LocalStorageService.addDaughter(nombre.trim());
        // Actualizar el estado local para mostrar la lista actualizada
        setDaughters([...daughters, nombre.trim()]);
        setNombre('');
    };

    // Función para eliminar una tarea
    const handleDeleteDaughter = (daughter) => {
        LocalStorageService.removeDaughter(daughter);
        setDaughters(daughters.filter(d => d !== daughter));
    };

    return (
        <div className="container">
            <h1 className="my-4">Agregar Hijas</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                        Nombre de la hija:
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Agregar
                </button>
            </form>
            <hr />
            <h2>Lista de Hijas</h2>
            {daughters.length === 0 ? (
                <p>No hay hijas registradas.</p>
            ) : (
                <ul className="list-group">
                    {daughters.map((daughter, index) => (
                        <li key={index} className="list-group-item">
                            <div>
                                <strong>{daughter}</strong>
                            </div>

                            <button onClick={() => handleDeleteDaughter(daughter)} className="btn btn-danger btn-sm">
                                Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AgregarHijas;
