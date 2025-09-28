function TodoItem({ todo }) {
  return (
    <li className="todo-item">
      {/* 1. Container for task name and priority to stack them vertically */}
      <div className="task-text-container">
          
          {/* 2. Priority line */}
          <div className={`priority-badge priority-${todo.priority.toLowerCase()}`}>
            {todo.priority}
          </div>
          
          {/* 3. Task Name line (use todo.name or todo.text) */}
          <span className="task-name">
            {/* FIX: Use the specific property, e.g., todo.name */}
            {todo.name} 
          </span>
      </div>

      {/* 4. Action buttons */}
      <div className="task-actions">
          <button onClick={() => { /* handle edit */ }}>✏️</button>
          <button onClick={() => { /* handle delete */ }}>&times;</button>
      </div>
    </li>
  );
}

export default TodoItem;