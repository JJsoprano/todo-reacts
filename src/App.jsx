import { useState } from "react";
import TodoItem from "./TodoItem";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [filter, setFilter] = useState("All");

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([
      ...tasks,
      {
        id: Date.now() + Math.random(),
        text: input,
        completed: false,
        priority: priority
      }
    ]);
    setInput("");
    setPriority("Medium");
  };

  const handleToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

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

        {/* Input + Priority + Add Button */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-2 py-2 border rounded-lg"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
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
          {filteredTasks.map((task) => (
            <TodoItem
              key={task.id}
              todo={task}
              handleDelete={handleDelete}
              handleToggle={handleToggle}
              handleEdit={handleEdit}
            />
          ))}
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
