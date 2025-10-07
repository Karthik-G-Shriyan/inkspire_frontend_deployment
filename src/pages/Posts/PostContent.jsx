// src/components/PostContent.jsx
import React from "react";

const PostContent = ({ post }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-500 text-sm">
        By {post.author} on {post.date}
      </p>
      <div className="text-gray-700 whitespace-pre-line">{post.content}</div>
    </div>
  );
};

export default PostContent;
