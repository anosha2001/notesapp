// src/components/TodoList.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource'; // Ensure this is the correct import path for your generated schema

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]); // Define the state to hold fetched todos
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading state

  // Generate the Data client
  const client = generateClient<Schema>();

  // Fetch data from the backend (Todo records)
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // Fetch records using the client and list all "Todo" items
        const { data: todoList } = await client.models.Todo.list();
        setTodos(todoList);
      } catch (error) {
        console.error('Error fetching todos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []); // Empty array ensures this runs once when the component mounts

  // Display loading message or list of todos
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {/* Using the snippet to render fetched todos */}
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
