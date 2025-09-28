import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Save tasks and dark mode to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
      priority: priority,
    };
    setTasks([...tasks, task]);
    setNewTask("");
    setPriority("Medium"); // reset dropdown
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (id, title) => {
    setEditingId(id);
    setEditingText(title);
  };

  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: editingText } : task
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  // Sort by priority (High > Medium > Low)
  const priorityOrder = ["High", "Medium", "Low"];
  const sortedTasks = [...tasks].sort(
    (a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
  );

  // Filter tasks based on filterStatus
  const filteredTasks = sortedTasks.filter((task) => {
    if (filterStatus === "active") {
      return !task.completed;
    }
    if (filterStatus === "completed") {
      return task.completed;
    }
    return true; // "all"
  });

  // Helper component for the filter buttons
  const FilterButton = ({ status, children }) => (
    <button
      onClick={() => setFilterStatus(status)}
      // UPDATED STYLE: Smaller text (text-xs) and reduced padding (py-0.5 px-2)
      className={`py-0.5 px-2 rounded-full text-xs font-medium transition-colors ${
        filterStatus === status
          ? "bg-indigo-600 text-white"
          : "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
      }`}
    >
      {children}
    </button>
  );

  return (
    // Assuming you want the background of the body to be the space image
    // I'll keep the background neutral, but you can adjust your global CSS to match the image.
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      
      {/* This is the inner 'black/white' window */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            📝 My Todo List
          </h1>
          <button
            className="px-3 py-1 rounded-lg text-sm bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Input Section */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-400 dark:bg-gray-700 dark:border-gray-600"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-2 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="High">🔥 High</option>
            <option value="Medium">⚖️ Medium</option>
            <option value="Low">🟢 Low</option>
          </select>

          <button
            onClick={addTask}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Add
          </button>
        </div>

        {/* FILTER SECTION MOVED HERE (into the inner container) */}
        <div className="flex gap-3 mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
          <FilterButton status="all">All ({tasks.length})</FilterButton>
          <FilterButton status="active">Active ({tasks.filter(t => !t.completed).length})</FilterButton>
          <FilterButton status="completed">Completed ({tasks.filter(t => t.completed).length})</FilterButton>
        </div>

        {/* Task List */}
        <ul className="space-y-3">
          {(() => {
            let content;
            if (filteredTasks.length === 0 && tasks.length > 0 && filterStatus !== "all") {
              content = <p className="text-gray-500 dark:text-gray-400">No {filterStatus} tasks found!</p>;
            } else if (filteredTasks.length === 0 && tasks.length === 0) {
              content = <p className="text-gray-500 dark:text-gray-400">No tasks yet 🎉</p>;
            } else {
              content = filteredTasks.map((task) => {
                let priorityClass = "";
                if (task.priority === "High") {
                  priorityClass = "bg-red-500 text-white";
                } else if (task.priority === "Medium") {
                  priorityClass = "bg-yellow-400 text-black";
                } else {
                  priorityClass = "bg-green-500 text-white";
                }
                return (
                  <li
                    key={task.id}
                    className={`flex justify-between items-center p-2 rounded-xl shadow-md transition-all duration-200 ${
                      task.completed ? "line-through opacity-60 bg-green-100 dark:bg-green-800" : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                {editingId === task.id ? (
                  // ... (Editing mode remains the same)
                  <div className="flex gap-2 w-full">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
                      className="flex-grow px-2 py-1 border rounded-lg dark:bg-gray-600 dark:border-gray-500 text-gray-900 dark:text-white"
                      autoFocus
                    />
                    <button
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      onClick={() => saveEdit(task.id)}
                    >
                      💾 Save
                    </button>
                  </div>
                ) : (
                  // Display mode with new Checkbox
                  <div className="flex items-center flex-grow">
                    {/* NEW CHECKBOX ELEMENT */}
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                      className="h-5 w-5 mr-3 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                    />

                    {/* Task Title - Removed onClick, now the checkbox handles it */}
                    <span
                      className={`ml-3 px-2 py-1 text-xs font-bold rounded-lg whitespace-nowrap ${priorityClass}`}
                    >
                      {task.priority}
                    </span>
                    <span
                      className={`ml-3 px-2 py-1 text-xs font-bold rounded-lg whitespace-nowrap ${
                        task.priority === "High"
                          ? "bg-red-500 text-white"
                          : task.priority === "Medium"
                          ? "bg-yellow-400 text-black"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {task.priority}
                    </span>
                    <div className="ml-3 flex gap-2">
                      <button
                        className="p-2 text-white rounded-full hover:opacity-80 transition-opacity bg-blue-500"
                        onClick={() => startEditing(task.id, task.title)}
                        aria-label="Edit Task"
                      >
                        ✏️
                      </button>
                      <button
                        className="p-2 text-white rounded-full hover:opacity-80 transition-opacity bg-red-500"
                                onClick={() => deleteTask(task.id)}
                                aria-label="Delete Task"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        )}
                      </li>
                        );
                      });
                    }
                    return content;
                  })()}
                </ul>
              </div>
            </div>
          );
        }
        
        export default App;