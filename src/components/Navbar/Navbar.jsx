import React, { useState } from 'react';
import ProfileInfo from '../Card/ProfileInfo';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For the mobile menu
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const onLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = () => {
    onSearchNote(searchQuery);
  };

  const onClearSearch = () => {
    setSearchQuery('');
    handleClearSearch();
  };

  return (
    <div className="bg-white px-6 py-4 drop-shadow-lg">
      {/* Wrapper for mobile and desktop/tablet responsiveness */}
      <div className="md:flex md:items-center md:justify-between">
        {/* Title */}
        <h2 className="text-xl font-medium text-black py-2 md:py-0">Knotes</h2>

        {/* Hamburger Icon (Only visible on mobile) */}
        <div className="md:hidden absolute right-6 top-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-500 hover:text-black focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Mobile view: Profile Info + Search Bar */}
        <div className={`md:hidden w-full ${isMenuOpen ? 'block' : 'hidden'}`}>
          {/* Profile Info */}
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />

          {/* Search Bar */}
          {location.pathname !== '/login' && location.pathname !== '/signup' && (
            <div className="mt-4">
              <SearchBar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
              />
            </div>
          )}
        </div>

        {/* Tablet/Desktop view: Profile Info + Search Bar */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Centered Search Bar */}
          {location.pathname !== '/login' && location.pathname !== '/signup' && (
            <div className="flex-grow flex justify-center mx-auto">
              <SearchBar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
              />
            </div>
          )}

          {/* Right-aligned Profile Info */}
          <div className="ml-auto">
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
