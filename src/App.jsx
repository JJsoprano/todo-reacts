import React, { useState } from "react";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Low");

  const addTask = () => {
    if (!text.trim()) return;
    const newTask = {
      id: Date.now(),
      text,
      priority,
      completed: false
    };
    setTasks([...tasks, newTask]);
    setText("");
    setPriority("Low");
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="app-container">
      <h1>My Todo App</h1>

      <div className="task-form">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a task..."
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button onClick={addTask}>Add</button>
      </div>

      {tasks.map((task) => (
        <div key={task.id} className="task">
          <div>
            <span
              className="task-text"
              style={{ textDecoration: task.completed ? "line-through" : "none" }}
            >
              {task.text}
            </span>
            <span className="task-priority">({task.priority})</span>
          </div>
          <div className="task-buttons">
            <button className="complete" onClick={() => toggleComplete(task.id)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button className="delete" onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
