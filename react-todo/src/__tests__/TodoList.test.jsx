import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

// Test 1: Component renders without crashing
test('TodoList component renders without crashing', () => {
    render(<TodoList />);
});

// Test 2: Renders the correct title
test('renders Todo List title', () => {
    render(<TodoList />);
    const titleElement = screen.getByText(/Todo List/i);
    expect(titleElement).toBeInTheDocument();
});

// Test 3: Renders initial todos from static array
test('renders initial todo items from static array', () => {
    render(<TodoList />);
    
    // Check all initial todos are present
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check there are exactly 3 initial todos
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(3);
});

// Test 4: Renders AddTodoForm (input and button)
test('renders AddTodoForm with input and button', () => {
    render(<TodoList />);
    
    // Check for input field
    const inputElement = screen.getByPlaceholderText(/Add a new todo/i);
    expect(inputElement).toBeInTheDocument();
    
    // Check for add button
    const buttonElement = screen.getByText(/Add/i);
    expect(buttonElement).toBeInTheDocument();
});

// Test 5: Can add a new todo
test('allows user to add a new todo', () => {
    render(<TodoList />);
    
    // Get form elements
    const inputElement = screen.getByPlaceholderText(/Add a new todo/i);
    const buttonElement = screen.getByText(/Add/i);
    
    // Simulate adding a new todo
    fireEvent.change(inputElement, { target: { value: 'Test New Todo' } });
    fireEvent.click(buttonElement);
    
    // Check new todo is added
    expect(screen.getByText('Test New Todo')).toBeInTheDocument();
    
    // Check total todos increased
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(4); // 3 initial + 1 new
});

// Test 6: Input clears after adding todo
test('clears input field after adding todo', () => {
    render(<TodoList />);
    
    const inputElement = screen.getByPlaceholderText(/Add a new todo/i);
    const buttonElement = screen.getByText(/Add/i);
    
    // Add a todo
    fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
    fireEvent.click(buttonElement);
    
    // Input should be cleared
    expect(inputElement.value).toBe('');
});

// Test 7: Can toggle todo completion by clicking on it
test('toggles todo completion when clicked', () => {
    render(<TodoList />);
    
    // Get first todo
    const firstTodo = screen.getByText('Learn React');
    
    // Initially should not have line-through
    expect(firstTodo).not.toHaveStyle('text-decoration: line-through');
    
    // Click to toggle to completed
    fireEvent.click(firstTodo);
    expect(firstTodo).toHaveStyle('text-decoration: line-through');
    
    // Click again to toggle back to not completed
    fireEvent.click(firstTodo);
    expect(firstTodo).not.toHaveStyle('text-decoration: line-through');
});

// Test 8: Can delete a todo
test('deletes a todo when delete button is clicked', () => {
    render(<TodoList />);
    
    // Check initial count
    let todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(3);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    
    // Get delete button for first todo
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    
    // Check todo is deleted
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    
    // Check count decreased
    todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(2);
});

// Test 9: Empty todo is not added
test('does not add empty todo', () => {
    render(<TodoList />);
    
    const inputElement = screen.getByPlaceholderText(/Add a new todo/i);
    const buttonElement = screen.getByText(/Add/i);
    
    // Try to add empty todo
    fireEvent.change(inputElement, { target: { value: '   ' } }); // Just spaces
    fireEvent.click(buttonElement);
    
    // Count should remain the same
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(3); // Still 3 initial todos
});

// Test 10: Todo with only spaces is not added
test('does not add todo with only spaces', () => {
    render(<TodoList />);
    
    const inputElement = screen.getByPlaceholderText(/Add a new todo/i);
    const buttonElement = screen.getByText(/Add/i);
    
    // Initial count
    const initialCount = screen.getAllByRole('listitem').length;
    
    // Try to add todo with spaces
    fireEvent.change(inputElement, { target: { value: '     ' } });
    fireEvent.click(buttonElement);
    
    // Count should not change
    expect(screen.getAllByRole('listitem')).toHaveLength(initialCount);
});