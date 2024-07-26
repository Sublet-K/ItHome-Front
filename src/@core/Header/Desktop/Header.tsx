"use client";

import { Favorite } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { FetchLogout } from "@shared/components/FetchList/FetchList";
import { LoginDialog } from "@shared/components/Popup/Popup";
import { useUserInfoStore } from "@store/UserInfoStore";
import { useUserLikeStore } from "@store/UserLikeStore";
import Link from "next/link";
import { useRef } from "react";

import DashboardItem from "./components/DashboardItem";
import MobileDashboardItem from "./components/MobileDashboardItem";
import MobileMenuLayout from "./components/MobileMenuLayout";
import SearchInput from "./components/SearchInput"; // 재활용 가능

import SearchButton from "./components/SearchButton";
import SearchDate from "./components/SearchDate";
import SearchLocation from "./components/SearchLocation";
import SearchPriceRange from "./components/SearchPriceRange";

import { FetchGetLikePosts } from "@shared/components/FetchList/FetchList";
import { SubletPostStore } from "@store/SubletPostStore";

const Header = () => {
  const { userInfo, userExist, resetUserInfo } = useUserInfoStore(); // 로그인 테스트 (true: 로그인, false: 로그아웃)
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
    <nav className="border-b-4">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button*/}
          <MobileMenuLayout />
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              {/* 로고는 여기 */}
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
          </div>
          {/* 검색창 */}
          <div className="flex flex-1">
            <SearchInput />
            <SearchButton />
          </div>
          {/* 계정관련(북마크, 로그인/로그아웃) */}
          <div className="flex flex-1 items-center justify-end sm:static sm:inset-auto sm:ml-6">
            {userExist ? (
              <div>
                <span>
                  {/* style={styles.favorite} */}
                  <Link href="/SaveSublet">
                    <Favorite />
                  </Link>
                </span>
                <Link href="/profile/me">
                  <PersonIcon />
                </Link>
                <button
                  onClick={() => {
                    FetchLogout(resetUserInfo, resetLikePostId).then(() => {
                      window.location.reload();
                    });
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <LoginDialog />
            )}
            {/* 북마크한 방 목록 페이지 이동 */}
            {/* <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">북마크한 방</span>
              <svg
                className="h-6 w-6 fill-current text-white hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#000000"
                width="800px"
                height="800px"
              >
                <path d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z"></path>
              </svg>
            </button> */}

            {/* Profile dropdown */}
            {/* <ProfileLayout /> */}
          </div>
        </div>

        <div className="hidden sm:ml-6 sm:block">
          <div className="flex space-x-12">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
            <DashboardItem>
              <SearchLocation />
            </DashboardItem>
            <DashboardItem>
              <SearchPriceRange />
            </DashboardItem>
            <DashboardItem>
              <SearchDate />
            </DashboardItem>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}

      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
          {/* <SearchInput /> */}
          <MobileDashboardItem href="#" desc="위치" />
          <MobileDashboardItem href="#" desc="가격" />
          <MobileDashboardItem href="#" desc="날짜" />
        </div>
      </div>
    </nav>
  );
};

export default Header;
