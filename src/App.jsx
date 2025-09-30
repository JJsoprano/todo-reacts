import React, { useState } from "react";
import "./App.css";
import TodoItem from "./TodoItem";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");

  const addTodo = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), name: task, priority, completed: false },
    ]);
    setTask("");
    setPriority("Medium");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "Completed") return todo.completed;
    if (filter === "Active") return !todo.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="app-container">
      <h1>My To-Do List</h1>
      <form className="add-task-form" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <div className="filter-buttons">
        <button
          className={filter === "All" ? "active" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={filter === "Active" ? "active" : ""}
          onClick={() => setFilter("Active")}
        >
          Active
        </button>
        <button
          className={filter === "Completed" ? "active" : ""}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
      </div>

      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
          />
        ))}
      </ul>

      <div className="completed-count">
        Completed: {completedCount} / {todos.length}
      </div>
    </div>
  );
}

export default App;
