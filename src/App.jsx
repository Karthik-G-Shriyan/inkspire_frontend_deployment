// src/App.jsx
import "./App.css";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import About from "./pages/About/About";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmailVerify from "./pages/Auth/EmailVerify/EmailVerify";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import OAuthSuccess from "./pages/Auth/OAuthSuccess/OAuthSuccess";
import PostDetails from "./pages/Posts/PostDetails";
import ProtectedRoute from "./Context/ProtectedRoute";
import ProtectedAdminRoute from "./Context/ProtectedAdminRoute";
import CreatePost from "./pages/Posts/CreatePost";
import Profile from "./pages/Profile/Profile";
import Explore from "./pages/Explore/Explore";
import UpdatePost from "./pages/Posts/UpdatePost";
import AuthorProfile from "./pages/Authorprofile/AuthorProfile";
import AdminDashboard from "./Admin/AdminDashboard/AdminDashboard";
import AdminLogin from "./Admin/AdminLogin";
import PostDisplayAdmin from "./Admin/AdminDashboard/PostDisplayAdmin";
import CommentsDisplayAdmin from "./Admin/AdminDashboard/CommentDisplayAdmin";
import UsersDisplayAdmin from "./Admin/AdminDashboard/UserDisplayAdmin";
import UnsafePostsDisplay from "./Admin/AdminDashboard/UnsafePostDisplay";
import PopupNotice from "./components/Navbar/PopupNotice";

const App = () => {




  const hideNavbar = location.pathname.startsWith("/admin");

  return (


    <div className="app-container flex flex-col min-h-screen">

      <PopupNotice />
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<EmailVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route path="/admin-login" element={<AdminLogin />} />



        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin-posts"
          element={
            <ProtectedAdminRoute>
              <PostDisplayAdmin />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-comments"
          element={
            <ProtectedAdminRoute>
              <CommentsDisplayAdmin />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-unsafe"
          element={
            <ProtectedAdminRoute>
              <UnsafePostsDisplay />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-users"
          element={
            <ProtectedAdminRoute>
              <UsersDisplayAdmin />
            </ProtectedAdminRoute>
          }
        />




        <Route path="/posts/:postId" element={
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        }
        />


        <Route path="/update-post/:postId" element={
          <ProtectedRoute>
            <UpdatePost />
          </ProtectedRoute>
        }
        />

        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/author-profile/:authorId/:authorName"
          element={
            <ProtectedRoute>
              <AuthorProfile />
            </ProtectedRoute>
          }
        />


      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
