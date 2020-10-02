import React, { useState, useEffect } from 'react';

import './TodoComponent.css';
import todosUtils from '../Utils/TodosUtils.js';

function TodoComponent(props) {

  const [todo, setTodo] = useState({});

  useEffect(() => {
    setTodo(props.todo);
  }, []);

  const onMarkCompleted = () => {
    const markTodoCompletedByUserId = async function() {
      todo.completed = true;
      await todosUtils.markTodoCompletedByUserId(todo);
      await setTodo(true);
    }
    markTodoCompletedByUserId();
  }

  return (
      <div className="borderTodoStyle">
        Title: {props.todo.title} <br />
        Completed: {props.todo.completed.toString()}
        <input className={(props.todo.completed.toString() === "false") ? "markCompletedVisibleStyle" : "markCompletedHiddenStyle"}
          type="button" value="Mark Completed" onClick={onMarkCompleted} />
      </div>
    
  );
}

export default TodoComponent;
