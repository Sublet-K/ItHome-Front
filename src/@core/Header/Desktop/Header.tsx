"use client";

import { Favorite } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { FetchLogout } from "@shared/components/FetchList/FetchList";
import { useUserInfoStore } from "@store/UserInfoStore";
import { useUserLikeStore } from "@store/UserLikeStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { LoginDialog } from "@shared/components/Popup/Popup";
import { loginPopUpStore } from "@store/LoginPopUpStore";
import SearchInput from "./components/Search/SearchInput";
import SearchInputMobile from "./components/Search/SearchInputMobile";

const Header = () => {
  const { userExist, resetUserInfo } = useUserInfoStore(); // 로그인 테스트 (true: 로그인, false: 로그아웃)
  const { resetLikePostId } = useUserLikeStore();
  const router = useRouter();
  const [filterState, setFilterState] = useState([false, false, false]);
  const [searchFilterShow, setSearchFilterShow] = useState(false);

  const toggleSearchFilterShow = () => {
    setSearchFilterShow(!searchFilterShow);
  };
  const { setLoginPopUpState } = loginPopUpStore();

  const handleReload = () => {
    router.push("/");
  };

  return (
    <nav
      className="border-b-4 pt-4 pb-4"
      style={{
        fontFamily: "Pretendard",
      }}
    >
      {" "}
      {/* pt-4, pb-4 추가하여 위쪽과 아래쪽에 공간 확보 */}
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex items-center justify-start">
            <button
              onClick={handleReload}
              className="flex items-center h-11 w-11"
            >
              <img
                className="h-11 w-11"
                src="/svgs/logo.svg"
                alt="Your Company"
              />
            </button>
          </div>

          <div className="ml-32 flex items-center justify-center flex-1">
            <SearchInput
              filterState={filterState}
              setFilterState={setFilterState}
            />
          </div>

          <div className="flex items-center justify-end">
            <div className="flex items-center space-x-4">
              <button onClick={toggleSearchFilterShow} className="sm:hidden">
                {!searchFilterShow && (
                  // <img
                  //   src="/svgs/searchButton.svg"
                  //   alt="search"
                  //   className="w-[20px] h-[20px]"
                  // />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="6"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                )}
              </button>
              {userExist ? (
                <>
                  <Link href="/savesublet">
                    <Favorite />
                  </Link>
                  <Link href="/profile/me">
                    <PersonIcon />
                  </Link>
                  <button
                    onClick={() => {
                      FetchLogout(resetUserInfo, resetLikePostId).then(() => {
                        router.push("/");
                      });
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button onClick={setLoginPopUpState}>Login</button>
              )}
              <LoginDialog />
            </div>
          </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
          <SearchInputMobile
            searchFilterShow={searchFilterShow}
            toggleSearchFilterShow={toggleSearchFilterShow}
            filterState={filterState}
            setFilterState={setFilterState}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
