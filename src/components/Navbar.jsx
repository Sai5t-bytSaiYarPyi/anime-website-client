// Path: anime-website/client/src/components/Navbar.jsx
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-background dark:bg-dark-background border-b border-card dark:border-dark-card sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary dark:text-dark-primary">
          AnimeStream
        </Link>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-card dark:bg-gray-800 text-text dark:text-white p-2 rounded-lg"
          />
          <Link to="/anime" className="text-text dark:text-dark-text hover:text-primary dark-blue-400">
            Anime List
          </Link>
          <Link to="/notifications" className="text-dark-text dark:text-dark-text hover:text-primary dark-blue-400">
            Notifications
          </Link>
          <button
            onClick={toggleTheme}
            className="text-text dark:text-white"
          >
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
          {user ? (
            <div className="flex gap-2">
              <p className="text-text dark:text-white">{user.username}</p>
              <button onClick={handleLogout} className="text-blue-500 hover:underline">
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-text dark:text-dark-text hover:text-primary dark-blue-400">
                Login
              </Link>
              <Link to="/register" className="text-text dark:text-dark-text hover:text-primary dark-blue-400">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;