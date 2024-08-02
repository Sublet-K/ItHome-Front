"use client";

import BarChartIcon from "@mui/icons-material/BarChart";
import React, { useRef, useState } from "react";
// import { BarChart } from "@mui/x-charts";
import { DoubleSlideInput } from "@shared/components/Input/DoubleSlideInput";
import { MoneyRangeViewer } from "@shared/components/Input/ValueViewer";
import * as headerStyle from "@shared/styles/Header.styles";
import { useSearchPriceStore } from "../../../../store/SearchPriceStore";

<<<<<<< HEAD
const SearchPriceRange = ({ filterState, setFilterState }) => {
=======
const SearchPriceRange = () => {
>>>>>>> 9c8e95c36a6a8ced3073cc47c85639509c6363ec
  const priceRangeMinMax: [number, number] = [0, 1000000]; // tempData
  const { priceRange, setPriceRange } = useSearchPriceStore();
  const [tempPriceRange, setTempPriceRange] = useState(priceRange); // 그래프 표현을 위한 이중화. 실제 값은 priceRange에 저장
  const buttonRef = useRef<HTMLButtonElement>(null);

  const styles: { [key: string]: React.CSSProperties } = {
    priceRangeStyle: {
      backgroundColor: "white",
      position: "absolute",
      width: "30em",
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
    if (Array.isArray(newValue)) setTempPriceRange([newValue[0], newValue[1]]);
  };

  const handleSubmit = () => {
    setPriceRange(tempPriceRange[0], tempPriceRange[1]);
    setFilterState([false, false, filterState[2]]);
  };

  const handleCancel = () => {
    setTempPriceRange(priceRange);
    setFilterState([false, false, filterState[2]]);
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
<<<<<<< HEAD
      {filterState[2] && (
=======
      {isListVisible && (
>>>>>>> 9c8e95c36a6a8ced3073cc47c85639509c6363ec
        <div className="shadow-2xl px-3" style={styles.priceRangeStyle}>
          <div style={styles.priceRangeGraphStyle}>
            <MoneyRangeViewer arr={tempPriceRange} />
            <DoubleSlideInput
              name="priceRange"
              value={tempPriceRange}
              onChange={handlePriceChange}
              minMax={priceRangeMinMax}
            />
          </div>
          <headerStyle.acceptOrCancleButton>
            <button onClick={handleSubmit} className="text-base font-light">
              적용
            </button>
            <button onClick={handleCancel} className="text-base font-light">
              취소
            </button>
          </headerStyle.acceptOrCancleButton>
        </div>
      )}
    </div>
  );
};

export default SearchPriceRange;

/* 가격 범위 그래프

  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (event: Event) => {
    setSliderValue(event.target.value);
  };

      minPriceLineStyle: {
      position: "absolute",
      top: "20px",
      width: `${tempPriceRange[0]}%`,
      height: "9.75em",
      backgroundColor: "rgba(255, 255, 255, 0.75)",
    },
    maxPriceLineStyle: {
      position: "absolute",
      left: `${tempPriceRange[1]}%`,
      width: `${100 - tempPriceRange[1]}%`,
      top: "20px",
      height: "9.75em",
      backgroundColor: "rgba(255, 255, 255, 0.75)",
    },

  // 선분의 위치를 계산하기 위한 스타일
  const lineStyle = {
    position: "absolute",
    left: `${sliderValue}%`,
    top: "20px",
    width: "2px",
    height: "50px",
    backgroundColor: "black",
  };

<BarChart
  series={[{ data: [1, 2, 3, 2, 1] }]}
  xAxis={[{ scaleType: 'band', data: ['₩10,000~25,000', '₩25,000~40,000', '₩40,000~55,000', '₩55,000~70,000', '₩70,000~85,000'] }]}
  height={300}
  width={600}
  leftAxis={null}
/>
<div style={styles.lineStyle} />
<div style={styles.minPriceLineStyle} />
<div style={styles.maxPriceLineStyle} />
*/
