import React, { useState } from 'react';
// Import your individual TaskItem component (where the layout change happened)
import TaskItem from './TaskItem'; 
import './App.css'; // Assuming you have a main stylesheet

// --- DUMMY DATA ---
const INITIAL_TASKS = [
  { id: 1, name: 'bedMedium', priority: 'Medium', completed: false },
  { id: 2, name: 'taskMedium', priority: 'Medium', completed: false },
  { id: 3, name: 'stuffMedium', priority: 'Medium', completed: true },
];
// ------------------

function App() {
  const [todos, setTodos] = useState(INITIAL_TASKS);
  const [filter, setFilter] = useState('All'); // 'All', 'Active', 'Completed'
  const [newTask, setNewTask] = useState('');
  const [newPriority, setNewPriority] = useState('Medium'); // To match your UI dropdown

  // --- Filtering Logic ---
  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true; // 'All'
  });

  // --- Placeholder for CRUD functions (Delete is used in TaskItem) ---
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // --- Logic to handle form submission (Add button) ---
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      name: newTask.trim(),
      priority: newPriority,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTask('');
  };

  // --- JSX Rendering ---
  return (
    <div className="app-container">
      <h1>Todo List</h1>

      {/* Input and Add Section */}
      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        
        {/* Priority Dropdown (matching your UI) */}
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
        >
          <option value="Medium">⚖️ Medium</option>
          <option value="High">🔥 High</option>
          <option value="Low">💧 Low</option>
        </select>

        <button type="submit" className="add-button">Add</button>
      </form>

      {/* Filter Buttons Section */}
      <div className="filter-buttons">
        <button 
          className={filter === 'All' ? 'active' : ''} 
          onClick={() => setFilter('All')}
        >
          All ({todos.length})
        </button>
        <button 
          className={filter === 'Active' ? 'active' : ''} 
          onClick={() => setFilter('Active')}
        >
          Active ({todos.filter(t => !t.completed).length})
        </button>
        <button 
          className={filter === 'Completed' ? 'active' : ''} 
          onClick={() => setFilter('Completed')}
        >
          Completed ({todos.filter(t => t.completed).length})
        </button>
      </div>

      {/* Main List Rendering Section */}
      <ul className="todo-list">
        {filteredTodos.map(todo => (
          <TaskItem 
            key={todo.id} 
            todo={todo} 
            handleDelete={handleDelete}
            // Add other props like handleEdit, handleToggle if you implement them
          />
        ))}
      </ul>
      
      {/* Completed Count (matching your UI) */}
      <div className="completed-count">
        {todos.filter(t => t.completed).length} of {todos.length} tasks completed
      </div>
    </div>
  );
}

export default App;