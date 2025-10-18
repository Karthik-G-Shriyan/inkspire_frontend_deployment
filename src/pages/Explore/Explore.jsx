import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchPostsByCategoryAndQuery } from "../../service/PostService";
import { FiSearch, FiFilter, FiCalendar, FiTag } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import DOMPurify from "dompurify";
import Footer from "../../components/Footer/Footer";

const Explore = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const categories = [
    "Technology",
    "Travel",
    "Health & Wellness",
    "Education",
    "Lifestyle",
    "Business",
    "Food",
    "Entertainment",
    "Science",
    "Sports",
  ];

  const handleSearch = async () => {
    setLoading(true);
    setHasSearched(true);
    try {
      const result = await fetchPostsByCategoryAndQuery(query, category);
      setPosts(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleAuthorClick = (e, authorName) => {
    e.stopPropagation();
    navigate("/author-profile", { state: { authorName } });
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
   <>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl transform rotate-3">
              <FiSearch className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Explore Posts
          </h1>
          <p className="text-gray-600 text-lg">
            Search and discover content across all categories
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400 w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Search for posts, topics, keywords..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-lg"
              />
            </div>

            {/* Category & Search Button Row */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiFilter className="text-gray-400 w-5 h-5" />
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-12 pr-10 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none appearance-none bg-white cursor-pointer"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <button
                onClick={handleSearch}
                className="sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <FiSearch className="w-5 h-5" />
                Search Posts
              </button>
            </div>

            {/* Active Filters */}
            {(query || category) && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-sm text-gray-600 font-medium">Active filters:</span>
                {query && (
                  <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Search: "{query}"
                    <button onClick={() => setQuery("")} className="hover:bg-blue-200 rounded-full p-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {category && (
                  <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Category: {category}
                    <button onClick={() => setCategory("")} className="hover:bg-indigo-200 rounded-full p-0.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-600 font-semibold">Searching posts...</p>
            </div>
          </div>
        ) : hasSearched ? (
          posts.length > 0 ? (
            <div className="space-y-6">
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Found {posts.length} {posts.length === 1 ? "post" : "posts"}
                </h2>
              </div>

              {/* Posts Grid */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <article
                    key={post.publicId}
                    className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100"
                    onClick={() => handlePostClick(post.publicId)}
                  >
                    <div className="p-6 md:p-8">
                      {/* Author Info */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          onClick={(e) => handleAuthorClick(e, post.authorName)}
                          className="relative cursor-pointer transform transition-transform duration-200 hover:scale-110"
                        >
                          <div
                            className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAuthorColor(
                              post.authorName
                            )} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                          >
                            {getAuthorInitial(post.authorName)}
                          </div>
                          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                            <MdVerified className="w-4 h-4 text-blue-500" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              onClick={(e) => handleAuthorClick(e, post.authorName)}
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
                            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold rounded-full shadow-sm">
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
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiSearch className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or explore different categories
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("");
                  setPosts([]);
                  setHasSearched(false);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                Clear Filters
              </button>
            </div>
          )
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiSearch className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Start exploring</h3>
            <p className="text-gray-600">
              Enter a search term or select a category to discover amazing content
            </p>
          </div>
        )}
      </div>
    </div>
    <Footer/>
   </>
  );
};

export default Explore;