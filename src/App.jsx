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
  const [priority, setPriority] = useState("Medium"); // 👈 new state for priority
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
      priority: priority, // 👈 add priority to task
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
const priorityOrder = ["High", "Medium", "Low"];
const sortedTasks = [...tasks].sort(
  (a, b) => priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
);

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <div className="todo-card">
        <div className="header">
          <h1>📝 My Todo List</h1>
          <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />

          {/* 👇 New Priority Dropdown */}
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">🔥 High</option>
            <option value="Medium">⚖️ Medium</option>
            <option value="Low">🟢 Low</option>
          </select>

          <button onClick={addTask}>Add</button>
        </div>

        <ul className="task-list">
          {sortedTasks.length === 0 ? (
            <p className="empty">No tasks yet 🎉</p>
          ) : (
            sortedTasks.map((task) => (
              <li key={task.id} className={task.completed ? "completed" : ""}>
                {editingId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && saveEdit(task.id)}
                    />
                    <button className="save" onClick={() => saveEdit(task.id)}>
                      💾 Save
                    </button>
                  </>
                ) : (
                  <>
                    <span onClick={() => toggleComplete(task.id)}>
                      {task.title}
                    </span>

                    {/* 👇 Show Priority */}
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>

                    <div className="task-actions">
                      <button
                        className="edit"
                        onClick={() => startEditing(task.id, task.title)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="delete"
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

        <p className="footer">
          {tasks.filter((t) => t.completed).length} of {tasks.length} tasks
          completed
        </p>
      </div>
    </div>
  );
}

export default App;
