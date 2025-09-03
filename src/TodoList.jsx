import TodoItem from './TodoItem';

export default function TodoList({ todos, onDeleteTodo, onStartEditing }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          onStartEditing={onStartEditing}
        />
      ))}
    </ul>
  );
}