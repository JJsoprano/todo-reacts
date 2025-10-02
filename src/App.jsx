import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All"); // 👈 filter state

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([...tasks, { text: input, completed: false }]);
    setInput("");
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // 👇 filter logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Active") return !task.completed;
    if (filter === "Completed") return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white shadow-2xl rounded-xl p-6 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          📝 My Todo List
        </h1>

        {/* Input + Add Button */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={addTask}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Add
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-2 mb-6">
          {["All", "Active", "Completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                filter === f
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Task List */}
        <ul className="space-y-3">
          {filteredTasks.length === 0 ? (
            <li className="text-center text-gray-400 italic">No tasks</li>
          ) : (
            filteredTasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg shadow"
              >
                <button
                  type="button"
                  onClick={() => toggleTask(index)}
                  className={`cursor-pointer bg-transparent border-none p-0 text-left focus:outline-none ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                  aria-pressed={task.completed}
                >
                  {task.text}
                </button>
                <button
                  onClick={() => removeTask(index)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Footer */}
        <div className="mt-6 text-sm text-gray-500 text-center">
          {tasks.filter((t) => t.completed).length} of {tasks.length} tasks done
        </div>
      </div>
    </div>
  );
}

export default App;
