import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
uuidv4();

const loadTodosFromLocalStorage = () => {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
};

const saveTodosToLocalStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export const TodoWrapper = ({ handleFilterChange, filter }) => {
  const [todos, setTodos] = useState(loadTodosFromLocalStorage());

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  const addTodo = (todo) => {
    if (todo.trim() !== '') {
      setTodos([
        { id: uuidv4(), task: todo, completed: false, isEditing: false },
        ...todos,
      ]);
    } else {
      console.log('Tarefa vazia!');
    }
  };  

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    if (task.trim() !== '') {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        )
      );
    } else {
      console.log('Tarefa vazia!');
    }
  };  

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') {
      return todo.completed;
    } else if (filter === 'incomplete') {
      return !todo.completed;
    } else {
      return true;
    }
  });

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    return 0;
  });

  return (
    <div className="TodoWrapper">
      <h1>To-Do List!</h1>
      <div className="filters">
        <h4>Filtro:</h4>
        <div className="filter-options">
          <label>
            <input
              type="radio"
              value="all"
              checked={filter === 'all'}
              onChange={() => handleFilterChange('all')}
            />
            Todos
          </label>
          <label>
            <input
              type="radio"
              value="completed"
              checked={filter === 'completed'}
              onChange={() => handleFilterChange('completed')}
            />
            Concluídos
          </label>
          <label>
            <input
              type="radio"
              value="incomplete"
              checked={filter === 'incomplete'}
              onChange={() => handleFilterChange('incomplete')}
            />
            Não Concluídos
          </label>
        </div>
      </div>
      <TodoForm addTodo={addTodo} />
      <div className="todoList">
        {sortedTodos.map((todo) =>
          todo.isEditing ? (
            <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
          ) : (
            <Todo
              key={todo.id}
              task={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          )
        )}
      </div>
    </div>
  );
};
export default TodoWrapper;