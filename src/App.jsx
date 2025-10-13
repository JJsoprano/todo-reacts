import { useState, useEffect } from "react";
import './app.css';
import todoAPI from './api/todoAPI';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load todos from API on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError("");
      const todos = await todoAPI.fetchTodos();
      setTasks(todos);
    } catch (error) {
      setError("Failed to load todos. Please make sure the backend server is running.");
      console.error("Failed to load todos:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Adds a new task to the list of tasks using the API.
   * If the input is empty, nothing happens.
   * Creates a new task object with the current input and priority.
   * Adds the new task to the beginning of the list.
   * Resets the input to an empty string after adding the task.
   */
  const addTask = async () => {
    if (input.trim() === "") return;
    
    try {
      setLoading(true);
      setError("");
      const newTodo = await todoAPI.createTodo(input.trim(), priority);
      setTasks([newTodo, ...tasks]);
      setInput("");
    } catch (error) {
      setError("Failed to add todo. Please try again.");
      console.error("Failed to add todo:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Toggles the completed status of a task with the given id using the API.
   * If the task with the given id exists, its completed status will be flipped.
   * If the task with the given id does not exist, nothing happens.
   */
  const toggleTask = async (id) => {
    try {
      const task = tasks.find(t => t._id === id);
      const updatedTodo = await todoAPI.updateTodo(id, { 
        completed: !task.completed 
      });
      
      setTasks(tasks.map((task) =>
        task._id === id ? updatedTodo : task
      ));
    } catch (error) {
      setError("Failed to update todo. Please try again.");
      console.error("Failed to toggle todo:", error);
    }
  };

  /**
   * Removes a task with the given id from the list using the API.
   * If the task with the given id exists, it will be removed from the list.
   * If the task with the given id does not exist, nothing happens.
   * @param {number|string} id - the id of the task to be removed
   */
  const removeTask = async (id) => {
    try {
      await todoAPI.deleteTodo(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      setError("Failed to delete todo. Please try again.");
      console.error("Failed to delete todo:", error);
    }
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
   * Saves the edited task with the given id using the API.
   * Updates the task with the given id to have the text of the editText state.
   * Resets the editingId and editText states to null and an empty string respectively.
   * @param {number|string} id - the id of the task to be saved
   */
  const saveEdit = async (id) => {
    if (editText.trim() === "") return;
    
    try {
      const updatedTodo = await todoAPI.updateTodo(id, { 
        text: editText.trim() 
      });
      
      setTasks(tasks.map((task) =>
        task._id === id ? updatedTodo : task
      ));
      setEditingId(null);
      setEditText("");
    } catch (error) {
      setError("Failed to update todo. Please try again.");
      console.error("Failed to save edit:", error);
    }
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

        {/* Error Message */}
        {error && (
          <div className="error-message" style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            fontSize: '0.875rem'
          }}>
            {error}
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="loading" style={{
            textAlign: 'center',
            color: '#6b7280',
            padding: '0.5rem'
          }}>
            Loading...
          </div>
        )}

        {/* Input Section */}
        <div className="task-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">🔥 High</option>
            <option value="Medium">⚖️ Medium</option>
            <option value="Low">💧 Low</option>
          </select>
          <button onClick={addTask} disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </button>
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
            <li key={task._id} className={task.completed ? "completed" : ""}>
              {editingId === task._id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && saveEdit(task._id)}
                  />
                  <button onClick={() => saveEdit(task._id)}>Save</button>
                  <button onClick={() => {setEditingId(null); setEditText("");}}>Cancel</button>
                </>
              ) : (
                <>
                  <div className="task-content">
                    <span className="task-text">{task.text}</span>
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                  </div>

                  <button onClick={() => toggleTask(task._id)}>
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button onClick={() => startEdit(task._id, task.text)}>
                    Edit
                  </button>
                  <button onClick={() => removeTask(task._id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>

        {/* Empty state */}
        {!loading && tasks.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: '#6b7280',
            padding: '2rem',
            fontStyle: 'italic'
          }}>
            No todos yet. Add one above! 👆
          </div>
        )}

        {/* Footer */}
        <div className="footer">
          {tasks.filter((t) => t.completed).length} of {tasks.length} tasks done
        </div>
      </div>
    </div>
  );
}

export default App;
