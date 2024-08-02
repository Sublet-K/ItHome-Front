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
            <button onClick={handleReload} className="flex items-center">
              <img
                className="h-11 w-auto"
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
            {userExist ? (
              <div className="flex items-center space-x-4">
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
              </div>
            ) : (
              <button onClick={setLoginPopUpState}>Login</button>
            )}
            <LoginDialog />
          </div>
        </div>

        <div className="sm:hidden border-t border-gray-300" id="mobile-menu">
          <SearchInputMobile
            filterState={filterState}
            setFilterState={setFilterState}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
