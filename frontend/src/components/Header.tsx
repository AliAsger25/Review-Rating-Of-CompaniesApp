import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="nav-brand">
            ReviewHub
          </Link>
          
          <div className="nav-links">
            <Link to="/companies" className="nav-link">
              Companies
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <Link to="/create-company" className="nav-link">
                  Add Company
                </Link>
                <span className="nav-link">
                  Hello, {user?.userName}
                </span>
                <button 
                  onClick={handleLogout}
                  className="btn btn-outline"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
