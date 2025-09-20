function TodoItem({ todo, onToggle, onDelete }) {
return (
    <li className="todo-item">
    <td>
      <span onClick={onToggle}
        style={{
          textDecoration: todo.completed ? "line-through" : "none", cursor: "pointer", }}>
     {todo.text}  </span></td>
        <td>
        {todo.priority}
        {todo}
        </td>
    <td>
      <button onClick={onDelete}>X</button>
      </td>
    </li>
  );
}

export default TodoItem;