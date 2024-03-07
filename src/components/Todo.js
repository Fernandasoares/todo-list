import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare, faPen, faTrash, } from '@fortawesome/free-solid-svg-icons';


export const Todo = ({task, toggleComplete, deleteTodo, editTodo, handleFilterChange}) => {
  const MAX_CHARACTERS = 30;
  const formatText = text => {
    if (text.length > MAX_CHARACTERS) {
      return text.match(new RegExp('.{1,' + MAX_CHARACTERS + '}', 'g')).join('\n');
    }
    return text;
  };

  return (
    <div className='Todo'>
      <div className="filters">
        <button onClick={() => handleFilterChange('all')}>Todas</button>
        <button onClick={() => handleFilterChange('completed')}>Concluídas</button>
        <button onClick={() => handleFilterChange('incomplete')}>Não Concluídas</button>
      </div>
      {!task.completed && <FontAwesomeIcon icon={faSquare} onClick={() => toggleComplete(task.id)} />}
      {task.completed && <FontAwesomeIcon icon={faCheckSquare} onClick={() => toggleComplete(task.id)} className="completed-icon" />}
      <p onClick={() => toggleComplete(task.id)} className={`${task.completed ? 'completed' : ''}`}>
        {formatText(task.task)}
      </p>
      <div>
        <FontAwesomeIcon icon={faPen} onClick={()=>editTodo(task.id)}/>
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)}/>
      </div>
    </div>
  )
}
