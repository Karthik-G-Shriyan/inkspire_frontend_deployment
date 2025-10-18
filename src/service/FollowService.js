// src/services/FollowService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/follow";

// Get followers
export const getFollowers = async ( token, userId) => {
  try {
    const res = await axios.get(`${API_URL}/${userId}/followers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching followers:", error);
    return [];
  }
};

// Get following
export const getFollowing = async ( token, userId) => {
  try {
    const res = await axios.get(`${API_URL}/${userId}/following`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching following:", error);
    return [];
  }
};

// Follow a user
export const followUser = async (userId, token) => {
  try {
    const res = await axios.post(`${API_URL}/${userId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error following user:", error);
    return null;
  }
};

// Unfollow a user
export const unfollowUser = async (userId, token) => {
  try {
    const res = await axios.delete(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error unfollowing user:", error);
    return null;
  }
};
