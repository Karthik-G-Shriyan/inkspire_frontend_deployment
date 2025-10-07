// src/components/PostPage.jsx
import React, { useState } from "react";
import PostContent from "../Posts/PostContent";
import PostActions from "../Posts/PostActions";
import Comments from "../Comment/Comments";
import CommentForm from "../Comment/CommentForm";

const PostPage = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || 0);
  const [dislikes, setDislikes] = useState(post.dislikes || 0);
  const [comments, setComments] = useState(post.comments || []);

  const handleAddComment = (text) => {
    setComments([...comments, { user: "You", text }]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <PostContent post={post} />
      <PostActions
        likes={likes}
        dislikes={dislikes}
        onLike={() => setLikes(likes + 1)}
        onDislike={() => setDislikes(dislikes + 1)}
      />
      <Comments comments={comments} />
      <CommentForm onAddComment={handleAddComment} />
    </div>
  );
};

export default PostPage;
