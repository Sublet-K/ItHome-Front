import React, { useState } from "react";
import MobileDashboardItem from "./components/MobileDashboardItem";
import SearchButton from "./components/SearchButton";
import SearchDate from "./components/SearchDate";
import SearchLocation from "./components/SearchLocation";
import SearchPriceRange from "./components/SearchPriceRange";

const SearchInputMobile = () => {
  const [filterState, setFilterState] = useState([false, false, false]);
  return (
    <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col">
      <MobileDashboardItem>
        <SearchLocation
          filterState={filterState}
          setFilterState={setFilterState}
        />
      </MobileDashboardItem>
      <MobileDashboardItem>
        <SearchDate filterState={filterState} setFilterState={setFilterState} />
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
        <SearchInputMobile />
      </div>
    </div>
  );
};

export default SearchInputMobile;
