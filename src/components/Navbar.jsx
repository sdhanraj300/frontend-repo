import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../AuthContext";

const Navbar = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
const {isAuthenticated,logout} = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     // setIsAuthenticated(!!token);
//   }, []);

  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          MyApp
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/chat" className="hover:text-gray-400">
                Chat
              </Link>
              <button onClick={handleLogout} className="hover:text-gray-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-400">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-400">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center space-y-4 mt-4">
          {isAuthenticated ? (
            <>
              <Link to="/chat" onClick={() => setMenuOpen(false)}>
                Chat
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
