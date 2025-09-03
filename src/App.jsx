import { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = (newTodo) => {
    setTodos(prevTodos => [...prevTodos, { ...newTodo, id: Date.now() }]);
  };

  const handleDeleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const startEditing = (todo) => {
    setEditingTodo(todo);
  };

  const handleEditTodo = (updatedTodo) => {
    setTodos(prevTodos => prevTodos.map(todo => 
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
    setEditingTodo(null);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoForm 
        onAddTodo={handleAddTodo}
        onEditTodo={handleEditTodo}
        currentTodo={editingTodo} 
      />
      <TodoList 
        todos={todos} 
        onDeleteTodo={handleDeleteTodo} 
        onStartEditing={startEditing} 
      />
    </div>
  );
}

export default App;