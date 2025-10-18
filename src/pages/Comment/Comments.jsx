import React, { useState, useEffect, useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { fetchCommentsByPost, addCommentToPost, deleteComment } from "../../service/CommentService";
import { MessageCircle, Trash2, Send } from "lucide-react";

const Comments = ({ postId, isDarkMode = false }) => {
  const { token, publicId } = useContext(StoreContext);
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  
  // Get logged-in user's publicId from sessionStorage
  const loggedInUserId = publicId;

  // Fetch comments on mount
  useEffect(() => {
    const loadComments = async () => {
      setLoading(true);
      try {
        const data = await fetchCommentsByPost(postId, token);
        // Sort comments: user's comments first, then by date
        const sortedComments = (data || []).sort((a, b) => {
          if (a.writerPublicId === loggedInUserId && b.writerPublicId !== loggedInUserId) return -1;
          if (a.writerPublicId !== loggedInUserId && b.writerPublicId === loggedInUserId) return 1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setComments(sortedComments);
      } catch (err) {
        console.error("Error loading comments:", err);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [postId, token, loggedInUserId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setPosting(true);
    try {
      const savedComment = await addCommentToPost(postId, { postId, content: newComment }, token);
      // Add new comment to the top
      const newCommentObj = {
        writerName: "You",
        writerPublicId: loggedInUserId,
        content: newComment,
        postId,
        createdAt: new Date().toISOString()
      };
      setComments((prev) => [newCommentObj, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async (commentId, index) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    
    setDeletingId(index);
    try {
      await deleteComment(commentId, token);
      setComments((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error("Error deleting comment:", err);
      alert("Failed to delete comment. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const getTimeAgo = (createdAt) => {
    if (!createdAt) return "just now";
    
    const now = new Date();
    const commentDate = new Date(createdAt);
    const diffInSeconds = Math.floor((now - commentDate) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
    return `${Math.floor(diffInSeconds / 31536000)}y ago`;
  };

  const getAuthorInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  const getAuthorColor = (name) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-purple-500 to-purple-600",
      "from-pink-500 to-pink-600",
      "from-green-500 to-green-600",
      "from-yellow-500 to-yellow-600",
      "from-red-500 to-red-600",
      "from-indigo-500 to-indigo-600",
      "from-teal-500 to-teal-600",
    ];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  const isUserComment = (comment) => {
    return comment.writerPublicId === loggedInUserId;
  };

  return (
    <div className={`rounded-2xl shadow-xl overflow-hidden transition-colors duration-300 ${
      isDarkMode ? "bg-gray-800" : "bg-white"
    }`}>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className={`p-2 rounded-full ${
            isDarkMode ? "bg-blue-900/30" : "bg-blue-100"
          }`}>
            <MessageCircle className={`w-6 h-6 ${
              isDarkMode ? "text-blue-400" : "text-blue-600"
            }`} />
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}>
              Comments
            </h2>
            <p className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </p>
          </div>
        </div>

        {/* Comment Input Form */}
        {token && (
          <form onSubmit={handleSubmit} className="mb-8">
            <div className={`rounded-xl border-2 overflow-hidden transition-all duration-200 ${
              isDarkMode
                ? "border-gray-700 focus-within:border-blue-500"
                : "border-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
            }`}>
              <textarea
                className={`w-full px-4 py-3 outline-none resize-none transition-colors duration-200 ${
                  isDarkMode
                    ? "bg-gray-900 text-gray-200 placeholder-gray-500"
                    : "bg-white text-gray-900 placeholder-gray-400"
                }`}
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              <div className={`flex items-center justify-between px-4 py-3 ${
                isDarkMode ? "bg-gray-900 border-t border-gray-700" : "bg-gray-50 border-t border-gray-200"
              }`}>
                <p className={`text-xs ${
                  isDarkMode ? "text-gray-500" : "text-gray-500"
                }`}>
                  {newComment.length}/500 characters
                </p>
                <button
                  type="submit"
                  disabled={posting || !newComment.trim()}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md"
                >
                  {posting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Post Comment
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Comments List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              isDarkMode ? "bg-gray-700" : "bg-gray-100"
            }`}>
              <MessageCircle className={`w-8 h-8 ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`} />
            </div>
            <p className={`font-semibold mb-1 ${
              isDarkMode ? "text-gray-300" : "text-gray-900"
            }`}>
              No comments yet
            </p>
            <p className={`text-sm ${
              isDarkMode ? "text-gray-500" : "text-gray-600"
            }`}>
              Be the first to share your thoughts!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments
              .filter(c => c && c.content)
              .map((comment, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-5 transition-all duration-200 border ${
                    isUserComment(comment)
                      ? isDarkMode
                        ? "bg-blue-900/20 border-blue-700/50"
                        : "bg-blue-50 border-blue-200"
                      : isDarkMode
                        ? "bg-gray-900/50 border-gray-700"
                        : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${getAuthorColor(
                        comment.writerName
                      )} flex items-center justify-center text-white font-bold shadow-md`}
                    >
                      {getAuthorInitial(comment.writerName)}
                    </div>

                    {/* Comment Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}>
                            {comment.writerName}
                          </span>
                          {isUserComment(comment) && (
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                              isDarkMode
                                ? "bg-blue-900/50 text-blue-300"
                                : "bg-blue-100 text-blue-700"
                            }`}>
                              You
                            </span>
                          )}
                          <span className={`text-xs ${
                            isDarkMode ? "text-gray-500" : "text-gray-500"
                          }`}>
                            •
                          </span>
                          <span className={`text-xs ${
                            isDarkMode ? "text-gray-500" : "text-gray-500"
                          }`}>
                            {getTimeAgo(comment.createdAt)}
                          </span>
                        </div>

                        {/* Delete Button - Only for user's own comments */}
                        {isUserComment(comment) && (
                          <button
                            onClick={() => handleDelete(comment.id, idx)}
                            disabled={deletingId === idx}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                              isDarkMode
                                ? "hover:bg-red-900/30 text-red-400 hover:text-red-300"
                                : "hover:bg-red-50 text-red-600 hover:text-red-700"
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                            title="Delete comment"
                          >
                            {deletingId === idx ? (
                              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                  fill="none"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                              </svg>
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>

                      <p className={`text-sm leading-relaxed break-words ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;