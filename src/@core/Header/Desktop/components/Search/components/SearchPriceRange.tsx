"use client";

import BarChartIcon from "@mui/icons-material/BarChart";
import React, { useRef, useState } from "react";
// import { BarChart } from "@mui/x-charts";
import { DoubleSlideInput } from "@shared/components/Input/DoubleSlideInput";
import { MoneyRangeViewer } from "@shared/components/Input/ValueViewer";
import * as headerStyle from "@shared/styles/Header.styles";
import { useSearchPriceStore } from "../../../../store/SearchPriceStore";

const SearchPriceRange = ({ filterState, setFilterState }) => {
  const priceRangeMinMax: [number, number] = [0, 1000000];
  const { priceRange, setPriceRange } = useSearchPriceStore();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const styles: { [key: string]: React.CSSProperties } = {
    priceRangeStyle: {
      backgroundColor: "white",
      position: "absolute",
      width: "20em",
      top: `${
        buttonRef.current
          ? buttonRef.current.offsetTop + buttonRef.current.offsetHeight
          : 0
      }px`,
      left: `${buttonRef.current ? buttonRef.current.offsetLeft : 0}px`,
      padding: "0 1em 0 1em",
      zIndex: 101,
      justifyContent: "center",
    },
    priceRangeGraphStyle: {
      position: "relative",
      width: "100%",
    },
  };

  const togglePriceFilter = () => {
    setFilterState([false, false, !filterState[2]]);
  };

  const handlePriceChange = (event: Event, newValue: number[]) => {
    if (Array.isArray(newValue)) setPriceRange(newValue[0], newValue[1]);
  };

  const closePopup = () => {
    setFilterState([false, false, false]);
  };

  return (
    <div
      style={{
        fontFamily: "Pretendard",
      }}
    >
      <button ref={buttonRef} onClick={togglePriceFilter} className="text-lg t">
        <BarChartIcon />
        가격 범위
      </button>
      {filterState[2] && (
        <div className="shadow-2xl px-3" style={styles.priceRangeStyle}>
          <div style={styles.priceRangeGraphStyle}>
            <MoneyRangeViewer arr={priceRange} />
            <DoubleSlideInput
              name="priceRange"
              value={priceRange}
              onChange={handlePriceChange}
              minMax={priceRangeMinMax}
            />
          </div>
          <button
            className="flex mt-2 mb-2 justify-end w-full"
            onClick={closePopup}
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPriceRange;
