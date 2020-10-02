import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import todosUtils from '../Utils/TodosUtils.js';
import './TodoListComponent.css';
import TodoComponent from './TodoComponent';


function TodoListComponent(props) {

  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
   const getAllTodosByUserId = async function() {
     let userId = props.match.params.userId;
       let todos = await todosUtils.getAllTodosByUserId(userId);
      await setUserId(userId);
      await setTodos(todos.sort());
      }
      getAllTodosByUserId();
  }, [props.match.params.userId]);

  return (
    <div className="borderTodoListStyle">
      Todo- User {userId}
      <button className="yellowButton" type="button" >
      <Link to={`/todoNew/${userId}`} >Add </Link>
      </button>
      {
        todos.map((todo) => {
          return <TodoComponent key={todo.id} todo={todo}  />
        })
      }
    </div>
  );
}

export default TodoListComponent;
