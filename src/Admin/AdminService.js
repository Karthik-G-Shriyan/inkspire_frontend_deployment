import axios from "axios";

const API_URL = "https://inkspire-backend-deployment-374341519167.asia-south1.run.app/api/admin";



export const loginAdmin = async (data) => {

    try {
        const response = await axios.post(
            API_URL + "/login", data
        );
        return response;
    }
    catch (error) {
        console.log("error while admin log in");
        throw error;
    }

}

// Delete a post by ID
export const deletePost = async (postId, token) => {
    try {
        const res = await axios.delete(`${API_URL}/posts/delete/${postId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error("Error deleting post:", error);
        return null;
    }
};

export const fetchAllComments = async (token) => {
    try {
        const res = await axios.get(`${API_URL}/comments`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error("Error deleting post:", error);
        return null;
    }
};


export const fetchAllUnsafePosts = async (token) => {
    try {
        const res = await axios.get(`${API_URL}/unsafe-posts`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error("Error deleting post:", error);
        return null;
    }
};
export const deleteComment = async (commentId, token) => {
    try {
        const res = await axios.delete(`${API_URL}/comments/delete/${commentId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.json();
    }catch (error) {
        console.error("Error deleting comment:", error);
        return null;
    }
  
};

export const fetchAllUsers = async (token) => {
    try {
        const res = await axios.get(`${API_URL}/all`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching all users:", error);
        return null;
    }
};