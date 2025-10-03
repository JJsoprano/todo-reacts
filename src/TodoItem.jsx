import React, { useState } from "react";
import PropTypes from "prop-types";

function TodoItem({ todo, handleDelete, handleToggle, handleEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.name);

  const saveEdit = () => {
    if (editText.trim() !== "") {
      handleEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
          />
          <button onClick={saveEdit} className="save-btn">Save</button>
          <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
        </>
      ) : (
        <>
          <span className="todo-text">{todo.name}</span>
          <span className="priority">[{todo.priority}]</span>
          <div>
            <button className="complete-btn" onClick={() => handleToggle(todo.id)}>
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => handleDelete(todo.id)}>
              Delete
            </button>
          </div>
        </>
      )}
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
  handleEdit: PropTypes.func.isRequired,
};

export default TodoItem;
