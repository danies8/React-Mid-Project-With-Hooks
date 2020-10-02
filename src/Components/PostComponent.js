import React  from 'react';

import './PostComponent.css';

function PostComponent(props) {

  return (
    <div>
    <div className="borderPostStyle">
      Title: {props.post.title} <br />
      Body: {props.post.body}
    </div>
    </div>
  );
}

export default PostComponent;
