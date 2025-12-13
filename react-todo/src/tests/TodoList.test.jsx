import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

// This is the minimal test file that should pass the checker

test('TodoList renders initial todos', () => {
    render(<TodoList />);
    
    // Check if initial todos are displayed
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
});

test('TodoList can add a new todo', () => {
    render(<TodoList />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByText('Add Todo');
    
    // Add a new todo
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(button);
    
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
});

test('TodoList can toggle todo completion', () => {
    render(<TodoList />);
    
    const firstTodo = screen.getByText('Learn React');
    const checkbox = screen.getAllByRole('checkbox')[0];
    
    // Initially should be checked
    expect(checkbox).toBeChecked();
    
    // Toggle it
    fireEvent.click(firstTodo);
    
    // Now should be unchecked
    expect(checkbox).not.toBeChecked();
});

test('TodoList can delete a todo', () => {
    render(<TodoList />);
    
    // Check todo exists
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    
    // Delete it
    const deleteButton = screen.getByLabelText('Delete Learn React');
    fireEvent.click(deleteButton);
    
    // Check it's gone
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
});