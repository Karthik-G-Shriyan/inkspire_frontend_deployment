import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { toast } from "react-toastify";
import { FiMail, FiArrowLeft, FiUser } from "react-icons/fi";
import { MdVerified } from "react-icons/md";

// You'll need to create this service function in your AdminService.js
// export const fetchAllUsers = async (token) => {
//   const response = await axios.get(`${API_URL}/users`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   return response.data;
// };

// Import this from your AdminService
import { fetchAllUsers } from "../AdminService";

const UsersDisplayAdmin = () => {
  const { token } = useContext(StoreContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchAllUsers(token);
      if (data && Array.isArray(data)) {
        setUsers(data);
      } else {
        console.warn("Unexpected user data format:", data);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserClick = (publicId, userName) => {
    navigate(`/author-profile/${publicId}/${encodeURIComponent(userName)}`);
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
      <div className="max-w-6xl mx-auto">
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
            All Users
          </h1>
          <p className="text-gray-600 text-lg">
            Manage and view all registered users on the platform.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        )}

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <article
              key={user.publicId}
              onClick={() => handleUserClick(user.publicId, user.userName)}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer group"
            >
              <div className="p-6">
                {/* User Avatar and Info */}
                <div className="flex flex-col items-center text-center">
                  {/* Avatar with verification badge */}
                  <div className="relative mb-4">
                    <div
                      className={`w-20 h-20 rounded-full bg-gradient-to-br ${getAuthorColor(
                        user.userName
                      )} flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {getAuthorInitial(user.userName)}
                    </div>
                    {/* Verification Badge */}
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
                      <MdVerified className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>

                  {/* User Name with verification */}
                  <div className="mb-3">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {user.userName}
                      </h3>
                      <MdVerified className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="w-full">
                    <div className="flex items-center justify-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                      <FiMail className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium truncate">{user.email}</span>
                    </div>
                  </div>

                  {/* User ID Badge */}
                  <div className="mt-4 w-full">
                    <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-blue-200">
                      <FiUser className="w-3 h-3" />
                      ID: {user.publicId.substring(0, 8)}...
                    </div>
                  </div>
                </div>

                {/* View Profile Link */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all duration-200">
                    View Profile
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {!loading && users.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiUser className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No users found</h3>
            <p className="text-gray-600">Users will appear here once they register.</p>
          </div>
        )}

        {/* Stats Summary */}
        {!loading && users.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <FiUser className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                <p className="text-sm text-gray-600 font-medium">Total Registered Users</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UsersDisplayAdmin;