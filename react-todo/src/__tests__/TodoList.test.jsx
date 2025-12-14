import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
// Test 1: Initial render with demo todos
test('renders initial todos correctly', () => {
    render(<TodoList />);

    // Check if initial todos are displayed
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
});

// Test 2: Add a new todo
test('adds a new todo when form is submitted', () => {
    render(<TodoList />);

    // Get input and button
    const input = screen.getByPlaceholderText('Add a new todo...');
    const button = screen.getByText('Add');

    // Type new todo and submit
    fireEvent.change(input, { target: { value: 'Test New Todo' } });
    fireEvent.click(button);

    // Check if new todo is added
    expect(screen.getByText('Test New Todo')).toBeInTheDocument();
});

// Test 3: Toggle todo completion
test('toggles todo completion status when clicked', () => {
    render(<TodoList />);

    // Get the first todo item
    const firstTodo = screen.getByText('Learn React');

    // Initially should not have line-through
    expect(firstTodo).not.toHaveStyle('text-decoration: line-through');

    // Click to toggle (mark as completed)
    fireEvent.click(firstTodo);

    // Should now have line-through
    expect(firstTodo).toHaveStyle('text-decoration: line-through');

    // Click again to toggle back
    fireEvent.click(firstTodo);
    expect(firstTodo).not.toHaveStyle('text-decoration: line-through');
});

// Test 4: Delete a todo
test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);

    // Check initial state - todo exists
    expect(screen.getByText('Learn React')).toBeInTheDocument();

    // Get all delete buttons and click the first one
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    // Check if todo is removed
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    });
});