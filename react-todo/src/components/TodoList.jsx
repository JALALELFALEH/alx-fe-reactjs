import { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React', completed: true },
        { id: 2, text: 'Build a Todo App', completed: false },
        { id: 3, text: 'Write Tests', completed: false },
    ]);

    const [input, setInput] = useState('');

    const addTodo = (e) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        
        if (trimmedInput) {
        const newTodo = {
            id: Date.now(),
            text: trimmedInput,
            completed: false,
        };
        setTodos([...todos, newTodo]);
        setInput('');
        }
    };

    const toggleTodo = (id) => {
        setTodos(
        todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const remainingTodos = todos.filter((todo) => !todo.completed).length;

    return (
        <div className="todo-container" data-testid="todo-container">
        <h1>Todo List</h1>
        
        <form onSubmit={addTodo} className="add-todo-form" data-testid="add-todo-form">
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
            className="todo-input"
            data-testid="todo-input"
            />
            <button 
            type="submit" 
            className="add-btn"
            data-testid="add-button"
            >
            Add Todo
            </button>
        </form>
        
        <div className="todo-stats" data-testid="todo-stats">
            <p>
            {remainingTodos} {remainingTodos === 1 ? 'todo' : 'todos'} remaining
            out of {todos.length} total
            </p>
        </div>
        
        {todos.length === 0 ? (
            <p className="empty-message" data-testid="empty-message">
            No todos yet. Add one above!
            </p>
        ) : (
            <ul className="todo-list" data-testid="todo-list">
            {todos.map((todo) => (
                <li 
                key={todo.id} 
                className={`todo-item ${todo.completed ? 'completed' : ''}`}
                data-testid={`todo-item-${todo.id}`}
                >
                <div className="todo-content">
                    <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="todo-checkbox"
                    data-testid={`todo-checkbox-${todo.id}`}
                    />
                    <span
                    className="todo-text"
                    onClick={() => toggleTodo(todo.id)}
                    data-testid={`todo-text-${todo.id}`}
                    >
                    {todo.text}
                    </span>
                </div>
                <button
                    onClick={() => deleteTodo(todo.id)}
                    className="delete-btn"
                    data-testid={`delete-button-${todo.id}`}
                    aria-label={`Delete ${todo.text}`}
                >
                    ×
                </button>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
};

export default TodoList;