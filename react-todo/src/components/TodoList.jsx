import { useState } from 'react';

function TodoList() {
    // Initial demo todos
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React', completed: false },
        { id: 2, text: 'Build a Todo App', completed: false },
        { id: 3, text: 'Write Tests', completed: false }
    ]);
    
    const [newTodo, setNewTodo] = useState('');

    // Add new todo
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodo.trim() === '') return;
        
        const todo = {
        id: todos.length + 1,
        text: newTodo,
        completed: false
        };
        
        setTodos([...todos, todo]);
        setNewTodo('');
    };

    // Toggle completion
    const toggleTodo = (id) => {
        setTodos(todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    // Delete todo
    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div>
        <h1>Todo List</h1>
        
        {/* AddTodoForm */}
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            />
            <button type="submit">Add Todo</button>
        </form>
        
        {/* Todo List */}
        <ul>
            {todos.map(todo => (
            <li key={todo.id}>
                <span
                onClick={() => toggleTodo(todo.id)}
                style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    cursor: 'pointer'
                }}
                >
                {todo.text}
                </span>
                <button onClick={() => deleteTodo(todo.id)}>
                Delete
                </button>
            </li>
            ))}
        </ul>
        </div>
    );
}

export default TodoList;