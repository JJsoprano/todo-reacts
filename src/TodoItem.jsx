import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * A TodoItem component to render a single todo item in the todo list.
 *
 * @param {Object} todo - The todo object to be rendered.
 * @param {Function} handleDelete - The function to call when the delete button is clicked.
 * @param {Function} handleToggle - The function to call when the complete button is clicked.
 * @param {Function} handleEdit - The function to call when the edit button is clicked.
 *
 * @returns {ReactElement} A ReactElement representing the rendered todo item.
 */
function TodoItem({ todo, handleDelete, handleToggle, handleEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);

  const saveEdit = () => {
    if (editValue.trim() !== "") {
      handleEdit(todo.id, editValue);
      setIsEditing(false);
    }
  };

  return (
    <li className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg shadow">
      <div className="flex flex-col">
        {isEditing ? (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="border rounded px-2 py-1"
          />
        ) : (
          <span
            className={`${
              todo.completed ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {todo.text}
          </span>
        )}
        <span className="text-xs text-gray-500">Priority: {todo.priority}</span>
      </div>

      <div className="flex gap-2">
        {isEditing ? (
          <button
            onClick={saveEdit}
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
          >
            Save
          </button>
        ) : (
          <>
            <button
              onClick={() => handleToggle(todo.id)}
              className="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600"
            >
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
          </>
        )}
        <button
          onClick={() => handleDelete(todo.id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    priority: PropTypes.string,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default TodoItem;
