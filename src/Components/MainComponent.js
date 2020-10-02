import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import usersUtils from '../Utils/UsersUtils.js';
import './MainComponent.css';
import UserListComponent from './UserListComponent';
import TodoListComponent from './TodoListComponent';
import PostListComponent from './PostListComponent';
import AddTodoComponent from './AddTodoComponent';
import AddPostComponent from './AddPostComponent';
import AddUserComponent from './AddUserComponent';


function MainComponent(props) {

  const textSearchInputRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [isUserClickedToBringDataOnTodos, setIsUserClickedToBringDataOnTodos] = useState(false);
  const [addUser, setAddUser] = useState(false);
   
  useEffect(() => {
    const getAllUsers = async function () {
      textSearchInputRef.current.focus();
      
      let resp = await usersUtils.getAllUsers();
      let users = resp.data;
      await setUsers(users.sort());
     }
       getAllUsers();
  }, []);

   // Search
  const onSerachUsers = async (e) => {
    let searchValue = e.target.value.toString().toLowerCase();
     let resp = await usersUtils.getAllUsers();
    let users = resp.data;

    if (searchValue === '') {
      await setUsers(users);
      return;
    }
    else {
      let filterUsers = users.filter(user => {
        return user.name.toString().toLowerCase().includes(searchValue) ||
          user.email.toString().toLowerCase().includes(searchValue)
      });
       await setUsers(filterUsers);
    }
  }
  const updateUsersList = async (updateUserObject) => {
    let resp = await usersUtils.getAllUsers();
    let users = resp.data;
    await setUsers(users);
  }

  const deleteUser = async (userId) => {
   let filterUsers = users.filter(user => user.id !== userId);
   await setUsers(filterUsers);
  }

  // Posts-Todos
  const updatePostsTodos = (isUserClickedToBringDataOnTodos) => {
    setIsUserClickedToBringDataOnTodos(isUserClickedToBringDataOnTodos);
  }

  const onAddUser = () => {
    setAddUser(true);
  }

  const updateFromAddUser = async (addUser) => {
       setUsers([...users, addUser]);
   }

  let todosPostsVisiblityStyle;
  if (isUserClickedToBringDataOnTodos) {
    todosPostsVisiblityStyle = "visiblityElementStyle";
  }
  else {
    todosPostsVisiblityStyle = "hiddenElementStyle";
  }

  let addUserVisiblityStyle;
  if (addUser) {
    addUserVisiblityStyle = "visiblityElementStyle";
  }
  else {
    addUserVisiblityStyle = "hiddenElementStyle";
  }


  return (
    <div >
      <div >
        <div className="borderUsersList">
          Search <input type="text" onChange={e => onSerachUsers(e)} ref={textSearchInputRef} />
          <button className="yellowButton flotRight" type="button" onClick={onAddUser} >
            <Link to={`/addUser`}>Add</Link>
          </button>
          <UserListComponent users={users} 
            updateUsersListCallback={updateUserObject => updateUsersList(updateUserObject)}
            deleteUserCallback={userId => deleteUser(userId)}
            updatePostsTodosCallback={(isUserClickedToBringDataOnTodos) => updatePostsTodos(isUserClickedToBringDataOnTodos)} />
        </div>


        <div className="wrappper">
          <Switch>

           <Route path="/reload" component={null} key="reload" />

           <Route  path="/todoAndPostList/:userId" render={(props) =>
              <div className={`${todosPostsVisiblityStyle}`}>
                  <TodoListComponent  {...props} /> <br />
                  <PostListComponent  {...props} /><br />
              </div>
            }
            />
            <Route exact path="/todoNew/:userId" render={(props) =>
              <div className={`${todosPostsVisiblityStyle}`}>
                <AddTodoComponent   {...props} /> <br />
                <TodoListComponent  {...props} />
              </div>
            }
            />
            <Route exact path="/postNew/:userId" render={(props) =>
              <div className={`${todosPostsVisiblityStyle}`}>
                <AddPostComponent  {...props} /> <br />
                <PostListComponent  {...props} />
              </div>
            }
            />
            <Route exact path="/addUser" render={(props) =>
              <div className={`${addUserVisiblityStyle}`}>
                <AddUserComponent  updateFromAddUserCallback={(addUser) => updateFromAddUser(addUser)}
                 {...props} /> <br />
              </div>
            }
            />
             <Route exact path="/" render={(props) =>
              <div >
              </div>
              }
            />
          </Switch>
        </div>

      </div>
    </div>
  );
}

export default MainComponent;
