"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const SidebarLink = ({ icon, text, link, isActive, hasDropdown, dropdownContent }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={`relative ${isDropdownOpen ? 'bg-swLightGray' : ''}`}>
      <div
        onClick={hasDropdown ? toggleDropdown : null}
        className={`py-2 px-5 flex items-center gap-2 rounded-lg hover:text-swBlue hover:bg-swLightGray ${
          isActive ? '' : ''
        }`}
        style={{
          fontFamily: 'sans-serif inter',
          fontSize: '0.875rem',
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: '24px',
        }}
      >
        {icon}
        <span className={`flex-grow transition-colors hover:text-swBlue`} >
          {text}
        </span>
        {hasDropdown && (
          <button
            onClick={toggleDropdown}
            className={`ml-auto focus:outline-none ${
              isDropdownOpen ? 'rotate-0' : 'rotate-90'
            } transform transition`}
          >
            &#8250;
          </button>
        )}
      </div>
      {hasDropdown && isDropdownOpen && (
        <div className=" top-full left-0 bg-white border border-gray-200 p-2 shadow-md">
          {dropdownContent}
        </div>
      )}

    </div>
  );
};

export default SidebarLink;
