"use client";

import { useState, useRef, useEffect } from "react";
import { IconButton } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { LoginDialog } from "@shared/components/Popup/Popup";
<<<<<<< HEAD
import { FetchLogout } from "@shared/components/FetchList/FetchList";
=======
import {
  FetchGetLikePosts,
  FetchLogout,
} from "@shared/components/FetchList/FetchList";
import SearchLocation from "./components/SearchLocation";
>>>>>>> a4d1c47dd7584456c261e1c8f38374a7556f0e77
import { useUserInfoStore } from "@store/UserInfoStore";
import { useUserLikeStore } from "@store/UserLikeStore";
<<<<<<< HEAD

import MobileMenuLayout from "./components/MobileMenuLayout";
import DashboardItem from "./components/DashboardItem";
import MobileDashboardItem from "./components/MobileDashboardItem";
import ProfileLayout from "./components/ProfileLayout";

// import SearchDate from "./components/SearchDate";
// import SearchPriceRange from "./components/SearchPriceRange";
// import { SearchKeyword } from "./components/SearchKeyword";
// import SearchLocation from "./components/SearchLocation";
// import SearchButton from "./components/SearchButton";
=======
import { SearchKeyword } from "./components/SearchKeyword";
import { SubletPostStore } from "@store/SubletPostStore";
>>>>>>> a4d1c47dd7584456c261e1c8f38374a7556f0e77

const Header = () => {
  const { userInfo, resetUserInfo } = useUserInfoStore(); // 로그인 테스트 (true: 로그인, false: 로그아웃)
  const { resetLikePostId } = useUserLikeStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleReload = () => {
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      window.location.href = "/";
    }
  };
  const { setPosts } = SubletPostStore();
  const doSearch = () => {
    FetchGetLikePosts(setPosts).then(() => {
      if (location.pathname === "/savesublet") {
        // searchtest
        window.location.reload();
      } else {
        window.location.href = "/savesublet"; // searchtest
      }
    });
  };

  // <hs.LogoContainer onClick={handleReload} className="-m-1.5 p-1.5"></hs.LogoContainer>

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <MobileMenuLayout />
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                {/* 로고는 여기 */}
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                  <DashboardItem href="#" desc="위치" />
                  <DashboardItem href="#" desc="가격" />
                  <DashboardItem href="#" desc="날짜" />
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>

              {/* Profile dropdown */}
              <ProfileLayout />
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}

        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
            <MobileDashboardItem href="#" desc="위치" />
            <MobileDashboardItem href="#" desc="가격" />
            <MobileDashboardItem href="#" desc="날짜" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
