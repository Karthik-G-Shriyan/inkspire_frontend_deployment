import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPostById } from "../../service/PostService";
import { StoreContext } from "../../Context/StoreContext";
import Comments from "../Comment/Comments";
import { FiCalendar, FiTag, FiSun, FiMoon, FiArrowLeft } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import DOMPurify from "dompurify";

const PostDetails = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { token } = useContext(StoreContext);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const data = await fetchPostById(postId, token);
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, token]);

  const handleAuthorClick = () => {
    if (post?.authorId ) {
      navigate(`/author-profile/${post.authorId}/${encodeURIComponent(post.authorName)}`);
    }
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

  const renderTags = (tags) => {
    if (!tags || !tags.length) return null;
    return (
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold ${
              isDarkMode
                ? "bg-blue-900/30 text-blue-300 border border-blue-700 "
                : "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200"
            }`}
          >
            <FiTag className="w-3.5 h-3.5" />
            {tag}
          </span>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Post not found</h3>
          <p className="text-gray-600 mb-6">The post you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-900"
          : "bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50"
      }`}
    >
      {/* Fixed Theme Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed top-40 right-10 z-50 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 ${
          isDarkMode
            ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
            : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
        aria-label="Toggle theme"
      >
        {isDarkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
      </button>

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 font-semibold transition-colors duration-200 ${
            isDarkMode
              ? "text-blue-400 hover:text-blue-300"
              : "text-blue-600 hover:text-blue-700"
          }`}
        >
          <FiArrowLeft className="w-5 h-5" />
          Back to posts
        </button>
      </div>

      {/* Article Container */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        <div
          className={`rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="p-8 md:p-12">
            {/* Category Badge */}
            <div className="mb-6">
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${
                  isDarkMode
                    ? "bg-blue-900/50 text-blue-300 border border-blue-700"
                    : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200"
                }`}
              >
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1
              className={`text-4xl md:text-5xl font-bold mb-8 leading-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {post.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div
                onClick={handleAuthorClick}
                className="relative cursor-pointer transform transition-transform duration-200 hover:scale-110"
              >
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${getAuthorColor(
                    post.authorName
                  )} flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                >
                  {getAuthorInitial(post.authorName)}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-0.5">
                  <MdVerified className="w-5 h-5 text-blue-500" />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    onClick={handleAuthorClick}
                    className={`text-lg font-bold cursor-pointer transition-colors ${
                      isDarkMode
                        ? "text-white hover:text-blue-400"
                        : "text-gray-900 hover:text-blue-600"
                    }`}
                  >
                    {post.authorName}
                  </span>
                  <MdVerified className="w-5 h-5 text-blue-500" />
                </div>
                <div
                  className={`flex items-center gap-3 text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <FiCalendar className="w-4 h-4" />
                    {new Date(post.updatedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                  <span>{Math.ceil(post.content?.length / 1000) || 5} min read</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {renderTags(post.tags)}

            {/* Content */}
            <div
              className={`prose prose-lg max-w-none transition-colors duration-300 ${isDarkMode ? "prose-invert text-white" : "text-gray-900"

              }`}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
            />
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12">
          <Comments postId={postId} token={token} isDarkMode={isDarkMode} />
        </div>
      </article>
    </div>
  );
};

export default PostDetails;