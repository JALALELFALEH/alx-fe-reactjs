import { useState } from 'react';

const TodoList = () => {
  // Initial state with demo todos
    const initialTodos = [
        { id: 1, text: 'Learn React', completed: false },
        { id: 2, text: 'Build a Todo App', completed: false },
        { id: 3, text: 'Write Tests', completed: false }
    ];

    const [todos, setTodos] = useState(initialTodos);
    const [newTodo, setNewTodo] = useState('');

    // Add a new todo
    const handleAddTodo = (e) => {
        e.preventDefault();
        const trimmedTodo = newTodo.trim();
        
        if (trimmedTodo) {
        const todo = {
            id: Date.now(), // Simple unique ID
            text: trimmedTodo,
            completed: false
        };
        setTodos([...todos, todo]);
        setNewTodo('');
        }
    };

    // Toggle todo completion
    const handleToggleTodo = (id) => {
        setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    // Delete a todo
    const handleDeleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="todo-app" data-testid="todo-app">
        <h1>Todo List</h1>
        
        {/* AddTodoForm */}
        <form onSubmit={handleAddTodo} data-testid="add-todo-form">
            <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            data-testid="todo-input"
            />
            <button 
            type="submit" 
            data-testid="add-button"
            >
            Add Todo
            </button>
        </form>
        
        {/* Todo List */}
        <ul data-testid="todo-list">
            {todos.map(todo => (
            <li 
                key={todo.id} 
                data-testid={`todo-item-${todo.id}`}
            >
                <span
                onClick={() => handleToggleTodo(todo.id)}
                style={{ 
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    cursor: 'pointer'
                }}
                data-testid={`todo-text-${todo.id}`}
                >
                {todo.text}
                </span>
                <button
                onClick={() => handleDeleteTodo(todo.id)}
                data-testid={`delete-button-${todo.id}`}
                >
                Delete
                </button>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default TodoList;