import React from 'react';
import { getInitials } from '../../utils/helper';

const ProfileInfo = ({ userInfo, onLogout }) => {
  if (!userInfo) {
    return null; // Render nothing if userInfo is null or undefined
  }

  return (
    <div className="w-full flex items-center justify-between md:justify-end gap-3">
      {/* Mobile Layout: Profile and Name aligned to the left */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
          {getInitials(userInfo.fullName)}
        </div>

        {/* Name and Logout: Stacked in Desktop/Tablet */}
        <div className="md:flex md:flex-col md:items-start">
          <p className="text-sm font-medium text-black">{userInfo.fullName}</p>

          <button
            className="text-sm text-red-600 font-medium md:mt-1"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
