export default function TodoItem({ todo, onDeleteTodo, onStartEditing }) {
  return (
    <li className="todo-item">
      <div className="todo-content">
        <span className="todo-text">{todo.text}</span>
        <span className="todo-date">{todo.date}</span>
      </div>
      <div className="todo-buttons">
        <button className="edit-button" onClick={() => onStartEditing(todo)}>
          Modifica
        </button>
        <button className="delete-button" onClick={() => onDeleteTodo(todo.id)}>
          Cancella
        </button>
      </div>
    </li>
  );
}