import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import './UserComponent.css';
import todosUtils from '../Utils/TodosUtils.js';
import usersUtils from '../Utils/UsersUtils.js';

function UserComponent(props) {

  const [isUnCompletedUserTodos, SetIsUnCompletedUserTodos] = useState(true);
  const [isHiddenStyle, setIsHiddenStyle] = useState(true);
  const [isOrangeStyle, setIsOrangeStyle] = useState(false);

   useEffect(() => {
    const getAllTodosByUserId = async function () {
      
      let userTodos = await todosUtils.getAllTodosByUserId(props.user.id)
      formik.setFieldValue("name", props.user.name, false);
      formik.setFieldValue("email", props.user.email, false);
      formik.setFieldValue("street", props.user.address?.street, false);
      formik.setFieldValue("city", props.user.address?.city, false);
      formik.setFieldValue("zipcode", props.user.address?.zipcode, false);

      let isUnCompletedUserTodos = true;
      for (let i = 0; i < userTodos.length; i++) {
        if (userTodos[i].completed.toString() === "false") {
          isUnCompletedUserTodos = false;
          break;
        }
      }
      SetIsUnCompletedUserTodos(isUnCompletedUserTodos);

    }
    getAllTodosByUserId();
  }, [props.user.id])


  const onDeleteUser = async () => {
    await usersUtils.deleteUser(props.user.id);
    props.deleteUserCallback(props.user.id);
  }

  const onClickOnUserId = async () => {
    await setIsOrangeStyle(!isOrangeStyle);
    props.onClickOnUserIdCallback(props.user.id, !isOrangeStyle);
  }

  let borderStyle;
  if (!isUnCompletedUserTodos) {
    borderStyle = "borderRedStyle";
  }
  else {
    borderStyle = "borderGreenStyle";
  }

  let hiddenStyle;
  if (isHiddenStyle) {
    hiddenStyle = "hiddenStyle";
  }
  else {
    hiddenStyle = "visibleStyle";
  }

  let orangeStyle;
  debugger;
  if (isOrangeStyle && props.userId == props.user.id) {
    orangeStyle = "orangeStyle";
  }
  else {
    orangeStyle = "regularStyle";
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

    if (!values.street) {
      errors.street = 'Please enter your street.';
    }

    if (!values.city) {
      errors.city = 'Please enter your city.';
    }

    if (!values.zipcode) {
      errors.zipcode = 'Please enter your zipcode.';
    }

    return errors;
  };


  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      street: '',
      city: '',
      zipcode: '',
    },
    validate,
    onSubmit: async values => {
  debugger;
      let updateUserObj = {};
      updateUserObj.id = props.user.id;
      updateUserObj.name = values.name;
      updateUserObj.email = values.email;
      updateUserObj.street = values.street;
      updateUserObj.city = values.city;
      updateUserObj.zipcode = values.zipcode;

      await usersUtils.updateUser(props.user.id, updateUserObj);
      props.updateUserCallback(updateUserObj);
    },
  });

  return (


    <div className={`${borderStyle} ${orangeStyle}`}>
      <form onSubmit={formik.handleSubmit} >
        <label onClick={onClickOnUserId}><Link to={`/todoAndPostList/${props.user.id}`} >ID: {props.user.id} </Link></label><br />

        <label>Name :</label>
        <input type="text"  
         name="name" onChange={formik.handleChange} value={formik.values.name}  
         onBlur={formik.handleBlur}/><br />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}

        <label>Email :</label>
        <input type="text" 
         name="email"  onChange={formik.handleChange} value={formik.values.email}
         onBlur={formik.handleBlur} /><br />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}


        <input className="grayButton" type="button" value="Other Data" onMouseOver={() => setIsHiddenStyle(false)} />
        <div className={hiddenStyle} onMouseLeave={() => setIsHiddenStyle(true)}>

          <label>Street :</label>
          <input type="text" 
          name="street"  onChange={formik.handleChange} value={formik.values.street} 
          onBlur={formik.handleBlur}/><br />
          {formik.touched.street && formik.errors.street ? (
            <div>{formik.errors.street}</div>
          ) : null}

          <label>City :</label>
          <input type="text" 
           name="city" onChange={formik.handleChange} value={formik.values.city} 
           onBlur={formik.handleBlur}/><br />
          {formik.touched.city && formik.errors.city ? (
            <div>{formik.errors.city}</div>
          ) : null}

          <label>Zip Code :</label>
          <input type="text" 
           name="zipcode" onChange={formik.handleChange} value={formik.values.zipcode} 
           onBlur={formik.handleBlur}/><br />
          {formik.touched.zipcode && formik.errors.zipcode ? (
            <div>{formik.errors.zipcode}</div>
          ) : null}
        </div>

        <div className="alignLeft">
          <input type="submit" className="yellowButton1"  value="Update" />
          <input className="yellowButton1" type="button" value="Delete" onClick={onDeleteUser} />
        </div>
        <br />
      </form>
    </div>
  );
}

export default UserComponent;
