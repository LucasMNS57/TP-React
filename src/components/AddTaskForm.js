import React, { useState } from 'react';

const AddTaskForm = ({ onAdd }) => {
    // État pour le nouvel input de tâche
    const [newTask, setNewTask] = useState('');
  
    // Gestion du changement dans le champ d'ajout de tâche
    const handleInputChange = event => {
      setNewTask(event.target.value);
    };
  
    // Fonction pour soumettre la nouvelle tâche
    const handleSubmit = event => {
      event.preventDefault();
      if (newTask.trim() !== '') {
        onAdd(newTask);
        setNewTask('');
      }
    };
  // Affichage utilisateur
  return (
    <form onSubmit={handleSubmit} className="mb-3 d-flex">
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Ajouter une tâche"
        className="form-control me-2"
        style={{ maxWidth: '200px' }}
      />
      <button type="submit" className="btn btn-primary ms-2">Ajouter</button>
    </form>
  );
};

export default AddTaskForm;
