import React, { useContext, useEffect, useState, useCallback } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate, Link } from "react-router-dom";
import { fetchAllPosts } from "../../service/PostService";
import DOMPurify from "dompurify";
import { FiCalendar, FiTag, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdVerified } from "react-icons/md";

const PostDisplay = () => {
  const { postsByPage, storePosts, totalPages, loading: contextLoading } = useContext(StoreContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchPosts = useCallback(
    async (page) => {
      if (postsByPage[page]) return;

      setLoading(true);
      try {
        const data = await fetchAllPosts(page - 1, 10);
        if (data && Array.isArray(data.content)) {
          storePosts(page, data.content, data.totalPages);
        } else {
          console.warn("Unexpected post data format:", data);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    },
    [postsByPage, storePosts]
  );

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, fetchPosts]);

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleAuthorClick = (e, authorName, authorId) => {
    e.stopPropagation();
     navigate(`/author-profile/${authorId}/${encodeURIComponent(authorName)}`);
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

  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    const visiblePages = pages.slice(startPage - 1, endPage);

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          className="px-4 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 transition-all duration-200 flex items-center gap-2 font-semibold"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          <FiChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="hidden sm:flex items-center gap-2">
          {startPage > 1 && (
            <>
              <button
                className="px-4 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-200 font-semibold"
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              {startPage > 2 && <span className="text-gray-400">...</span>}
            </>
          )}

          {visiblePages.map((page) => (
            <button
              key={page}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                page === currentPage
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "bg-white border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="text-gray-400">...</span>}
              <button
                className="px-4 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-200 font-semibold"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <div className="sm:hidden text-sm font-semibold text-gray-600">
          Page {currentPage} of {totalPages}
        </div>

        <button
          className="px-4 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-200 transition-all duration-200 flex items-center gap-2 font-semibold"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
          <FiChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  const posts = postsByPage[currentPage] || [];

  const renderPostTags = (tags) => {
    if (!tags || !tags.length) return null;
    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.slice(0, 4).map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-200"
          >
            <FiTag className="w-3 h-3" />
            {tag}
          </span>
        ))}
        {tags.length > 4 && (
          <span className="inline-flex items-center bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
            +{tags.length - 4} more
          </span>
        )}
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Latest Posts
          </h1>
          <p className="text-gray-600 text-lg">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
        </div>

        {/* Loading State */}
        {(loading || contextLoading) && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="space-y-6">
          {posts.map(
            (post) =>
              post && (
                <article
                  key={post.publicId}
                  className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100"
                  onClick={() => handlePostClick(post.publicId)}
                >
                  <div className="p-6 md:p-8">
                    {/* Author Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        onClick={(e) => handleAuthorClick(e, post.authorName, post.authorId)}
                        className="relative cursor-pointer transform transition-transform duration-200 hover:scale-110"
                      >
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAuthorColor(
                            post.authorName
                          )} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                        >
                          {getAuthorInitial(post.authorName)}
                        </div>
                        {/* Verification Badge */}
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                          <MdVerified className="w-4 h-4 text-blue-500" />
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            onClick={(e) => handleAuthorClick(e, post.authorName, post.authorId)}
                            className="font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            {post.authorName}
                          </span>
                          <MdVerified className="w-4 h-4 text-blue-500" />
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <FiCalendar className="w-3.5 h-3.5" />
                            {new Date(post.updatedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                          <span className=" h-8 inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold rounded-full shadow-sm">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Post Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Post Preview */}
                    <div
                      className="text-gray-600 leading-relaxed mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.preview) }}
                    />

                    {/* Tags */}
                    {renderPostTags(post.tags)}

                    {/* Read More Link */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <Link
                        to={`/posts/${post.publicId}`}
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all duration-200 group/link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Read full article
                        <svg
                          className="w-5 h-5 group-hover/link:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              )
          )}
        </div>

        {/* Empty State */}
        {!loading && !contextLoading && posts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600">Check back later for new content!</p>
          </div>
        )}

        {/* Pagination */}
        {renderPagination()}
      </div>
    </section>
  );
};

export default PostDisplay;