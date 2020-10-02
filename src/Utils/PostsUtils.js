import axios from 'axios';
const baseAddress = "http://localhost:4002/posts";

 const getAllPostsByUserId = async (userId) => {
  let posts =  await axios.get(baseAddress);
  return posts.data.filter(post => post.userId == userId);
} 

const addPost = async (newPost) => {
  return  await axios.post(`${baseAddress}`, newPost);
 }

export default {getAllPostsByUserId, addPost};