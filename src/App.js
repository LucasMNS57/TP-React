import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const initialTasks = [
    { id: 1, title: 'Rendre le devoir en React', completed: false },
    { id: 2, title: 'Aller courir', completed: false },
    { id: 3, title: 'Manger 5 fruits et légumes par jour', completed: false }
  ];

  // Gestion de l'état des tâches et récupération des tâches depuis localStorage
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : initialTasks;
  });

  // Gestion de l'état des filtres et de l'édition d'une tâche
  const [filter, setFilter] = useState('Toutes');
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskText, setEditTaskText] = useState('');

  // Sauvegarde des tâches dans localStorage lorsqu'elles sont modifiées
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Fonction pour ajouter une nouvelle tâche à la liste
  const handleAddTask = title => {
    const newTask = {
      id: tasks.length + 1,
      title,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  // Fonction pour supprimer une tâche de la liste
  const handleDeleteTask = id => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  // Fonction pour éditer une tâche existante
  const handleEditTask = id => {
    setEditingTask(id);
    const taskToEdit = tasks.find(task => task.id === id);
    setEditTaskText(taskToEdit.title);
  };

  // Fonction pour mettre à jour une tâche après l'édition
  const handleUpdateTask = (id, updatedTitle) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, title: updatedTitle } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  // Fonction pour basculer l'état d'accomplissement d'une tâche
  const handleToggleTask = id => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Fonction pour changer le filtre d'afichage des tâches
  const handleFilterChange = filter => {
    setFilter(filter);
  };

  // Filtrage des tâches en fonction du filtre sélectionner
  let filteredTasks = tasks;

  if (filter === 'En cours') {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (filter === 'Terminées') {
    filteredTasks = tasks.filter(task => task.completed);
  }
  // Affichage utilisateur
  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h1 className="card-title text-center mb-4">Liste des tâches</h1>
            <AddTaskForm onAdd={handleAddTask} />
            <hr />
            <div className="mb-3 d-flex justify-content-center">
              <button
                className={`btn me-2 ${filter === 'Toutes' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => handleFilterChange('Toutes')}
              >
                Toutes
              </button>
              <button
                className={`btn me-2 ${filter === 'En cours' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => handleFilterChange('En cours')}
              >
                En cours
              </button>
              <button
                className={`btn ${filter === 'Terminées' ? 'btn-warning' : 'btn-outline-warning'}`}
                onClick={() => handleFilterChange('Terminées')}
              >
                Terminées
              </button>
            </div>
            <TaskList
              tasks={filteredTasks}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              onToggle={handleToggleTask}
            />
              {editingTask !== null && (
                <EditTaskForm
                  task={tasks.find(task => task.id === editingTask)}
                  onUpdate={handleUpdateTask}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
