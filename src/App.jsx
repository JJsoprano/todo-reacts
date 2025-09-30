import React, { useState } from 'react';

// --- TodoItem Component Definition (Inline for Single File) ---
const TodoItem = ({ todo, handleDelete, handleComplete, handleEdit }) => {
  const getPriorityClasses = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-700 ring-red-200';
      case 'Medium':
        return 'bg-yellow-50 text-yellow-700 ring-yellow-200';
      case 'Low':
      default:
        return 'bg-green-50 text-green-700 ring-green-200';
    }
  };

  return (
    <li
      className={`
        flex items-center justify-between p-3 mb-3 rounded-xl shadow-lg
        bg-white transition duration-300 ring-2 
        ${todo.completed ? 'opacity-70 ring-teal-200' : 'ring-teal-100'}
        list-none
      `}
    >
      {/* Task Name Button - Click to potentially select or view details (currently toggles complete) */}
      <button
        onClick={() => handleComplete(todo.id)} // Renamed from handleToggle
        className="flex-1 flex flex-col items-start p-2 rounded-lg text-left transition duration-150 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 mr-2 min-w-0"
      >
        <span
          className={`text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-full self-start mb-1 
            ${getPriorityClasses(todo.priority)}`}
        >
          {todo.priority}
        </span>
        <span
          className={`text-lg font-medium text-gray-800 break-words ${todo.completed ? 'line-through text-gray-500' : ''} list-none`}
        >
          {todo.name}
        </span>
      </button>

      {/* Action Buttons */}
      <div className="flex space-x-1 shrink-0">
        {/* Complete Button (Checkmark) */}
        <button
          onClick={() => handleComplete(todo.id)} // Renamed from handleToggle
          className={`p-2 rounded-lg transition duration-150 ease-in-out shadow-sm
            ${todo.completed 
              ? 'bg-teal-600 text-white hover:bg-teal-700' 
              : 'bg-teal-50 text-teal-600 hover:bg-teal-100'
            }`}
          title={todo.completed ? 'Mark Active' : 'Mark Complete'}
        >
          {/* Checkmark Icon (Lucide check/rotate-ccw) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {todo.completed ? (
              <path d="M12 2v4M17.66 6.34l-2.83 2.83M22 12h-4M17.66 17.66l-2.83-2.83M12 22v-4M6.34 17.66l2.83-2.83M2 12h4M6.34 6.34l2.83 2.83"/> 
            ) : (
              <path d="M20 6 9 17l-5-5" />
            )}
          </svg>
        </button>

        {/* Edit Button */}
        <button
          onClick={() => handleEdit(todo.id, todo.name)}
          className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition duration-150 ease-in-out shadow-sm"
          title="Edit Task"
        >
          {/* Edit Icon (Lucide pencil) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
        </button>

        {/* Delete Button */}
        <button
          onClick={() => handleDelete(todo.id)}
          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition duration-150 ease-in-out shadow-sm"
          title="Delete Task"
        >
          {/* Trash Icon (Lucide trash) */}
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" />
          </svg>
        </button>
      </div>
    </li>
  );
};
// --- End TodoItem Component ---

const INITIAL_TASKS = [
  { id: 1, name: 'Finish React Refactor', priority: 'High', completed: false },
  { id: 2, name: 'Buy groceries (Milk, Eggs)', priority: 'Medium', completed: false },
  { id: 3, name: 'Deploy to GitHub Pages (Done!)', priority: 'Low', completed: true },
];

function App() {
  const [todos, setTodos] = useState(INITIAL_TASKS);
  const [filter, setFilter] = useState('All');
  const [newTask, setNewTask] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');

  // Helper function to sort tasks by priority (High > Medium > Low)
  const sortTodos = (tasks) => {
    const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
    
    // Sort logic: first by priority (descending), then by ID (to maintain stable order)
    return [...tasks].sort((a, b) => {
      const orderA = priorityOrder[a.priority] || 0;
      const orderB = priorityOrder[b.priority] || 0;

      if (orderA !== orderB) {
        return orderB - orderA; // Descending priority
      }
      return a.id - b.id; // Stable secondary sort
    });
  };

  // --- Filtering and Sorting ---
  const filteredTodos = sortTodos(
    todos.filter(todo => {
      if (filter === 'Active') return !todo.completed;
      if (filter === 'Completed') return todo.completed;
      return true;
    })
  );

  // --- Edit task ---
  const handleEdit = () => {
    // In a real app, this would open a modal/input field.
  };


  // --- Delete task ---
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // --- Complete/Toggle task ---
  const handleComplete = (id) => { // Renamed from handleToggle
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // --- Add new task ---
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      name: newTask.trim(),
      priority: newPriority,
      completed: false,
    };
    // FIX: Correctly uses setTodos to update the state array
    setTodos([...todos, newTodo]);
    setNewTask('');
  };

  return (
    // Added inline style for immediate visual feedback, in case Tailwind classes fail to load externally.
    <div className="min-h-screen bg-teal-50 p-4 sm:p-6 lg:p-8" style={{ backgroundColor: '#f0fdfa' }}> 
      <div className="app-container max-w-xl mx-auto p-6 bg-white rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-teal-800 mb-6 text-center">Modern Task Manager</h1>

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mb-6">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
          />
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
            className="p-3 border border-gray-300 rounded-xl"
          >
            <option value="Medium">⚖️ Medium</option>
            <option value="High">🔥 High</option>
            <option value="Low">💧 Low</option>
          </select>
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700 shadow-md transition duration-150"
          >
            Add
          </button>
        </form>

        {/* Filter Buttons */}
        <div className="flex space-x-2 mb-6">
          <button
            className={`px-4 py-2 rounded-xl text-sm font-medium transition duration-150 ${filter === 'All' ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setFilter('All')}
          >
            All ({todos.length})
          </button>
          <button
            className={`px-4 py-2 rounded-xl text-sm font-medium transition duration-150 ${filter === 'Active' ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setFilter('Active')}
          >
            Active ({todos.filter(t => !t.completed).length})
          </button>
          <button
            className={`px-4 py-2 rounded-xl text-sm font-medium transition duration-150 ${filter === 'Completed' ? 'bg-teal-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setFilter('Completed')}
          >
            Completed ({todos.filter(t => t.completed).length})
          </button>
        </div>

        {/* Todo Items List */}
        <ul className="todo-list list-none p-0 space-y-3">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDelete={handleDelete}
              handleComplete={handleComplete} // Renamed prop
              handleEdit={handleEdit}
            />
          ))}
        </ul>

        {/* Completed Count */}
        <div className="text-gray-600 mt-6 text-center text-sm">
          {todos.filter(t => t.completed).length} of {todos.length} tasks completed. Great job!
        </div>
      </div>
    </div>
  );
}

export default App;
