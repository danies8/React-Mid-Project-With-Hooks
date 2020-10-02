import axios from 'axios';
const baseAddress = "http://localhost:4002/users";

const getAllUsers = () => {
  return axios.get(baseAddress);
}

const updateUser = async (userId, updateUser) => {
  return  await axios.put(`${baseAddress}/${userId}`, updateUser);
} 

const deleteUser = async (userId) => {
  return  await axios.delete(`${baseAddress}/${userId}`);
}

const addUser = async (newUser) => {
   return await axios.post(`${baseAddress}`, newUser);
 }

 const getNextUserId = async () => {
   let res =   await axios.get(`${baseAddress}`);
  let maxUserId = res.data.map(user => user.id).sort((a, b) => a - b)[
    res.data.length - 1
  ]
  return maxUserId + 1;
}

export default {getAllUsers, updateUser, deleteUser, addUser, getNextUserId};