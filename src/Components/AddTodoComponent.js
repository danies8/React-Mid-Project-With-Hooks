import React, { useState, useEffect , useRef} from 'react';
import { useFormik } from 'formik';
import { Link,useHistory } from 'react-router-dom';

import todosUtils from '../Utils/TodosUtils.js'
import './AddTodoComponent.css';

function AddTodoComponent(props) {

  const textTitleInputRef = useRef(null);
  const [userId, setUserId] = useState("");
  const history = useHistory();

  useEffect(() => {
    textTitleInputRef.current.focus();
    let userId = props.match.params.userId;
    setUserId(userId);
  }, []);

   const navigateToAllUsers = () => {
    props.history.push(`/todoAndPostList/${userId}`);
    const current = history.location.pathname;
    props.history.replace(`/reload`);
    setTimeout(() => {
        props.history.replace(current);
    }); 
 }

 const validate = values => {
  debugger;
  const errors = {};

  if (!values.title) {
    errors.title = 'Please enter your title.';
  }
  return errors;
};

const formik = useFormik({
  initialValues: {
    title: '',
   },
  validate,
  onSubmit: async values => {
    let newTodoObj = {};
    newTodoObj.title = values.title;
    newTodoObj.userId = userId;
    newTodoObj.completed = false;
    await todosUtils.addTodo(newTodoObj);
    navigateToAllUsers();
  },
});


  return (
    <div className="borderAddTodoStyle">
        <form onSubmit={formik.handleSubmit} >
      Title: <input type="text" size="36" ref={textTitleInputRef}
          name="title" onChange={formik.handleChange} value={formik.values.title}
          onBlur={formik.handleBlur} /><br />
        {formik.touched.title && formik.errors.title ? (
          <div>{formik.errors.title}</div>
        ) : null}
      <button type="submit" className="yellowButton" >Add</button>
      <button className="yellowButton" type="button" >
        <Link to={`/todoAndPostList/${userId}`} >Cancel</Link>
      </button>
      </form>
    </div>
  );
}

export default AddTodoComponent;
