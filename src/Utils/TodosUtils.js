import axios from 'axios';
 const baseAddress = "http://localhost:4002/todos";

 const getAllTodosByUserId = async (userId) => {
  let todos =  await axios.get(baseAddress);
  return todos.data.filter(todo => todo.userId == userId);
} 

const markTodoCompletedByUserId = async (updatedTodo) => {
 return  await axios.put(`${baseAddress}/${updatedTodo.id}`, updatedTodo);
} 

const addTodo = async (newTodo) => {
   return  await axios.post(`${baseAddress}`, newTodo);
 } 

export default {getAllTodosByUserId, markTodoCompletedByUserId, addTodo};