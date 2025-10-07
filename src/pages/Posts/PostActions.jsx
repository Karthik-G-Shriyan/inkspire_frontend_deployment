// src/components/PostActions.jsx
import React from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";

const PostActions = ({ likes, dislikes, onLike, onDislike }) => {
  return (
    <div className="flex items-center gap-6 mt-4">
      <button
        onClick={onLike}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
      >
        <ThumbsUp size={18} /> Like
      </button>
      <span>{likes} Likes</span>

      <button
        onClick={onDislike}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        <ThumbsDown size={18} /> Dislike
      </button>
      <span>{dislikes} Dislikes</span>
    </div>
  );
};

export default PostActions;
