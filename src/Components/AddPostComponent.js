import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';

import './AddPostComponent.css';
import postsUtils from '../Utils/PostsUtils.js'

function AddPostComponent(props) {

  const [userId, setUserId] = useState("");
  const history = useHistory();
  const textTitleInputRef = useRef(null);

  useEffect(() => {
    textTitleInputRef.current.focus();
    let userId = props.match.params.userId;
    setUserId(userId)
  }, [props.match.params.userId]);


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

    if (!values.body) {
      errors.body = 'Please enter your body.';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
    },
    validate,
    onSubmit: async values => {
      debugger
      let newPostObj = {};
      newPostObj.title = values.title;
      newPostObj.body = values.body;
      newPostObj.userId = userId;
      await postsUtils.addPost(newPostObj);
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
        Body: <input type="text" size="36"
          name="body" onChange={formik.handleChange} value={formik.values.body}
          onBlur={formik.handleBlur} /><br />
        {formik.touched.body && formik.errors.body ? (
          <div>{formik.errors.body}</div>
        ) : null}
        <button type="submit" className="yellowButton" >Add</button>
         <button className="yellowButton" type="button" >
          <Link to={`/todoAndPostList/${userId}`} >Cancel</Link>
        </button>
      </form>
    </div>
  );
}

export default AddPostComponent;
