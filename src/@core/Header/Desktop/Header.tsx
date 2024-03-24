"use client";

import { useState, useRef, useEffect, CSSProperties } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchDate from "./components/SearchDate";
import SearchPriceRange from "./components/SearchPriceRange";
import { Favorite } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import Link from "next/link";
// import { useLocation } from "react-router-dom";
import { LoginDialog } from "@shared/components/Popup/Popup";
import { FetchLogout } from "@shared/components/FetchList/FetchList";

import Button from "@mui/material/Button";
import SearchLocation from "./components/SearchLocation";
import { useUserInfoStore } from "@store/UserInfoStore";
import { useRouter } from "next/navigation";
import * as hs from "./Header.styles";

const Header = () => {
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [searchBoxContainerSize, setSearchBoxContainer] = useState(2);
  const { userInfo, resetUserInfo } = useUserInfoStore(); // 로그인 테스트 (true: 로그인, false: 로그아웃)
  const inputRef = useRef<HTMLInputElement>(null);
  // const location = useLocation();
  // const router = useRouter();

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

  const doSearch = () => {
    if (location.pathname === "/SearchSubletInfo") {
      window.location.reload();
    } else {
      window.location.href = "/SearchSubletInfo";
    }
  };

  return (
    <hs.Container className="bg-white">
      <hs.HeaderContainer
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
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
          <IconButton className="font-semibold leading-6 text-gray-900">
            <SearchPriceRange />
          </IconButton>
          <hs.SearchIconStyle>
            <SearchIcon onClick={doSearch} />
          </hs.SearchIconStyle>
        </hs.SearchBoxContainer>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          {userInfo.id ? (
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
                <Link href="/Profile/Me">
                  {/* style={styles.profile} */}
                  <PersonIcon />
                </Link>
              </IconButton>
              <button
                onClick={() => {
                  FetchLogout(resetUserInfo).then(() => {
                    // alert("로그아웃 성공");
                    // window.location.reload();
                  });
                  // 로그아웃
                  // router.push("/");
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
      </hs.HeaderContainer>
    </hs.Container>
  );
};

export default Header;

/* 키워드 검색 (보류)
{searchButtonClicked ?
  <span style={styles.searchByKeywordContainer}>
    <span>
      <input type="text" ref={inputRef} placeholder="필요한 숙소를 입력하세요" style={styles.serachByKeywordInput} />
    </span>
    <IconButton onClick={alert}>
      <SearchIcon style={styles.searchIcon} />
    </IconButton>
  </span>
  :
  <IconButton onClick={() => setSearchButtonClicked(true)} style={styles.searchByKeywordContainer}>
    <span style={styles.serachByKeyword} className="font-semibold leading-6 text-gray-900">
      <div style={styles.searchKeywordBig}>
        필요한 숙소를 입력하세요
      </div>
      <div style={styles.searchKeyworddescription}>
        원하는 것을 키워드로 검색
      </div>
    </span>
    <SearchIcon style={styles.searchIcon} />
  </IconButton>
}
*/

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
