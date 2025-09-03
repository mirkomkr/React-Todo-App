import { useState, useEffect } from 'react';

export default function TodoForm({ onAddTodo, onEditTodo, currentTodo }) {
  const [newTodo, setNewTodo] = useState({ text: '', date: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (currentTodo) {
      setNewTodo(currentTodo);
    } else {
      setNewTodo({ text: '', date: '' });
    }
    setErrorMessage(''); // Resetta l'errore
  }, [currentTodo]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    setErrorMessage(''); // Resetta l'errore precedente

    // Controllo campi vuoti
    if (!newTodo.text.trim()) {
      setErrorMessage("Il campo 'Todo' non può essere vuoto.");
      return;
    }
    if (!newTodo.date) {
      setErrorMessage("Devi inserire una data.");
      return;
    }
    
    // Controllo data antecedente
    const today = new Date().toISOString().split('T')[0];
    if (newTodo.date < today) {
      setErrorMessage("La data non può essere antecedente a quella odierna.");
      return;
    }
    
    if (currentTodo) {
      onEditTodo(newTodo);
    } else {
      const todoWithDate = {
        ...newTodo,
        id: Date.now(),
        completed: false,
      };
      onAddTodo(todoWithDate);
    }
    
    setNewTodo({ text: '', date: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTodo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <form className="form-section" onSubmit={handleAddTodo}>
        <label htmlFor="todo-text">Todo:</label>
        <input
          type="text"
          name="text"
          id="todo-text"
          placeholder="Aggiungi un nuovo task"
          value={newTodo.text}
          onChange={handleChange}
        />
        <label htmlFor="todo-date">Data:</label>
        <input
          type="date"
          name="date"
          id="todo-date"
          value={newTodo.date}
          onChange={handleChange}
        />
        <button type="submit">{currentTodo ? 'Modifica' : 'Aggiungi'}</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>
  );
}