import React from "react";
import PropTypes from "prop-types";

function TodoItem({ todo, handleDelete, handleToggle, handleEdit }) {
  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <span className="todo-text">{todo.name}</span>
      <span className="priority">[{todo.priority}]</span>
      <div className="actions">
        <button className="complete-btn" onClick={() => handleToggle(todo.id)}>
          {todo.completed ? "Undo" : "Complete"}
        </button>
        <button className="edit-btn" onClick={() => handleEdit(todo.id)}>
          Edit
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
  handleEdit: PropTypes.func.isRequired, // added for edit
};

export default TodoItem;
