import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import postsUtils from '../Utils/PostsUtils.js';
import PostComponent from './PostComponent';
import './PostListComponent.css';


function PostListComponent(props) {

  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
   const getAllPostsByUserId = async function() {
      let userId = props.match.params.userId;
      let posts = await postsUtils.getAllPostsByUserId(userId);
      await setUserId(userId);
      await setPosts(posts.sort());
    }
    getAllPostsByUserId();
  
  }, [props.match.params.userId]);

  return (
    <div className="borderPostListStyle">
      Post- User {userId}
      <button className="yellowButton" type="button" >
        <Link to={`/postNew/${userId}`} >Add </Link>
      </button>
      {
        posts.map((post) => {
          return <PostComponent key={post.id} post={post} />
        })
      }
    </div>
  );
}

export default PostListComponent;
