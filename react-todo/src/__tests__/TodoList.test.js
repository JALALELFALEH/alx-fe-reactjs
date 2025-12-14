import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

// Test 1: Initial render with static array
test('renders initial todos from static array', () => {
    render(<TodoList />);
    
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
});

// Test 2: Add new todo
test('adds a new todo when form is submitted', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByText('Add Todo');
    
    fireEvent.change(input, { target: { value: 'Test New Todo' } });
    fireEvent.click(button);
    
    expect(screen.getByText('Test New Todo')).toBeInTheDocument();
});

// Test 3: Toggle todo completion
test('toggles todo completion when clicked', () => {
    render(<TodoList />);
    
    const todo = screen.getByText('Learn React');
    
    expect(todo).not.toHaveStyle('text-decoration: line-through');
    
    fireEvent.click(todo);
    expect(todo).toHaveStyle('text-decoration: line-through');
    
    fireEvent.click(todo);
    expect(todo).not.toHaveStyle('text-decoration: line-through');
});

// Test 4: Delete todo
test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
});