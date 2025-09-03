import React, { useState } from 'react';

export default function TodoForm({ onAddTodo }) {
  const [errorMessage, setErrorMessage] = useState('');
  const [newTodo, setNewTodo] = useState({ text: '', date: '' });

  const handleAddTodo = (e) => {
    e.preventDefault();

    const isInputValid = newTodo.text.trim() !== '' && newTodo.date !== '';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const taskDate = new Date(newTodo.date);
    taskDate.setHours(0, 0, 0, 0);

    const isDateValid = taskDate >= today;

    if (isInputValid && isDateValid) {
      onAddTodo(newTodo);
      setNewTodo({ text: '', date: '' });
      setErrorMessage('');
    } else {
      if (!isInputValid) {
        setErrorMessage('Per favore, compila tutti i campi.');
      } else if (!isDateValid) {
        setErrorMessage('La data non può essere nel passato.');
      }
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <>
      <div className="form-section">
        <label htmlFor="taskText">Compito:</label>
        <input
          type="text"
          id="taskText"
          placeholder="Inserisci il tuo compito"
          value={newTodo.text}
          onChange={(e) => setNewTodo({ ...newTodo, text: e.target.value })}
        />
        <label htmlFor="taskDate">Data:</label>
        <input
          type="date"
          id="taskDate"
          value={newTodo.date}
          onChange={(e) => setNewTodo({ ...newTodo, date: e.target.value })}
        />
        <button onClick={handleAddTodo}>Aggiungi</button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </>
  );
}