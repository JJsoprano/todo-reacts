import React, { useState } from 'react';
import PropTypes from 'prop-types';

// --- DUMMY DATA ---
const INITIAL_TASKS = [
  { id: 1, name: 'Finish React Refactor', priority: 'High', completed: false },
  { id: 2, name: 'Buy groceries (Milk, Eggs)', priority: 'Medium', completed: false },
  { id: 3, name: 'Deploy to GitHub Pages (Done!)', priority: 'Low', completed: true },
];

const TodoItem = ({ todo, handleDelete, handleToggleComplete, handleEdit }) => {
  const priorityColors = {
    High: 'bg-red-50 text-red-700 border-red-300',
    Medium: 'bg-yellow-50 text-yellow-700 border-yellow-300',
    Low: 'bg-green-50 text-green-700 border-green-300',
  };

  const priorityClass = priorityColors[todo.priority] || 'bg-gray-50 text-gray-700 border-gray-300';
  
  return (
    // Key Change: Ensure all list item styling (padding, margin, shadow) is here
    <li
      className={`
        flex items-center justify-between p-4 mb-3 rounded-xl transition duration-200 ease-in-out 
        ${todo.completed 
          ? 'bg-gray-50 opacity-60 shadow-inner' 
          : 'bg-white shadow-lg hover:shadow-xl'
        }`}
      tabIndex={-1}
      aria-label={`Task: ${todo.name}`}
      data-task-id={todo.id}
    >
      
      {/* Task Content: Displays Priority and Name */}
      <div 
        className="flex-1 min-w-0 mr-4"
      >
        <div className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block border ${priorityClass}`}>
          {todo.priority}
        </div>

        <p className={`mt-1 text-gray-800 font-medium text-lg ${
            todo.completed ? 'line-through text-gray-500' : ''
        }`}>
          {todo.name}
        </p>
      </div>
        {/* Actions: Complete, Edit, Delete */}
        <div className="flex space-x-2 flex-shrink-0">
          {/* 1. Complete/Uncomplete Button */}
          <button
            onClick={() => handleToggleComplete(todo.id)}
            className={`p-2 rounded-lg transition duration-150 shadow-md ${
              todo.completed 
                ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' // Unmark Complete
                : 'bg-green-500 text-white hover:bg-green-600' // Mark Complete
            }`}
            title={todo.completed ? "Mark as Active" : "Mark as Completed"}
          >
            {/* Checkmark Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          {/* 2. Edit Button */}
          <button
            onClick={() => handleEdit(todo.id)}
            className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition duration-150 shadow-md"
            title="Edit Task"
          >
            {/* Pencil Icon (Edit) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.182 3.182l-.793.793-2.828-2.828.793-.793 2.828 2.828zm-4.243 4.243l4.243 4.243 4.243-4.243-4.243-4.243-4.243 4.243z"/>
            </svg>
          </button>
          
          {/* 3. Delete Button */}
          <button
            onClick={() => handleDelete(todo.id)}
            className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition duration-150 shadow-md"
            title="Delete Task"
          >
            {/* Trash Icon (Delete) */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V8z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </li>
    );
};

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleToggleComplete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  // Add id prop validation if TodoItem ever receives id directly (not just via todo)
  // id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
// --- Main App Component ---
// (Removed duplicate empty App declaration)


// --- Main App Component ---
const App = () => {
  const [todos, setTodos] = useState(INITIAL_TASKS);
  const [filter, setFilter] = useState('All'); 
  const [newTaskName, setNewTaskName] = useState('');
  const [newPriority, setNewPriority] = useState('Medium'); 

  // --- Utility Functions ---
  const handleToggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const handleEdit = (id) => {
    // Placeholder for real edit logic (e.g., open a modal)
    console.log(`Editing task ${id}`);
    const task = todos.find(t => t.id === id);
    if (task) {
      // Using a custom dialog or prompt would replace the alert() in a production environment.
      alert(`Editing functionality for task: ${task.name} (ID: ${id}) would open here.`);
    }
  }

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskName.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      name: newTaskName.trim(),
      priority: newPriority, // This is correctly set from the dropdown
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTaskName('');
  };

  // --- Filtering Logic ---
  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true; // 'All'
  });

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;
  
  const FilterButton = ({ label, currentFilter, count }) => (
    <button
      onClick={() => setFilter(label)}
      className={`px-3 py-1 text-sm font-medium rounded-full transition duration-150 whitespace-nowrap ${
        currentFilter === label 
          ? 'bg-indigo-600 text-white shadow-md' 
          : 'bg-gray-100 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
      }`}
    >
      {label} ({count})
    </button>
  );

  return (
    // New Color Palette: Light teal background (50) with high-contrast card (white)
    <div className="min-h-screen bg-teal-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* Main Container: Centered and responsive width */}
      <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-teal-200">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Modern Task Manager
        </h1>

        {/* --- Add Task Form --- */}
        <form onSubmit={handleAddTask} className="flex flex-col space-y-3 mb-6">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-700 focus:ring-teal-500 focus:border-teal-500 transition duration-150"
          />
          
          <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
            {/* Priority Selection is correctly handled here */}
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl appearance-none text-gray-700 focus:ring-teal-500 focus:border-teal-500 flex-1"
            >
              <option value="High">🔥 High Priority</option>
              <option value="Medium">⚖️ Medium Priority</option>
              <option value="Low">💧 Low Priority</option>
            </select>

            <button 
              type="submit" 
              className="w-full sm:w-auto px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition duration-150 shadow-lg"
            >
              Add Task
            </button>
          </div>
        </form>

        {/* --- Filter Buttons --- */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <FilterButton label="All" currentFilter={filter} count={todos.length} />
          <FilterButton label="Active" currentFilter={filter} count={activeCount} />
          <FilterButton label="Completed" currentFilter={filter} count={completedCount} />
        </div>

        {/* --- Todo List --- */}
        <ul className="todo-list list-none p-0">
          {filteredTodos.length > 0 ? (
            filteredTodos.map(todo => (
              <TodoItem 
                key={todo.id} 
                todo={todo} 
                handleDelete={handleDelete}
                handleToggleComplete={handleToggleComplete}
                handleEdit={handleEdit}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No tasks found for this filter. Time to relax!</p>
          )}
        </ul>
        
        {/* --- Completed Count Summary --- */}
        <div className="mt-8 text-center text-sm font-medium text-gray-600">
          {completedCount} of {todos.length} tasks completed. Great job!
        </div>
      </div>
    </div>
  );
};

export default App;