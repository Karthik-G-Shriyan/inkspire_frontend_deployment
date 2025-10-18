import axios from "axios";

const COMMENT_API = "http://localhost:8080/api/comments";

// Fetch all comments for a post
export const fetchCommentsByPost = async (postId, token) => {
  try {
    const response = await axios.get(`${COMMENT_API}/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // array of comments
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

// Add a comment to a post
export const addCommentToPost = async (postId, commentData, token) => {
  try {
    const response = await axios.post(`${COMMENT_API}/${postId}`, commentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // message
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

// Delete a comment
export const deleteComment = async (commentId, token) => {
  try {
    await axios.delete(`${COMMENT_API}/delete/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
