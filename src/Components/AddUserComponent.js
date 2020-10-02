import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Link , useHistory} from 'react-router-dom';

import usersUtils from '../Utils/UsersUtils.js'
import './AddUserComponent.css';

function AddUserComponent(props) {

  const textNameInputRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const focusNameInputRef = async function () {
      textNameInputRef.current.focus();
    }
    focusNameInputRef();
  },[])


  const navigateToAllUsers = () => {
    props.history.push(`/`);
    const current = history.location.pathname;
    props.history.replace(`/reload`);
    setTimeout(() => {
      props.history.replace(current);
    });
  }

  const validate = values => {
    debugger;
    const errors = {};

    if (!values.name) {
      errors.name = 'Please enter your name.';
    }

    if (!values.email) {
      errors.email = 'Please enter your email.';
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
    },
    validate,
    onSubmit: async values => {
      debugger;
      let user = {};
      user.name = values.name;
      user.email = values.email;
      let nextUserId = await usersUtils.getNextUserId();
      await usersUtils.addUser(user);
      user.id = nextUserId;
      await props.updateFromAddUserCallback(user);
      navigateToAllUsers();
    },
  });


  return (

    <div className="borderAddUserStyle">
      <form onSubmit={formik.handleSubmit} >
        Name: <input type="text" ref={textNameInputRef}
          name="name" onChange={formik.handleChange} value={formik.values.name}
          onBlur={formik.handleBlur} /><br />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
        Email: <input type="email"
          name="email" onChange={formik.handleChange} value={formik.values.email}
          onBlur={formik.handleBlur} /><br />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <button type="submit" className="yellowButton" > Add </button>
        <button className="yellowButton" type="text" >
          <Link to={`/`} >Cancel</Link>
        </button>
      </form>
    </div>
  );
}

export default AddUserComponent;
