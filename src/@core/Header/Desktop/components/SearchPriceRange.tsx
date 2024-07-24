"use client";

import BarChartIcon from "@mui/icons-material/BarChart";
import React, { useRef, useState } from "react";
// import { BarChart } from "@mui/x-charts";
import { IconButton } from "@mui/material";
import { DoubleSlideInput } from "@shared/components/Input/DoubleSlideInput";
import { MoneyRangeViewer } from "@shared/components/Input/ValueViewer";
import * as headerStyle from "@shared/styles/Header.styles";
import { useSearchPriceStore } from "../../store/SearchPriceStore";

const SearchPriceRange = () => {
  const priceRangeMinMax: [number, number] = [0, 5000000]; // tempData
  const { priceRange, setPriceRange } = useSearchPriceStore();
  const [tempPriceRange, setTempPriceRange] = useState(priceRange); // 그래프 표현을 위한 이중화. 실제 값은 priceRange에 저장
  const [isListVisible, setIsListVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const styles: { [key: string]: React.CSSProperties } = {
    priceRangeStyle: {
      backgroundColor: "white",
      border: "1px solid black",
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
    setIsListVisible(!isListVisible);
  };

  const handlePriceChange = (event: Event, newValue: number[]) => {
    if (Array.isArray(newValue)) setTempPriceRange([newValue[0], newValue[1]]);
  };

  const handleSubmit = () => {
    setPriceRange(tempPriceRange[0], tempPriceRange[1]);
    setIsListVisible(false);
  };

  const handleCancel = () => {
    setTempPriceRange(priceRange);
    setIsListVisible(false);
  };

  return (
    <div>
      <IconButton ref={buttonRef} onClick={togglePriceFilter}>
        <headerStyle.blackBoldFont>
          가격 범위
          <BarChartIcon />
        </headerStyle.blackBoldFont>
      </IconButton>
      {isListVisible && (
        <div style={styles.priceRangeStyle}>
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
            <button onClick={handleSubmit}>적용</button>
            <button onClick={handleCancel}>취소</button>
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
