// src/components/Navbar.jsx
import { useContext, useState } from "react";
import { User, LogOut, Home, Info, Phone } from "lucide-react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from "../../Context/StoreContext";



const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const {token, logout} = useContext(StoreContext);

   
  const handleLogout = () => {
    logout();
    window.location.reload();
    navigate("/"); // redirect after logout
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex items-center justify-between">
      {/* Left: Logo + Name */}
      <div className="flex items-center gap-2">
        <img
          src={assets.logo}
          alt="Logo"
          width={220}
          height={80}
          className="object-contain"
        />
      </div>

      {/* Middle: Nav Links */}
      <ul className="flex items-center gap-6 text-gray-700 font-medium">
        <Link to ="/"><li className="hover:text-blue-600 cursor-pointer flex items-center gap-1">
          <Home size={18} /> Home
        </li></Link>
        

        <Link to= "/about"><li className="hover:text-blue-600 cursor-pointer flex items-center gap-1">
          <Info size={18} /> About
        </li></Link>
        <Link to = "/contact">
        <li className="hover:text-blue-600 cursor-pointer flex items-center gap-1">
          <Phone size={18} /> Contact
        </li></Link>
      </ul>

      {/* Right: Auth Buttons OR User Menu */}
      <div className="relative">
        { !token ? (
          <div className="flex gap-4">
           <Link to= "/register"> <button className="px-4 py-1.5 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
              Register
            </button></Link>
            

            <Link to = "/login"><button className="px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Login
            </button></Link>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              <User size={20} /> 
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                <ul className="flex flex-col">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 text-red-600">
                    <button onClick={handleLogout}>
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
