import React from "react";
import PropTypes from "prop-types";

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

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    priority: PropTypes.string,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
};

export default TodoItem;
