import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (input.trim() === "") return;
    setTasks([
      ...tasks,
      { id: Date.now() + Math.random(), text: input, completed: false }
    ]);
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

  const startEdit = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const saveEdit = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editText } : task
    ));
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
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg shadow"
            >
              {editingId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 px-2 py-1 rounded border mr-2"
                  />
                  <button
                    onClick={() => saveEdit(task.id)}
                    className="text-green-600 hover:text-green-800 font-bold mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-gray-500 hover:text-gray-700 font-bold"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => toggleTask(tasks.findIndex(t => t.id === task.id))}
                    className={`cursor-pointer bg-transparent border-none p-0 text-left focus:outline-none flex-1 ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {task.text}
                  </button>
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={() => startEdit(task.id, task.text)}
                      className="text-blue-500 hover:text-blue-700 font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeTask(tasks.findIndex(t => t.id === task.id))}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                </>
              )}
            </li>
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
