import React, { useState, useEffect } from 'react';
import { fetchCommentsByPost, addComment, updateComment, deleteComment } from '../services/commentService';

const CommentsSection = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    // Fetch comments for the post
    useEffect(() => {
        const loadComments = async () => {
            try {
                const response = await fetchCommentsByPost(postId);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        loadComments();
    }, [postId]);

    // Handle adding a new comment
    const handleAddComment = async () => {
        try {
            const commentData = { text: newComment };
            await addComment(postId, commentData);
            setNewComment("");
            // Reload comments after adding
            const response = await fetchCommentsByPost(postId);
            setComments(response.data);
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    // Handle updating a comment
    const handleUpdateComment = async (commentId, updatedText) => {
        try {
            const updatedData = { text: updatedText };
            await updateComment(commentId, updatedData);
            // Reload comments after update
            const response = await fetchCommentsByPost(postId);
            setComments(response.data);
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    // Handle deleting a comment
    const handleDeleteComment = async (commentId) => {
        try {
            await deleteComment(commentId);
            // Reload comments after deletion
            const response = await fetchCommentsByPost(postId);
            setComments(response.data);
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (
        <div>
            <h2>Comments</h2>
            <div>
                {comments.map((comment) => (
                    <div key={comment.id}>
                        <p>{comment.text}</p>
                        <button onClick={() => handleUpdateComment(comment.id, "Updated comment text")}>Update</button>
                        <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                    </div>
                ))}
            </div>

            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
            />
            <button onClick={handleAddComment}>Add Comment</button>
        </div>
    );
};

export default CommentsSection;
