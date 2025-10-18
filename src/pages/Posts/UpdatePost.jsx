import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { fetchPostById, updatePost } from "../../service/PostService";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FiEdit3, FiTag, FiFolder, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

const UpdatePost = () => {
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();
  const { postId } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fetching, setFetching] = useState(true);

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

  // Fetch existing post data by ID
  useEffect(() => {
    const loadPost = async () => {
      try {
        const post = await fetchPostById(postId, token);
        if (post) {
          setTitle(post.title || "");
          setContent(post.content || "");
          setCategory(post.category || "");
          setTags(post.tags || []);
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post details. Please try again.");
      } finally {
        setFetching(false);
      }
    };
    if (postId && token) loadPost();
  }, [postId, token]);

  // Add tag on Enter or comma
  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput("");
      }
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Update Post
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !category) {
      setError("Title, content, and category are required.");
      toast.warn("Title, content, and category are required.");
      return;
    }

    setLoading(true);
    try {
      const postData = { title, content, category, tags };
      await updatePost( postData, token, postId);
      toast.success("post updated succcessfully...");
      navigate("/profile");
      window.location.reload();
    } catch (err) {
      console.error("Error updating post:", err);
      setError("Failed to update post. Please try again.");
      toast.error("Failed to update post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-gray-600 flex items-center gap-2">
          <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 
              1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading post details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiEdit3 className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Post</h1>
              <p className="text-gray-600 text-sm">Update your published content</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start gap-3 animate-pulse">
              <svg className="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 
                  00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 
                  101.414 1.414L10 11.414l1.293 1.293a1 1 0 
                  001.414-1.414L11.414 10l1.293-1.293a1 1 0 
                  00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="text-red-800 font-semibold">Error</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FiEdit3 className="text-blue-600" />
                Post Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 
                focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-lg"
                placeholder="Enter post title..."
              />
            </div>

            {/* Category & Tags */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Category */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FiFolder className="text-blue-600" />
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 
                  focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none appearance-none bg-white cursor-pointer"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FiTag className="text-blue-600" />
                  Tags
                  <span className="text-xs text-gray-500 font-normal">(Press Enter or comma)</span>
                </label>
                <div className="border-2 border-gray-200 rounded-xl px-3 py-2 min-h-[48px] 
                focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                  <div className="flex flex-wrap items-center gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1 
                        rounded-full text-sm font-medium flex items-center gap-1.5 shadow-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                        >
                          <FiX className="w-3.5 h-3.5" />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      className="flex-1 min-w-[120px] border-none outline-none py-1 text-sm"
                      placeholder={tags.length ? "Add more..." : "Add tags..."}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 
                    002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 
                    2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Content
              </label>
              <div className="border-2 border-gray-200 rounded-xl overflow-hidden 
              focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  style={{ height: "400px" }}
                />
              </div>
              <div className="h-12"></div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(`/post/${postId}`)}
                className="px-6 py-3 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl 
                hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transform 
                transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 
                        0 5.373 0 12h4zm2 5.291A7.962 7.962 
                        0 014 12H0c0 3.042 1.135 5.824 3 
                        7.938l3-2.647z"
                      />
                    </svg>
                    Updating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Update Post
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePost;
