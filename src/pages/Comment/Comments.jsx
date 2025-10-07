// src/components/Comments.jsx
import React from "react";
import { MessageCircle } from "lucide-react";

const Comments = ({ comments }) => {
  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <MessageCircle size={20} /> Comments ({comments.length})
      </h2>

      <div className="space-y-2">
        {comments.length === 0 && (
          <p className="text-gray-500">No comments yet. Be the first!</p>
        )}
        {comments.map((c, idx) => (
          <div key={idx} className="p-3 bg-gray-50 rounded-md border">
            <p className="font-semibold">{c.user}</p>
            <p className="text-gray-700">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
