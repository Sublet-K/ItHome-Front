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

import Button from "@mui/material/Button";
import SearchLocation from "./components/SearchLocation";
import { useUserInfoStore } from "@store/UserInfoStore";
import { useRouter } from "next/navigation";

const Header = () => {
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [searchBoxContainerSize, setSearchBoxContainer] = useState(2);
  const { userInfo } = useUserInfoStore(); // 로그인 테스트 (true: 로그인, false: 로그아웃)
  const inputRef = useRef<HTMLInputElement>(null);
  // const location = useLocation();
  // const router = useRouter();
  const styles: { [key: string]: CSSProperties } = {
    container: {
      borderBottom: "1px solid gray",
      marginBottom: "0.5em",
    },
    headerContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    logoContainer: {
      display: "flex",
      flex: 1,
    },
    logoIcon: {
      width: "4em",
      height: "100%",
      color: "rgba(0, 0, 0, 1)",
      justifyContent: "left",
    },
    searchBoxContainer: {
      display: "flex",
      flexDirection: "row",
      margin: "0 0 0.5em 0",
      justifyContent: "space-between",
      alignItems: "center",
      border: "1px solid #000000",
      borderRadius: "5px",
      padding: "1em",
      fontSize: "1.3em",
      flex: 2,
    },
    searchByKeywordContainer: {
      display: "flex",
      flex: 1,
    },
    serachByKeyword: {
      marginRight: "0.5em",
    },
    searchKeywordBig: {
      border: "0px",
      fontWeight: "bold",
    },
    serachByKeywordInput: {
      display: "flex",
      flex: 1,
      border: "1px",
    },
    searchKeyworddescription: {
      fontSize: "0.6em",
      textAlign: "left",
    },
    searchIcon: {
      fontWeight: "bold",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      color: "white",
      fontSize: "1em",
    },
    rightNavigation: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "right",
      flex: 1,
    },
    favorite: {
      display: "flex",
      flexDirection: "column",
      marginRight: "1em",
      color: "rgba(0, 0, 0, 1)",
    },
    favoriteCount: {
      fontSize: "0.8em",
    },
    profile: {
      color: "rgba(0, 0, 0, 1)",
    },
  };

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

  // const doSearch = () => {
  //   if (location.pathname === "/SearchSubletInfo") {
  //     window.location.reload();
  //   } else {
  //     window.location.href = "/SearchSubletInfo";
  //   }
  // };

  return (
    <div className="bg-white" style={styles.container}>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
        style={styles.headerContainer}
      >
        <div className="flex lg:flex-1">
          <IconButton
            onClick={handleReload}
            style={styles.logoContainer}
            className="-m-1.5 p-1.5"
          >
            <span className="sr-only">Sublet</span>
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              style={styles.logoIcon}
              className="h-8"
              alt="logo"
            />
          </IconButton>
        </div>
        <Popover.Group
          style={styles.searchBoxContainer}
          className="hidden lg:flex lg:gap-x-12"
        >
          <SearchLocation />
          <SearchDate />
          <IconButton className="font-semibold leading-6 text-gray-900">
            <SearchPriceRange />
          </IconButton>
          <Button
            component={Link}
            // onClick={doSearch}
            style={styles.searchIcon}
            href="/SearchSubletInfo"
          >
            <SearchIcon />
          </Button>
        </Popover.Group>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          {userInfo.id ? (
            <div style={styles.rightNavigation}>
              <span>
                <IconButton style={styles.favorite}>
                  <Link href="/SaveSublet">
                    <Favorite />
                  </Link>
                </IconButton>
              </span>
              <IconButton>
                <Link href="/Profile/me" style={styles.profile}>
                  <PersonIcon />
                </Link>
              </IconButton>
            </div>
          ) : (
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              <div style={styles.profile}>
                <LoginDialog />
              </div>
            </a>
          )}
        </div>
      </nav>
    </div>
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
