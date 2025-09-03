import React from "react";

export default function Todolist({ todos, handleDeleteTodo }) {
    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <li key={todo.id} className="todo-item">
                    <span className="todo-text">{todo.text}</span> {/* Testo del compito */}
                    {todo.date && <span className="todo-date"> (Scade il: {todo.date})</span>} {/* Data, mostrata solo se esiste */}
                    <button onClick={() => handleDeleteTodo(todo.id)} className="delete-button">Cancella</button>
                </li>
            ))}
        </ul>
    );
}

