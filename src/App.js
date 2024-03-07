import React, { useState } from 'react';
import TodoWrapper from './components/TodoWrapper';
import './App.css';

function App() {
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="App">
      <TodoWrapper handleFilterChange={handleFilterChange} filter={filter} />
    </div>
  );
}

export default App;
