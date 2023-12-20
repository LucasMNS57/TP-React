import React from 'react';
import Task from './Task';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskList = ({ tasks, onDelete, onEdit, onToggle }) => {
    // Affichage utilisateur
    return (
        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} className="task-spacing">
              <Task
                task={task}
                onDelete={onDelete}
                onEdit={onEdit}
                onToggle={onToggle}
              />
            </div>
          ))}
        </div>
      );
  };

export default TaskList;

