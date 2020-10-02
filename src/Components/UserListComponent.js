import React, { useState }  from 'react';

import UserComponent from './UserComponent'

function UserListComponent(props) {

  const  [userId, setUserId] = useState("");

  const updateUsersList = (updateUserObject) => {
    props.updateUsersListCallback(updateUserObject);
  }

  const deleteUser = (userId) => {
    props.deleteUserCallback(userId);
  }

  const updatePostsTodos = (userId, isUserClickedToBringDataOnTodos) => {
    props.updatePostsTodosCallback(isUserClickedToBringDataOnTodos);
    setUserId(userId);
  }

  return (
    <div >
      {
        props.users.map((user, index) => {
          return <UserComponent key={user.id} user={user} userId = {userId}
           updateUserCallback={updateUserObject=> updateUsersList(updateUserObject)}
           deleteUserCallback={userId=> deleteUser(userId)}
           onClickOnUserIdCallback={(userId,isUserClickedToBringDataOnTodos) => updatePostsTodos(userId, isUserClickedToBringDataOnTodos)}
           />
        })}
    </div>
  );
}

export default UserListComponent;
