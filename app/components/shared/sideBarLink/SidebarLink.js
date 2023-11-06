"use client";
import React, { useState } from "react";
import Link from "next/link";

const SidebarLink = ({
  icon,
  text,
  link,
  isActive,
  hasDropdown,
  dropdownContent,
  onClick,
  pathname,
  sideBarOpen,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Link
      href={link}
      onClick={onClick}
      className={`relative flex items-center cursor-pointer overflow-hidden z-50 bg-white`}
      // onMouseEnter={() => {
      //   hasDropdown && setIsDropdownOpen(true);
      // }}
      // onMouseLeave={() => {
      //   hasDropdown && setIsDropdownOpen(false);
      // }}
    >
      {!hasDropdown && (
        <div
          className={`${
            pathname === `/${isActive}` ? "bg-swBlue" : ""
          } h-5 w-1 rounded-full`}
        />
      )}

      <div className="w-full relative">
        <div
          onClick={hasDropdown ? toggleDropdown : null}
          className={`py-2 px-2 lg:px-3 xl:px-5 w-full flex items-center gap-2 rounded-lg text-swBrown hover:text-swBlue hover:bg-swLightGray relative`}
          style={{
            fontFamily: "sans-serif inter",
            fontSize: "0.875rem",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "24px",
          }}
        >
          <span
            className={`${pathname === `/${isActive}` && "text-swBlue"} ${
              !hasDropdown && "-ml-1"
            } relative`}
          >
            {icon}
          </span>
          <span
            className={`flex-grow transition-all ease-in-out duration-1000 hover:text-swBlue ${
              pathname === `/${isActive}` && "text-swBlue"
            } ${
              sideBarOpen ? "opacity-100" : "opacity-0"
            } whitespace-nowrap  relative`}
          >
            {text}
          </span>
          {hasDropdown && (
            <button
              // onClick={toggleDropdown}
              className={`ml-auto focus:outline-none ${
                sideBarOpen ? "opacity-100" : "opacity-0"
              } ${
                isDropdownOpen ? "rotate-0" : "rotate-90"
              } transform transition`}
            >
              &#8250;
            </button>
          )}
        </div>
        <div className={``}>
          {hasDropdown && (
            <div
              className={`${
                isDropdownOpen ? "h-fit p-2 pl-5" : "h-0"
              } transform transition-all duration-500 ease-in-out -z-[1000]`}
            >
              <div
                className={`${
                  isDropdownOpen ? "transition-opacity" : "opacity-0"
                } duration-[1000ms] delay-[500ms] ease-out`}
              >
                {dropdownContent}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SidebarLink;
