import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import { FiCalendar, FiTrash2, FiEye, FiArrowLeft } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { fetchAllComments, deleteComment } from "../AdminService";


const CommentsDisplayAdmin = () => {
  const { token } = useContext(StoreContext);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const navigate = useNavigate();

 

  const fetchComments = async () => {
    setLoading(true);
    try {
      const data = await fetchAllComments(token);
      if (data && Array.isArray(data)) {
        setComments(data);
      } else {
        console.warn("Unexpected comment data format:", data);
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteComment = async (commentPublicId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    setDeletingCommentId(commentPublicId);
    try {
      await deleteComment(commentPublicId, token);
      setComments((prev) => prev.filter((comment) => comment.commentId !== commentPublicId));
      toast.success("Comment deleted successfully!");
    } catch (err) {
      console.error("Error deleting comment:", err);
      toast.error("Failed to delete comment. Please try again.");
    } finally {
      setDeletingCommentId(null);
    }
  };

  const handleViewPost = (postId) => {
    navigate(`/posts/${postId}`);
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

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">

         {/* Back Button */}
                <button
                  onClick={() => navigate(-1)}
                  className="mb-6 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  Back
                </button>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            All Comments
          </h1>
          <p className="text-gray-600 text-lg">
            Manage and moderate user comments across all posts.
          </p>

          
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <article
              key={comment.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-6">
                {/* Comment Header - Author Info */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br ${getAuthorColor(
                          comment.writerName
                        )} flex items-center justify-center text-white font-bold text-sm shadow-md`}
                      >
                        {getAuthorInitial(comment.writerName)}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5">
                        <MdVerified className="w-3 h-3 text-blue-500" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          {comment.writerName}
                        </span>
                        <MdVerified className="w-3.5 h-3.5 text-blue-500" />
                      </div>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <FiCalendar className="w-3 h-3" />
                        {new Date(comment.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleViewPost(comment.postId)}
                      className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center gap-2 font-semibold text-sm"
                      title="View post"
                    >
                      <FiEye className="w-4 h-4" />
                      <span className="hidden sm:inline">View Post</span>
                    </button>

                    <button
                      onClick={() => handleDeleteComment(comment.commentId)}
                      disabled={deletingCommentId === comment.commentId}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 flex items-center gap-2 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete comment"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">
                        {deletingCommentId === comment.commentId ? "Deleting..." : "Delete"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Post Reference */}
                <div className="mb-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                  <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">
                    Comment on post ID:
                  </span>
                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    {comment.postId}
                  </p>
                </div>

                {/* Comment Content */}
                <div className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p>{comment.content}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {!loading && comments.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No comments yet</h3>
            <p className="text-gray-600">Comments will appear here as users engage with posts.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommentsDisplayAdmin;