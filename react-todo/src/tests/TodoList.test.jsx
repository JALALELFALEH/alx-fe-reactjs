import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
    // Test 1: Initial render with demo todos
    test('renders initial todos correctly', () => {
        render(<TodoList />);
        
        // Check if initial todos are displayed
        expect(screen.getByText('Learn React')).toBeInTheDocument();
        expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
        expect(screen.getByText('Write Tests')).toBeInTheDocument();
        
        // Check if stats are shown
        expect(screen.getByText(/2 todos remaining/)).toBeInTheDocument();
    });

    // Test 2: Add a new todo
    test('adds a new todo', async () => {
        const user = userEvent.setup();
        render(<TodoList />);
        
        // Get input and button
        const input = screen.getByPlaceholderText('What needs to be done?');
        const addButton = screen.getByText('Add Todo');
        
        // Type new todo
        await user.type(input, 'New Test Todo');
        await user.click(addButton);
        
        // Check if new todo is added
        expect(screen.getByText('New Test Todo')).toBeInTheDocument();
        
        // Check if input is cleared
        expect(input.value).toBe('');
    });

    // Test 3: Toggle todo completion
    test('toggles todo completion', () => {
        render(<TodoList />);
        
        // Get the first todo
        const todoText = screen.getByText('Learn React');
        const todoCheckbox = screen.getAllByRole('checkbox')[0];
        
        // Initially should be checked (from demo data)
        expect(todoCheckbox).toBeChecked();
        expect(todoText).toHaveClass('completed');
        
        // Click to toggle
        fireEvent.click(todoText);
        
        // Should now be unchecked
        expect(todoCheckbox).not.toBeChecked();
        
        // Click again to toggle back
        fireEvent.click(todoText);
        expect(todoCheckbox).toBeChecked();
    });

    // Test 4: Delete a todo
    test('deletes a todo', () => {
        render(<TodoList />);
        
        // Get delete buttons
        const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
        
        // Check initial count
        expect(screen.getByText('Learn React')).toBeInTheDocument();
        expect(deleteButtons).toHaveLength(3);
        
        // Click delete button on first todo
        fireEvent.click(deleteButtons[0]);
        
        // Check if todo is removed
        expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
        expect(screen.getAllByRole('button', { name: /delete/i })).toHaveLength(2);
    });

    // Test 5: Empty input validation
    test('does not add empty todo', async () => {
        const user = userEvent.setup();
        render(<TodoList />);
        
        const input = screen.getByPlaceholderText('What needs to be done?');
        const addButton = screen.getByText('Add Todo');
        
        // Try to add empty todo
        await user.type(input, '   '); // Just spaces
        await user.click(addButton);
        
        // Should not add empty todo
        const initialTodos = ['Learn React', 'Build a Todo App', 'Write Tests'];
        initialTodos.forEach(todo => {
        expect(screen.getByText(todo)).toBeInTheDocument();
        });
    });

    // Test 6: Stats update correctly
    test('updates stats correctly', async () => {
        const user = userEvent.setup();
        render(<TodoList />);
        
        // Initial stats: 2 remaining out of 3
        expect(screen.getByText(/2 todos remaining/)).toBeInTheDocument();
        
        // Toggle first todo (complete -> incomplete)
        const firstTodo = screen.getByText('Learn React');
        await user.click(firstTodo);
        
        // Now should be 3 remaining out of 3
        expect(screen.getByText(/3 todos remaining/)).toBeInTheDocument();
        
        // Add new todo
        const input = screen.getByPlaceholderText('What needs to be done?');
        const addButton = screen.getByText('Add Todo');
        await user.type(input, 'New Todo');
        await user.click(addButton);
        
        // Should be 4 remaining out of 4
        expect(screen.getByText(/4 todos remaining/)).toBeInTheDocument();
    });
});