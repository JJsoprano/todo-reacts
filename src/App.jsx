import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([{ text: "stuff", completed: false }]);
  const [newTask, setNewTask] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
          <span>📝</span> My Todo List
        </h1>

        {/* Add Task Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-3">
          {tasks
            .filter((task) => (showCompleted ? true : !task.completed))
            .map((task, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-3 rounded-lg shadow-sm ${
                  task.completed ? "bg-green-100 line-through text-gray-500" : "bg-gray-50"
                }`}
              >
                {task.text}
                <button
                  onClick={() => toggleComplete(index)}
                  className="text-sm px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
              </li>
            ))}
        </ul>

        {/* Footer */}
        <div className="mt-6 flex justify-between items-center text-sm text-gray-600">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="text-indigo-500 hover:underline"
          >
            {showCompleted ? "Hide Completed" : "Show Completed"}
          </button>
          <span>
            {tasks.filter((t) => t.completed).length} of {tasks.length} tasks completed
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
