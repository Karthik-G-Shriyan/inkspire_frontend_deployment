import axios from "axios";

const API_URL = "https://inkspire-backend-deployment-374341519167.asia-south1.run.app/api/posts";


export const fetchAllPosts = async (page , size ) => {
  try {
    const response = await axios.get(API_URL, {
      params: { page, size },
    });
    return response.data; // return the data to caller
  } catch (error) {
    console.error("Error while fetching all posts:", error);
    throw error;
  }
};

export const fetchPostById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // return the full post response
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw error;
  }
};

export const createPost = async (postData, token) => {
 try {
   const response = await axios.post("https://inkspire-backend-deployment-374341519167.asia-south1.run.app/api/posts/create", postData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
 } catch (error) {
  console.error("Error while posting new Post", error);
    throw error;
 }
};


export const updatePost = async (postData, token, postId) => {
  try {
    const response = await axios.put(
      `https://inkspire-backend-deployment-374341519167.asia-south1.run.app/api/posts/update/${postId}`,
      postData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while updating post:", error);
    throw error;
  }
};


export const getUserPosts = async (token, userId) => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Array of posts
  } catch (error) {
    console.error("Error fetching user's posts:", error);
    throw error;
  }
};

export async function fetchPostsByCategoryAndQuery(query = "", category = "") {
  try {
    const params = new URLSearchParams();
    if (query) params.append("search", query);
    if (category) params.append("category", category);

    const response = await fetch(`${API_URL}/search?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch posts");

    const data = await response.json();

    // Ensure it's always an array
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};


// Delete a post by ID
export const deletePost = async (postId, token) => {
  try {
    const res = await axios.delete(`${API_URL}/delete/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    return null;
  }
};
