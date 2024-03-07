import React, {useState} from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
uuidv4();

export const TodoWrapper = ({ handleFilterChange, filter }) => {
  const [todos, setTodos] = useState([])

  const addTodo = todo => {
      setTodos([...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}])
      console.log(todos)
  }

  const toggleComplete = id => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
  }

  const deleteTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const editTodo = id => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
  }

  const editTask = (task, id) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo))
  }

  
  return (
    <div className='TodoWrapper'>
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
      {todos.filter((todo) => {
          if (filter === 'completed') {
            return todo.completed;
          } else if (filter === 'incomplete') {
            return !todo.completed;
          } else {
            return true;
          }
        }).map((todo, index) => (
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo task={todo} key={index}
          toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo}/>
        )
        
      ))}
    </div>
  )
}
export default TodoWrapper;