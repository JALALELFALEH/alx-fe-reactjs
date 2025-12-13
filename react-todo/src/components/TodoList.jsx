import { useState } from 'react';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import './TodoList.css';

const TodoList = () => {
  // Initial demo todos
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React', completed: true },
        { id: 2, text: 'Build a Todo App', completed: false },
        { id: 3, text: 'Write Tests', completed: false },
    ]);

    // Add a new todo
    const addTodo = (text) => {
        const newTodo = {
        id: Date.now(), // Simple ID generation
        text,
        completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    // Toggle todo completion
    const toggleTodo = (id) => {
        setTodos(
        todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
        );
    };

    // Delete a todo
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // Count remaining todos
    const remainingTodos = todos.filter((todo) => !todo.completed).length;

    return (
        <div className="todo-container">
        <h1>Todo List</h1>
        
        <AddTodoForm onAddTodo={addTodo} />
        
        <div className="todo-stats">
            <p>
            {remainingTodos} {remainingTodos === 1 ? 'todo' : 'todos'} remaining
            out of {todos.length} total
            </p>
        </div>
        
        {todos.length === 0 ? (
            <p className="empty-message">No todos yet. Add one above!</p>
        ) : (
            <ul className="todo-list">
            {todos.map((todo) => (
                <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                />
            ))}
            </ul>
        )}
        </div>
    );
};

export default TodoList;