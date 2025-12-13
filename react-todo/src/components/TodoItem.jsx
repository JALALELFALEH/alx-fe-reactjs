import './TodoList.css';

const TodoItem = ({ todo, onToggle, onDelete }) => {
    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
        <div className="todo-content">
            <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="todo-checkbox"
            />
            <span
            className="todo-text"
            onClick={() => onToggle(todo.id)}
            >
            {todo.text}
            </span>
        </div>
        <button
            onClick={() => onDelete(todo.id)}
            className="delete-btn"
            aria-label={`Delete ${todo.text}`}
        >
            ×
        </button>
        </li>
    );
};

export default TodoItem;