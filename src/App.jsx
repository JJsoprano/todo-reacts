import { useState } from "react";
import "./App.css"; // custom styles

/**
 * App component, responsible for rendering the entire Todo List app.
 * Manages state for tasks, input, priority, filter, editingId, and editText.
 * Renders an input section, filter buttons, task list, and footer.
 * Handles functions for adding, toggling, removing, starting edit, and saving edits for tasks.
 */
function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  /**
   * Adds a new task to the list of tasks.
   * If the input is empty, nothing happens.
   * Creates a new task object with the current input, priority, and completed status.
   * Adds the new task to the list of tasks.
   * Resets the input to an empty string after adding the task.
   */
  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([
      ...tasks,
      {
        id: Date.now() + Math.random(),
        text: input,
        priority,
        completed: false,
      },
    ]);
    setInput("");
  };

  /**
   * Toggles the completed status of a task with the given id.
   * If the task with the given id exists, its completed status will be flipped.
   * If the task with the given id does not exist, nothing happens.
   */
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /**
   * Removes a task with the given id from the list of tasks.
   * If the task with the given id exists, it will be removed from the list.
   * If the task with the given id does not exist, nothing happens.
   * @param {number|string} id - the id of the task to be removed
   */
  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  /**
   * Starts editing a task with the given id and text.
   * The editingId state will be set to the given id, and the editText state will be set to the given text.
   * @param {number|string} id - the id of the task to start editing
   * @param {string} text - the text of the task to start editing
   */
  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  /**
   * Saves the edited task with the given id.
   * Updates the task with the given id to have the text of the editText state.
   * Resets the editingId and editText states to null and an empty string respectively.
   * @param {number|string} id - the id of the task to be saved
   */
  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: editText } : task))
    );
    setEditingId(null);
    setEditText("");
  };

  // Filtered list
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <div className="todo-card">
        <h1>📝 My Todo List</h1>

        {/* Input Section */}
        <div className="task-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">🔥 High</option>
            <option value="Medium">⚖️ Medium</option>
            <option value="Low">💧 Low</option>
          </select>
          <button onClick={addTask}>Add</button>
        </div>

        {/* Filter Buttons */}
        <div className="filters">
          {["All", "Active", "Completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={filter === f ? "active" : ""}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task List */}
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              {editingId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => saveEdit(task.id)}>Save</button>
                </>
              ) : (
                <>
                  <div className="task-content">
                    <span className="task-text">{task.text}</span>
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </div>
                  <button onClick={() => toggleTask(task.id)}>
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button onClick={() => startEdit(task.id, task.text)}>
                    Edit
                  </button>
                  <button onClick={() => removeTask(task.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="footer">
          {tasks.filter((t) => t.completed).length} of {tasks.length} tasks done
        </div>
      </div>
    </div>
  );
}

export default App;
