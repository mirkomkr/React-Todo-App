import { useEffect, useReducer } from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

const initialTodos = [
  {
    id: 1,
    text: 'Imparare React e i suoi hook',
    date: '2025-09-15'
  },
  {
    id: 2,
    text: 'Completare il progetto della Todo List',
    date: '2025-09-20'
  },
  {
    id: 3,
    text: 'Esplorare nuovi concetti di React',
    date: '2025-09-30'
  }
];

 function getInitialTodos() {
   const savedTodos = localStorage.getItem('todos');
   if (savedTodos !== null) {
     return JSON.parse(savedTodos);
   } else {
     return initialTodos;
   }
 }

 function todoReducer(todos, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...todos, action.payload];
    case 'DELETE_TODO':
      return todos.filter(todo => todo.id !== action.payload);
    default:
      return todos;
  }
}

function App() {
const [todos, dispatch] = useReducer(todoReducer, getInitialTodos());

useEffect(() => {localStorage.setItem('todos', JSON.stringify(todos));},[todos]);

  const handleAddTodo = (newTodo) => {dispatch({type: 'ADD_TODO', payload: {...newTodo, id: Date.now()}});
}
 const handleDeleteTodo = (deleteTodo) => {dispatch({type: 'DELETE_TODO', payload:deleteTodo})}

return (
    <>
      <h1>Todo-State | Gestisci il tuo Stato, Gestisci la tua Giornata</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} handleDeleteTodo={handleDeleteTodo} />
    </>
  );
}

export default App;