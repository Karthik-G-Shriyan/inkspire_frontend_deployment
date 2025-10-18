import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFollowers, getFollowing } from "../../service/FollowService";
import { getUserPosts, deletePost } from "../../service/PostService";
import { StoreContext } from "../../Context/StoreContext";
import { FiEdit, FiTrash2, FiUsers, FiUserPlus, FiCalendar, FiTag, FiX } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import DOMPurify from "dompurify";
import { toast } from "react-toastify";

const Profile = () => {
  const { token, publicId, userName } = useContext(StoreContext);
  const navigate = useNavigate();

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [posts, setPosts] = useState([]);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [deletingPostId, setDeletingPostId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fRes, fgRes, pRes] = await Promise.all([
          getFollowers(token, publicId),
          getFollowing(token, publicId),
          getUserPosts(token, publicId),
        ]);
        setFollowers(fRes);
        setFollowing(fgRes);
        setPosts(pRes);
      } catch (err) {
        console.error("Error loading profile data:", err);
      }
    };

    loadData();
  }, [token, publicId]);

  const handleDeletePost = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    setDeletingPostId(postId);
    try {
      await deletePost(postId, token);
      setPosts(posts.filter(p => p.publicId !== postId));
      toast.success("post deleted successfully..!");
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post. Please try again.");
      toast.error("error while deleting post. please try again..")
    } finally {
      setDeletingPostId(null);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          {/* Cover Background */}
          <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>

          {/* Profile Info */}
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6">
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                {/* Avatar */}
                <div className="relative">
                  <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${getAuthorColor(userName)} flex items-center justify-center text-white text-5xl font-bold shadow-xl border-4 border-white`}>
                    {userName?.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-lg">
                    <MdVerified className="w-6 h-6 text-blue-500" />
                  </div>
                </div>

                {/* Name and Stats */}
                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-3xl font-bold text-gray-900">{userName}</h1>
                    <MdVerified className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="text-gray-200 mb-3 ml-10 ">-Content Creator & Writer</p>

                  {/* Stats */}
                  <div className="flex gap-16 mt-4 ml-9">
                    <button
                      onClick={() => setShowFollowers(true)}
                      className="group text-center hover:scale-105 transition-transform duration-200"
                    >
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {followers.length}
                      </div>
                      <div className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Followers</div>
                    </button>
                    <button
                      onClick={() => setShowFollowing(true)}
                      className="group text-center hover:scale-105 transition-transform duration-200"
                    >
                      <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {following.length}
                      </div>
                      <div className="text-sm text-gray-600 group-hover:text-purple-600 transition-colors">Following</div>
                    </button>
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {posts.length}
                      </div>
                      <div className="text-sm text-gray-600">Posts</div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/create-post")}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md flex items-center gap-2"
              >
                <FiEdit className="w-4 h-4" />
                Create New Post
              </button>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">My Posts</h2>

          </div>

          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.publicId}
                  className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Post Content */}
                    <div className="flex-1 min-w-0">
                      {/* Category Badge */}
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold rounded-full shadow-sm">
                          <FiTag className="w-3 h-3" />
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                        {post.title}
                      </h3>

                      {/* Preview */}
                      <div
                        className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.preview) }}
                      />

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-semibold border border-blue-200"
                            >
                              <FiTag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="inline-flex items-center bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-xs font-semibold">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Meta Info */}
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-3.5 h-3.5" />
                          {new Date(post.updatedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>

                        <Link
                          to={`/posts/${post.publicId}`}
                          className="inline-flex items-center ml-10 mt-2 gap-2 text-sm text-green-800 font-bold hover:gap-3 transition-all duration-200 group/link"
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

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2">
                      <Link to={`/update-post/${post.publicId}`}>
                        <button
                          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center gap-2 font-semibold text-sm"
                          title="Edit post"
                        >
                          <FiEdit className="w-4 h-4" />
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeletePost(post.publicId)}
                        disabled={deletingPostId === post.publicId}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 flex items-center gap-2 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete post"
                      >
                        {deletingPostId === post.publicId ? (
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
                            Deleting
                          </>
                        ) : (
                          <>
                            <FiTrash2 className="w-4 h-4" />
                            Delete
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiEdit className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600 mb-6">Start sharing your thoughts with the world!</p>
              <button
                onClick={() => navigate("/create-post")}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg inline-flex items-center gap-2"
              >
                <FiEdit className="w-5 h-5" />
                Create Your First Post
              </button>
            </div>
          )}
        </div>

        {/* Followers Modal */}
        {showFollowers && (
          <Modal title="Followers" count={followers.length} onClose={() => setShowFollowers(false)}>
            {followers.length > 0 ? (
              followers.map((f) => (
                <UserRow key={f.id} publicId={f.publicId} name={f.userName} />
              ))
            ) : (
              <div className="text-center py-8">
                <FiUsers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No followers yet.</p>
              </div>
            )}
          </Modal>
        )}

        {/* Following Modal */}
        {showFollowing && (
          <Modal title="Following" count={following.length} onClose={() => setShowFollowing(false)}>
            {following.length > 0 ? (
              following.map((f) => (
                <UserRow key={f.id} publicId={f.publicId} name={f.username} />
              ))
            ) : (
              <div className="text-center py-8">
                <FiUserPlus className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Not following anyone yet.</p>
              </div>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};

/* --------------------------
   INTERNAL SUBCOMPONENTS
-------------------------- */

// Enhanced Modal
const Modal = ({ title, count, children, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
          {count !== undefined && (
            <p className="text-sm text-gray-600 mt-1">{count} {count === 1 ? 'person' : 'people'}</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <FiX className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {children}
      </div>
    </div>
  </div>
);

// Enhanced User Row
const UserRow = ({publicId, name }) => {
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
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-3 rounded-lg transition-colors duration-200">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAuthorColor(name)} flex items-center justify-center text-white font-bold shadow-md`}>
          {name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">@{name?.toLowerCase()}</p>
        </div>
      </div>
      <Link to={`/author-profile/${publicId}/${encodeURIComponent(name)}`}>
      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
        View
      </button>
      </Link>
    </div>
  );
};

export default Profile;