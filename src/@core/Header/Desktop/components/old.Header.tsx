"use client";

import { useState, useRef, useEffect } from "react";
import { IconButton } from "@mui/material";
import SearchDate from "./Search/components/SearchDate";
import SearchPriceRange from "./Search/components/SearchPriceRange";
import { Favorite } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
import { LoginDialog } from "@shared/components/Popup/Popup";
import { FetchLogout } from "@shared/components/FetchList/FetchList";
import SearchLocation from "./Search/components/SearchLocation";
import { useUserInfoStore } from "@store/UserInfoStore";
import * as hs from "./Header.styles";
import SearchButton from "./Search/components/SearchButton";
import { useUserLikeStore } from "@store/UserLikeStore";
import { SearchKeyword } from "./Search/components/SearchKeyword";

const Header = () => {
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const { userInfo, resetUserInfo } = useUserInfoStore(); // 로그인 테스트 (true: 로그인, false: 로그아웃)
  const { resetLikePostId } = useUserLikeStore();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchButtonClicked) {
      if (!inputRef.current) return;
      inputRef.current.focus();
    }
  }, [searchButtonClicked]);

  const handleReload = () => {
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="bg-white border-b border-b-5 border-gray-700">
      <div
        className="mx-auto flex max-w-xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <hs.LogoContainer onClick={handleReload} className="-m-1.5 p-1.5">
            <span className="sr-only">ItHome</span>
            <hs.LogoIcon
              src={`${process.env.PUBLIC_URL}/logo.png`}
              className="h-8"
              alt="logo"
            />
          </hs.LogoContainer>
        </div>
        <hs.SearchBoxContainer className="lg:flex lg:gap-x-12">
          <SearchLocation />
          <SearchDate />
          <SearchPriceRange />
          <SearchKeyword />
          <SearchButton />
        </hs.SearchBoxContainer>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          {userInfo.user_id ? (
            <hs.RightNavigation>
              <span>
                <IconButton>
                  {/* style={styles.favorite} */}
                  <Link href="/SaveSublet">
                    <Favorite />
                  </Link>
                </IconButton>
              </span>
              <IconButton>
                <Link href="/profile/me">
                  <PersonIcon />
                </Link>
              </IconButton>
              <button
                onClick={() => {
                  FetchLogout(resetUserInfo, resetLikePostId).then(() => {
                    window.location.reload();
                  });
                }}
              >
                Logout
              </button>
            </hs.RightNavigation>
          ) : (
            <hs.RightNavigation>
              <hs.Profile>
                <LoginDialog />
              </hs.Profile>
            </hs.RightNavigation>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

/* 추천 검색어 (보류)
import * as makeTest from '../testdata/testdata.js'
const recommendWordTempData = makeTest.makeTestRecommendSearch(); // This is a temporary data for testing

let recommendWords = recommendWordTempData.map((word) => {
  return (
    <IconButton style={styles.recommendSearchKeyword}>
      {word.recommendWord}
    </IconButton>
  )
});

<div style={styles.recommendSearchKeywordContainer}>
  {recommendWords}
</div>
*/
