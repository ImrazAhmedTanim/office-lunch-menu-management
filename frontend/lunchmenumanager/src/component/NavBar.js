import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const NavBar = () => {
  const { isLoggedIn, role, handleLogout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          Office Lunch Menu Management
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          {isLoggedIn ? (
            <>
              <span className="text-gray-300 hover:text-white cursor-pointer" onClick={handleLogout}>Logout</span>
              {role === 'admin' && (
                <>
                  <Link to="/add-menu" className="text-gray-300 hover:text-white">Add Menu</Link>
                  <Link to="/employee-choices" className="text-gray-300 hover:text-white">Employee Choices</Link>
                </>
              )}
              <Link to="/daily-menu" className="text-gray-300 hover:text-white">Daily Menu</Link>
              <Link to="/select-lunch" className="text-gray-300 hover:text-white">Select Lunch</Link>
            </>
          ) : (
            <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;