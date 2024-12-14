// src/pages/PostPage.jsx
import React, { useEffect, useState } from 'react';
import { fetchPost, fetchComments } from '../services/postservice';

const Post = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPost = await fetchPost(postId);
      setPost(fetchedPost);
      const fetchedComments = await fetchComments(postId);
      setComments(fetchedComments);
    };
    fetchData();
  }, [postId]);

  return (
    <div>
      {post && (
        <div>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      )}
      <div>
        <h3>Comments:</h3>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
