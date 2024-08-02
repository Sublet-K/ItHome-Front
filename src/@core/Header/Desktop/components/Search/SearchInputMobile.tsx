import React, { useState } from "react";
import MobileDashboardItem from "./components/MobileDashboardItem";
import SearchButton from "./components/SearchButton";
import SearchDate from "./components/SearchDate";
import SearchLocation from "./components/SearchLocation";
import SearchPriceRange from "./components/SearchPriceRange";

const SearchInputMobile = ({ filterState, setFilterState }) => {
  const [searchFilterShow, setSearchFilterShow] = useState(false);

  const toggleSearchFilterShow = () => {
    setSearchFilterShow(!searchFilterShow);
  };

  return (
    <div className="pt-2">
      <div className="flex justify-center">
        {!searchFilterShow && (
          <button onClick={toggleSearchFilterShow} className="flex">
            <img src="/svgs/searchButton.svg" alt="search" /> 검색하기
          </button>
        )}
      </div>
      {searchFilterShow && (
        <div className="space-y-1 px-2 pb-2 pt-2 flex flex-col">
          <div className="flex justify-end w-full">
            <button onClick={toggleSearchFilterShow}>닫기</button>
          </div>
          <MobileDashboardItem>
            <SearchLocation
              filterState={filterState}
              setFilterState={setFilterState}
            />
          </MobileDashboardItem>
          <MobileDashboardItem>
            <SearchDate
              filterState={filterState}
              setFilterState={setFilterState}
            />
          </MobileDashboardItem>
          <MobileDashboardItem>
            <SearchPriceRange
              filterState={filterState}
              setFilterState={setFilterState}
            />
          </MobileDashboardItem>
          <div
            className="sm:hidden border-t border-gray-300 flex items-center justify-center h-16"
            id="mobile-menu"
          >
            <SearchButton setFilterState={setFilterState} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInputMobile;
