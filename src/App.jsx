import { useState, useEffect } from 'react';
import './App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);

  // Carica i dati dal localStorage all'avvio
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // Salva i dati nel localStorage ogni volta che i 'todos' cambiano
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Aggiunge un nuovo todo
  const handleAddTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  // Cancella un todo
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Avvia la modalità di modifica
  const startEditing = (todo) => {
    setEditingTodo(todo);
  };

  // Gestisce la modifica di un todo
  const handleEditTodo = (updatedTodo) => {
    setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
    setEditingTodo(null); // Resetta la modalità di modifica
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