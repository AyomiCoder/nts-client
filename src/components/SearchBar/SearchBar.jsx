import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  // Handle keypress for Enter key as well
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // Trigger search on "Enter" keypress
    }
  };

  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md search-bar">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
        onKeyPress={handleKeyPress} // Allow search on Enter key
        style={{ touchAction: 'manipulation' }} // Helps with touch responsiveness
      />

      {value && (
        <IoMdClose
          className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
          onClick={onClearSearch}
          onTouchStart={onClearSearch} // Ensures touch events work
        />
      )}

      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black"
        onClick={handleSearch}
        onTouchStart={handleSearch} // Ensures touch events work
      />
    </div>
  );
};

export default SearchBar;
