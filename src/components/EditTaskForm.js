import React, { useState, useEffect, useRef } from 'react';


const EditTaskForm = ({ task, onUpdate }) => {
    // État pour la tâche en cours d'édition et référence pour suivre la tâche précédente
    const [editedTask, setEditedTask] = useState(task);
    const prevTaskRef = useRef(task);
  
    // Effet pour mettre à jour la tâche en cours d'édition lorsqu'une nouvelle tâche est sélectionnée
    useEffect(() => {
      prevTaskRef.current = task;
      setEditedTask(task);
    }, [task]);
  
    // Gestion du changement dans le champ de modification
    const handleInputChange = event => {
      const { name, value } = event.target;
      setEditedTask({ ...editedTask, [name]: value });
    };
  
    // Fonction pour mettre à jour la tâche après la modification
    const handleUpdate = event => {
      event.preventDefault();
      onUpdate(editedTask.id, editedTask.title);
    };
  
    // Fonction pour annuler la modification et revenir à la tâche précédente
    const handleCancel = () => {
      setEditedTask(prevTaskRef.current);
    };

    // Affichage utilisateur
    return (
        <form onSubmit={handleUpdate} className="mt-3">
          <div className="mb-3">
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleInputChange}
              className="form-control form-control-lg"
              style={{ marginBottom: '10px' }}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-warning me-2">
              Annuler
            </button>
            <button type="submit" className="btn btn-success">
              Enregistrer
            </button>
          </div>
        </form>
      );
      
  };


export default EditTaskForm;
