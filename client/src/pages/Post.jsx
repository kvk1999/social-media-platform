import React, { useState, useEffect } from 'react';
import { fetchPosts, createPost, deletePost } from "../services/postService"; // Check if the path is correct
import { fetchCommentsByPost, addComment, updateComment, deleteComment } from '../services/commentService'; 
import { likePost, unlikePost, likeComment, unlikeComment } from '../services/likeService';

const Post = ({ postId }) => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const loadPost = async () => {
            // Fetch the post by postId
            const response = await fetchPosts(postId);
            setPost(response.data);
        };

        const loadComments = async () => {
            // Fetch comments for the post
            const response = await fetchCommentsByPost(postId);
            setComments(response.data);
        };

        loadPost();
        loadComments();
    }, [postId]);

    // Handle liking a post
    const handleLikePost = async () => {
        try {
            await likePost(postId);
            // Reload post data after liking
            const response = await fetchPosts(postId);
            setPost(response.data);
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    // Handle unliking a post
    const handleUnlikePost = async () => {
        try {
            await unlikePost(postId);
            // Reload post data after unliking
            const response = await fetchPosts(postId);
            setPost(response.data);
        } catch (error) {
            console.error("Error unliking post:", error);
        }
    };

    // Handle liking a comment
    const handleLikeComment = async (commentId) => {
        try {
            await likeComment(commentId);
            // Reload comments after liking
            const response = await fetchCommentsByPost(postId);
            setComments(response.data);
        } catch (error) {
            console.error("Error liking comment:", error);
        }
    };

    // Handle unliking a comment
    const handleUnlikeComment = async (commentId) => {
        try {
            await unlikeComment(commentId);
            // Reload comments after unliking
            const response = await fetchCommentsByPost(postId);
            setComments(response.data);
        } catch (error) {
            console.error("Error unliking comment:", error);
        }
    };

    return (
        <div>
            {post && (
                <div>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <button onClick={handleLikePost}>Like Post</button>
                    <button onClick={handleUnlikePost}>Unlike Post</button>
                </div>
            )}

            <div>
                <h3>Comments</h3>
                {comments.map((comment) => (
                    <div key={comment.id}>
                        <p>{comment.text}</p>
                        <button onClick={() => handleLikeComment(comment.id)}>Like Comment</button>
                        <button onClick={() => handleUnlikeComment(comment.id)}>Unlike Comment</button>
                    </div>
                ))}
            </div>

            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
            />
            <button onClick={() => addComment(postId, { text: newComment })}>Add Comment</button>
        </div>
    );
};

export default Post;
