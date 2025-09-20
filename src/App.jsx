import { useState, useEffect } from 'react' //** this is the hook */
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse tasks from localStorage:', e);
      return [];
    }
  });

  const [newTask, setNewTask] = useState('');

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  /**
   * Add a new task to the list and reset the input field.
   * 
   * This function is called whenever the user presses Enter in the input field.
   * It will only add a new task if the input field is not empty.
   * The new task is added to the end of the list and gets a unique id.
   * The input field is cleared after adding the task.
   */
  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  /**
   * Toggle the completion status of a task.
   *
   * This function takes a task id and toggles its 'completed' state.
   * If the task is marked as completed, it becomes incomplete and vice versa.
   *
   * @param {number} id - The unique identifier of the task to be toggled.
   */

/**
 * Toggle the completion status of a task.
 *
 * This function takes a task id and toggles its 'completed' state.
 * If the task is marked as completed, it becomes incomplete and vice versa.
 *
 * @param {number} id - The unique identifier of the task to be toggled.
 */

  const toggleComplete = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  /**
   * Deletes a task from the list.
   *
   * This function takes a task id and removes the task with that id from the list.
   * It works by filtering the tasks array and returning a new array with all tasks that
   * do not match the given id.
   *
   * @param {number} id - The unique identifier of the task to be deleted.
   */
  const deleteTask = (id) => {
    // Filter the tasks array and return a new array without the task with the given id
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="App">
      <h1>📝 My Todo List</h1>
      <div className="input-area">
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <div className="todo-input">
      <input type="text" placeholder="Add a task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button onClick={addTask}>Add</button>
      </div>

      <ul>
{tasks.map((task) => (
  <li key={task.id}>
    <div>
      <span
        onClick={() => toggleComplete(task.id)}
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          cursor: 'pointer'
        }}
      >
        {task.title}
      </span>
      <button onClick={() => deleteTask(task.id)} className="delete-btn">❌</button>
      <footer className="footer">
        <p>{tasks.filter(t => t.completed).length} of {tasks.length} tasks completed</p>
      </footer>
    </div>
  </li>
))}
      </ul>
    </div>
  );
}

export default App;
