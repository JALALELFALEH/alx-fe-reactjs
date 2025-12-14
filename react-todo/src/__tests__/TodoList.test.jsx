import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

// Test 1: Initial render with static array
test('renders initial todos from static array', () => {
    render(<TodoList />);
    
    // Check initial todos are displayed
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
});

// Test 2: Add new todo functionality
test('allows adding a new todo', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByText('Add Todo');
    
    // Add new todo
    fireEvent.change(input, { target: { value: 'Test New Todo' } });
    fireEvent.click(button);
    
    // Verify new todo is added
    expect(screen.getByText('Test New Todo')).toBeInTheDocument();
});

// Test 3: Toggle todo completion
test('toggles todo completion when clicked', () => {
    render(<TodoList />);
    
    const todo = screen.getByText('Learn React');
    
    // Initially not completed
    expect(todo).not.toHaveStyle('text-decoration: line-through');
    
    // Click to complete
    fireEvent.click(todo);
    expect(todo).toHaveStyle('text-decoration: line-through');
    
    // Click again to uncomplete
    fireEvent.click(todo);
    expect(todo).not.toHaveStyle('text-decoration: line-through');
});

// Test 4: Delete todo functionality
test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    // Initial todo exists
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    
    // Click delete button (first todo's delete button)
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    // Todo should be removed
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
});