import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

import { 
  FiUsers, 
  FiFileText, 
  FiMessageSquare, 
  FiLogOut,
  FiTrendingUp,
  FiEye,
  FiThumbsUp,
  FiClock,
  FiActivity,
  FiAlertCircle,
  FiPieChart,
  FiBarChart2,
  FiZap,
  FiStar,
  FiArrowUp,
  FiArrowDown,
  FiAlertTriangle
} from "react-icons/fi";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { role, token, logout } = useContext(StoreContext);

 useEffect(() => {
 
     if (role === "ADMIN" && token) {
       // Already logged in, redirect to admin dashboard
       navigate("/admin");
     }
   }, [navigate,role, token]);
  

 
 
 

  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Enhanced Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-lg">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          
            <img 
              src={assets.logo} 
              alt="Inkspire Logo" 
              className="h-15 w-35 object-contain"
            />
           
          
        </div>

        {/* Admin Profile */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <div>
              <p className="font-semibold text-gray-800">Admin</p>
              <p className="text-xs text-gray-500">admin@inkspire.com</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => navigate("/admin")}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-indigo-50 text-indigo-700 font-medium hover:bg-indigo-100 transition-all"
          >
            <FiPieChart className="text-lg" />
            <span>Dashboard</span>
          </button>
          <Link to= "/admin-posts">
          <button
            className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all"
          >
            <FiFileText className="text-lg" />
            <span>All Posts</span>
          </button>
          </Link>
          <button
            onClick={() => navigate("/admin-users")}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all"
          >
            <FiUsers className="text-lg" />
            <span>Users</span>
          </button>
          <button
            onClick={() => navigate("/admin-comments")}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all"
          >
            <FiMessageSquare className="text-lg" />
            <span>Comments</span>
          </button>

           <button
            onClick={() => navigate("/admin-unsafe")}
            className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-gray-50 transition-all"
          >
            <FiAlertTriangle className="text-lg" />
            <span>Unsafe Posts</span>
          </button>
         
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all font-medium"
          >
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
              <p className="text-sm text-gray-500 mt-1">Monitor your platform's performance and activity</p>
            </div>
            
          </div>
        </header>

        <div className="p-8">
          {/* Key Metrics */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <FiFileText className="text-2xl text-blue-600" />
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <FiArrowUp className="text-xs" /> 12%
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">{ 2847}</h3>
              <p className="text-sm text-gray-500">Total Posts</p>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">+24 this week</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-purple-50 rounded-xl">
                  <FiUsers className="text-2xl text-purple-600" />
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <FiArrowUp className="text-xs" /> 8%
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">{ 15623}</h3>
              <p className="text-sm text-gray-500">Total Users</p>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">+156 this week</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-xl">
                  <FiMessageSquare className="text-2xl text-green-600" />
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <FiArrowUp className="text-xs" /> 24%
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">{ 8934}</h3>
              <p className="text-sm text-gray-500">Total Comments</p>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">+289 this week</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-orange-50 rounded-xl">
                  <FiZap className="text-2xl text-orange-600" />
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                  <FiArrowDown className="text-xs" /> 3%
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-1">92.4%</h3>
              <p className="text-sm text-gray-500">Engagement Rate</p>
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-400">Avg. per post</p>
              </div>
            </div>
          </section>

          {/* Secondary Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <FiEye className="text-2xl" />
                <p className="text-sm text-blue-100">Page Views</p>
              </div>
              <h3 className="text-3xl font-bold mb-1">1.2M</h3>
              <p className="text-xs text-blue-100">This month</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <FiThumbsUp className="text-2xl" />
                <p className="text-sm text-purple-100">Total Likes</p>
              </div>
              <h3 className="text-3xl font-bold mb-1">45.2K</h3>
              <p className="text-xs text-purple-100">This month</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <FiClock className="text-2xl" />
                <p className="text-sm text-green-100">Avg. Read Time</p>
              </div>
              <h3 className="text-3xl font-bold mb-1">5.8 min</h3>
              <p className="text-xs text-green-100">Per article</p>
            </div>
          </section>

          
          
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;