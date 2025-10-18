// src/components/Navbar/Navbar.jsx
import { useContext, useState, useEffect } from "react";
import { User, LogOut, Home, Info, Phone, Compass, Edit3 } from "lucide-react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from "../../Context/StoreContext";
import './Navbar.css';

const Navbar = () => {
  const [active, setActive] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { token, logout } = useContext(StoreContext);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest('.user-menu-container')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md px-6 py-4 flex items-center justify-between transition-all duration-300 ${scrolled ? 'shadow-lg' : 'shadow-md'
        }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105"
        onClick={() => setActive('home')}
      >
        <img
          src={assets.logo}
          alt="Inkspire Logo"
          width={220}
          height={80}
          className="object-contain"
        />
      </Link>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-4">
        <li>
          <Link
            to="/"
            className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all cursor-pointer 
        ${active === "home" ? "text-blue-600 " : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"}`}
            onClick={() => setActive('home')}
          >
            <Home size={18} /> Home
          </Link>
        </li>

        <li>
          <Link
            to="/explore"
            className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all cursor-pointer 
        ${active === "explore" ? "text-blue-600" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"}`}
            onClick={() => setActive('explore')}

          >
            <Compass size={18} /> Explore
          </Link>
        </li>

        <li>
          <Link
            to="/about"
            className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all cursor-pointer 
        ${active === "about" ? "text-blue-600" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"}`}
            onClick={() => setActive('about')}

          >
            <Info size={18} /> About
          </Link>
        </li>

        <li>
          <Link
            to="/contact"
            className={`flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all cursor-pointer 
        ${active === "contact" ? "text-blue-600" : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"}`}
            onClick={() => setActive('contact')}

          >
            <Phone size={18} /> Contact Us
          </Link>
        </li>
      </ul>


      {/* Auth Section */}
      <div className="flex items-center gap-3">
        {!token ? (
          <div className="flex gap-3">
            <Link to="/register">
              <button className="px-5 py-2 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all hover:shadow-md">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                Login
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-8 user-menu-container">
            <Link
              to="/create-post"
              className="hidden sm:flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <Edit3 size={18} />
              <span>Write a Post</span>
            </Link>

            {/* User Avatar Button */}
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 p-2 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-full hover:border-blue-300 hover:shadow-md transition-all"
                aria-label="User menu"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                  <User size={20} />
                </div>
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-2xl overflow-hidden animate-slideDown">
                  {/* Dropdown Header */}
                  <div className="px-4 py-3 bg-gradient-to-br from-blue-50 to-purple-50 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800">My Account</p>
                    <p className="text-xs text-gray-500 mt-0.5">Manage your profile</p>
                  </div>

                  {/* Menu Items */}
                  <ul className="py-2">
                    <li>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User size={16} className="text-gray-600" />
                        <span className="font-medium">Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/create-post"
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Edit3 size={16} className="text-gray-600" />
                        <span className="font-medium">Write a Post</span>
                      </Link>
                    </li>
                    <li className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors text-left"
                      >
                        <LogOut size={16} />
                        <span className="font-medium">Logout</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;