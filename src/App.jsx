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

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
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
            className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-400 dark:bg-gray-700"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-2 py-2 border rounded-lg dark:bg-gray-700"
          >
            <option value="High">🔥 High</option>
            <option value="Medium">⚖️ Medium</option>
            <option value="Low">🟢 Low</option>
          </select>

          <button
            onClick={addTask}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-3">
          {sortedTasks.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No tasks yet 🎉</p>
          ) : (
            sortedTasks.map((task) => (
              <li
                key={task.id}
                className={`flex justify-between items-center p-3 rounded-lg shadow-sm ${
                  task.completed ? "line-through opacity-60 bg-green-100 dark:bg-green-800" : "bg-gray-50 dark:bg-gray-700"
                }`}
              >
                {editingId === task.id ? (
                  <div className="flex gap-2 w-full">
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
                      className="flex-grow px-2 py-1 border rounded-lg dark:bg-gray-600"
                    />
                    <button
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      onClick={() => saveEdit(task.id)}
                    >
                      💾 Save
                    </button>
                  </div>
                ) : (
                  <>
                    <span
                      onClick={() => toggleComplete(task.id)}
                      className="cursor-pointer flex-grow"
                    >
                      {task.title}
                    </span>
                    <span
                      className={`ml-3 px-2 py-1 text-xs font-bold rounded-lg ${
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
                        className="px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        onClick={() => startEditing(task.id, task.title)}
                      >
                        ✏️
                      </button>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        onClick={() => deleteTask(task.id)}
                      >
                        ✖
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          )}
        </ul>

        {/* Footer */}
        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          {tasks.filter((t) => t.completed).length} of {tasks.length} tasks completed
        </p>
      </div>
    </div>
  );
}

export default App;
