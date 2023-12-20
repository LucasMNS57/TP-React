import React from 'react';

const Task = ({ task, onDelete, onEdit, onToggle }) => {
    // Détermine la classe de la tâche en fonction de son état
    const taskClassName = task.completed ? 'completed-task' : '';
  
    // Affichage utilisateur
    return (
      <div className={`task-list-item d-flex justify-content-between align-items-center mb-3 ${taskClassName}`}>
        <div>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="me-3"
          />
          <span>{task.title}</span>
        </div>
        <div>
          <button className="btn btn-danger mx-2" onClick={() => onDelete(task.id)}>
            Supprimer
          </button>
          <button className="btn btn-primary" onClick={() => onEdit(task.id)}>
            Modifier
          </button>
        </div>
      </div>
    );
  };

export default Task;
