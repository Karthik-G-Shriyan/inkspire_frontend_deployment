import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { followUser, getFollowers, getFollowing, unfollowUser } from "../../service/FollowService";
import { getUserPosts } from "../../service/PostService";
import { FiUsers, FiUserPlus, FiUserCheck, FiX, FiTag, FiCalendar } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import DOMPurify from "dompurify";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";


const AuthorProfile = () => {
  const { authorId, authorName } = useParams();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const { token, publicId } = useContext(StoreContext);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fRes, fgRes, pRes] = await Promise.all([
          getFollowers(token, authorId),
          getFollowing(token, authorId),
          getUserPosts(token, authorId),
        ]);
        setFollowers(fRes);
        setFollowing(fgRes);
        setPosts(pRes);

        // Check if current user is following this author
        const isUserFollowing = fRes.some(
          follower => follower.publicId === publicId
        );
        setIsFollowing(isUserFollowing);
      } catch (err) {
        console.error("Error loading author profile:", err);
      }
    };

    loadData();
  }, [token, authorId, publicId]);

  const handleFollowToggle = async () => {
    setIsFollowLoading(true);
    try {
      if (isFollowing) {
        await unfollowUser(authorId, token);
        toast.success("Unfollowed successfully");
      } else {
        await followUser(authorId, token);
        toast.success("Followed successfully");
      }


      // Toggle the follow state
      setIsFollowing(!isFollowing);

      // Update followers count
      if (isFollowing) {
        setFollowers(prev => prev.filter(f => f.publicId !== publicId));
      } else {
        setFollowers(prev => [...prev, { publicId: publicId }]);
      }
    } catch (err) {
      console.error("Error toggling follow:", err);
    } finally {
      setIsFollowLoading(false);
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

        {/* Author Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 mb-6 gap-4">
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                {/* Avatar */}
                <div className="relative">
                  <div className={`w-32 h-32 rounded-2xl bg-gradient-to-br ${getAuthorColor(authorName)} flex items-center justify-center text-white text-5xl font-bold shadow-xl border-4 border-white`}>
                    {authorName?.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-lg">
                    <MdVerified className="w-6 h-6 text-blue-500" />
                  </div>
                </div>

                {/* Author Name & Stats */}
                <div className="mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-3xl font-bold text-gray-900">{authorName}</h1>
                    <MdVerified className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="text-gray-100 mb-3 ml-10">-Content Creator & Writer</p>
                  <div className="flex gap-16 mt-4">
                    <button onClick={() => setShowFollowers(true)} className="group text-center hover:scale-105 transition-transform duration-200">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {followers.length}
                      </div>
                      <div className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors">Followers</div>
                    </button>
                    <button onClick={() => setShowFollowing(true)} className="group text-center hover:scale-105 transition-transform duration-200">
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

              {/* Follow Button */}
              {authorId !== publicId ? ( // only show if it's not the current user
                <div className="md:mb-2">
                  <button
                    onClick={handleFollowToggle}
                    disabled={isFollowLoading}
                    className={`
        flex items-center gap-2 px-6 py-3 rounded-xl font-semibold
        transition-all duration-200 transform hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${isFollowing
                        ? 'bg-gray-100 text-gray-700 border-2 border-gray-300 hover:bg-gray-200 hover:border-gray-400'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700'
                      }
      `}
                  >
                    {isFollowLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        <span>Loading...</span>
                      </>
                    ) : isFollowing ? (
                      <>
                        <FiUserCheck className="w-5 h-5" />
                        <span>Following</span>
                      </>
                    ) : (
                      <>
                        <FiUserPlus className="w-5 h-5" />
                        <span>Follow</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                // Optional: show a placeholder if it's the user's own profile
                <div className="mr-10 md:mb-2 px-6 py-3 rounded-xl bg-green-500 text-gray-100 font-semibold text-center">
                  My Account
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Posts by {authorName}</h2>
          </div>
          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.publicId} className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold rounded-full shadow-sm">
                          <FiTag className="w-3 h-3" /> {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">{post.title}</h3>
                      <div className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.preview) }} />

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

                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-2">
                        <span className="flex items-center gap-1"><FiCalendar className="w-3.5 h-3.5" /> {new Date(post.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}</span>

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
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiTag className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600">This author hasn't published any posts yet.</p>
            </div>
          )}
        </div>

        {/* Followers Modal */}
        {showFollowers && (
          <UserListModal title="Followers" users={followers} onClose={() => setShowFollowers(false)} />
        )}

        {/* Following Modal */}
        {showFollowing && (
          <UserListModal title="Following" users={following} onClose={() => setShowFollowing(false)} />
        )}

      </div>
    </div>
  );
};

// Modal Component
const UserListModal = ({ title, users, onClose }) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">{users.length} {users.length === 1 ? 'person' : 'people'}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
            <FiX className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {users.length > 0 ? (
            <div className="space-y-0">
              {users.map(u => (
                <div key={u.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-3 rounded-lg transition-colors duration-200">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAuthorColor(u.userName || u.name)} flex items-center justify-center text-white font-bold shadow-md`}>
                      {(u.userName || u.name)?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{u.userName || u.name}</p>
                      <p className="text-xs text-gray-500">@{(u.userName || u.name)?.toLowerCase()}</p>
                    </div>
                  </div>
                  <Link to={`/author-profile/${u.publicId}/${encodeURIComponent(u.userName || u.name)}`}>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                     onClick={onClose}>
                      View
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FiUsers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No users found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;