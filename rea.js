import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users/1/todos');
    setTodos(response.data);
  };

  const handleAddTodo = async (taskName) => {
    const newTodo = {
      id: Math.random() * 10000,
      title: taskName,
      completed: false,
    };

    const response = await axios.post('https://jsonplaceholder.typicode.com/todos', newTodo);
    setTodos([...todos, response.data]);
  };

  const handleEditTodo = async (todoId, taskName) => {
    const updatedTodo = {
      id: todoId,
      title: taskName,
    };

    await axios.put(`https://jsonplaceholder.typicode.com/todos/${todoId}`, updatedTodo);

    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return updatedTodo;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleDeleteTodo = async (todoId) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`);

    const updatedTodos = todos.filter((todo) => todo.id !== todoId);

    setTodos(updatedTodos);
  };

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter);

    if (filter === 'all') {
      setFilteredTodos(todos);
    } else {
      const filteredTodos = todos.filter((todo) => todo.completed === (filter === 'completed'));
      setFilteredTodos(filteredTodos);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>

      <div>
        <input
          type="text"
          placeholder="Add a new todo..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAddTodo(e.target.value);
              e.target.value = '';
            }
          }}
        />
        <button onClick={() => handleAddTodo(input.value)}>Add</button>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleEditTodo(todo.id, todo.title)}
            />
            {todo.title}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={() => handleFilterChange('all')}>All</button>
        <button onClick={() => handleFilterChange('completed')}>Completed</button>
      </div>
    </div>
  );
};

export default TodoList;
