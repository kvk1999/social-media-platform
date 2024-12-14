import React, { useEffect, useState } from 'react';
import { fetchPosts, createPost, deletePost } from '../services/postservice'; // Import post services
import { fetchCommentsByPost, addComment, updateComment, deleteComment } from '../services/commentService'; // Importing comment services
import { likePost, unlikePost, likeComment, unlikeComment } from '../services/likeService'; // Importing like services

const Post = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); // State to store comments
  const [newComment, setNewComment] = useState(''); // State to manage new comment input
  const [editingComment, setEditingComment] = useState(null); // State to track editing comment
  const [editedCommentText, setEditedCommentText] = useState(''); // State for edited comment text
  const [isPostLiked, setIsPostLiked] = useState(false); // State to track if the post is liked
  const [likedComments, setLikedComments] = useState(new Set()); // Set to track liked comments

  // Fetch post data and comments
  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Fetch post data (assuming getPostById is implemented)
        const response = await fetch(`/posts/${postId}`);
        setPost(response.data);
        setIsPostLiked(response.data.isLiked); // Assume the post data includes whether it's liked
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetchCommentsByPost(postId);
        setComments(response); // Set comments for the current post
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const commentData = { content: newComment };
        const addedComment = await addComment(postId, commentData);
        setComments([...comments, addedComment]); // Add new comment to state
        setNewComment(''); // Clear the new comment input
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  // Handle updating a comment
  const handleUpdateComment = async () => {
    if (editedCommentText.trim()) {
      try {
        const updatedData = { content: editedCommentText };
        const updatedComment = await updateComment(editingComment.id, updatedData);
        setComments(comments.map(comment => (comment.id === updatedComment.id ? updatedComment : comment))); // Update the comment in state
        setEditingComment(null); // Stop editing mode
        setEditedCommentText(''); // Clear the edited text
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId); // Delete comment by ID
      setComments(comments.filter(comment => comment.id !== commentId)); // Remove the deleted comment from the state
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // Handle liking a post
  const handleLikePost = async () => {
    try {
      if (isPostLiked) {
        await unlikePost(postId);
        setIsPostLiked(false);
      } else {
        await likePost(postId);
        setIsPostLiked(true);
      }
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  // Handle liking a comment
  const handleLikeComment = async (commentId) => {
    try {
      if (likedComments.has(commentId)) {
        await unlikeComment(commentId);
        likedComments.delete(commentId);
      } else {
        await likeComment(commentId);
        likedComments.add(commentId);
      }
      setLikedComments(new Set(likedComments)); // Update the liked comments state
    } catch (error) {
      console.error('Error liking/unliking comment:', error);
    }
  };

  // Render the post and comments
  return (
    <div>
      {post && (
        <>
          <h1>{post.title}</h1>
          <p>{post.content}</p>

          {/* Like/Unlike Post */}
          <button onClick={handleLikePost}>
            {isPostLiked ? 'Unlike Post' : 'Like Post'}
          </button>

          <div>
            <h3>Comments</h3>
            {comments.length === 0 ? (
              <p>No comments yet</p>
            ) : (
              comments.map(comment => (
                <div key={comment.id} style={{ marginBottom: '20px' }}>
                  {editingComment?.id === comment.id ? (
                    <>
                      <textarea
                        value={editedCommentText}
                        onChange={(e) => setEditedCommentText(e.target.value)}
                        rows="4"
                        cols="50"
                      />
                      <button onClick={handleUpdateComment}>Update Comment</button>
                      <button onClick={() => setEditingComment(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <p>{comment.content}</p>

                      {/* Like/Unlike Comment */}
                      <button onClick={() => handleLikeComment(comment.id)}>
                        {likedComments.has(comment.id) ? 'Unlike Comment' : 'Like Comment'}
                      </button>

                      <button onClick={() => { setEditingComment(comment); setEditedCommentText(comment.content); }}>Edit</button>
                      <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Add new comment */}
          <div>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="4"
              cols="50"
              placeholder="Write a comment..."
            />
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;


