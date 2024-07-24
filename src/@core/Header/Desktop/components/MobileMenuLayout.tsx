import React from "react";

const MobileMenuLayout = () => {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      <button
        type="button"
        className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        aria-controls="mobile-menu"
        aria-expanded="false"
      >
        <span className="absolute -inset-0.5"></span>
        <span className="sr-only">Open main menu</span>
        {/*
      Icon when menu is closed.

      Menu open: "hidden", Menu closed: "block"
    */}
        {/* 메뉴 닫혀있을 때 여는 버튼 */}
        <svg
          className="block h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        {/*
      Icon when menu is open.

      Menu open: "block", Menu closed: "hidden"
    */}
        {/* 메뉴 열려있을 때 닫기 버튼 */}
        <svg
          className="hidden h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default MobileMenuLayout;
