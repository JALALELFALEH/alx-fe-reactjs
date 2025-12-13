import { useState } from 'react';
import './TodoList.css';

const AddTodoForm = ({ onAddTodo }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        
        if (trimmedInput) {
        onAddTodo(trimmedInput);
        setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-todo-form">
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
            className="todo-input"
        />
        <button type="submit" className="add-btn">
            Add Todo
        </button>
        </form>
    );
};

export default AddTodoForm;