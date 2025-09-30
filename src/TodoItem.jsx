import React from "react";

function TodoItem({ todo, handleDelete, handleToggle }) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <span className="todo-text">{todo.name}</span>
      <span className="priority">[{todo.priority}]</span>
      <div>
        <button className="complete-btn" onClick={() => handleToggle(todo.id)}>
          {todo.completed ? "Undo" : "Complete"}
        </button>
        <button className="delete-btn" onClick={() => handleDelete(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
