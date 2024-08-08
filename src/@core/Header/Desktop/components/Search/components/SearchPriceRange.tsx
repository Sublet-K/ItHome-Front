"use client";

import BarChartIcon from "@mui/icons-material/BarChart";
import { DoubleSlideInput } from "@shared/components/Input/DoubleSlideInput";
import { MoneyRangeViewerWithInput } from "@shared/components/Input/ValueViewer";
import { priceToString } from "@shared/components/StaticComponents/StaticComponents";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { useSearchPriceStore } from "../../../../store/SearchPriceStore";

const SearchPriceRange = ({
  filterState,
  setFilterState,
}: {
  filterState: boolean[];
  setFilterState: Dispatch<SetStateAction<boolean[]>>;
}) => {
  const priceRangeMinMax: [number, number] = [0, 30000];
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
    buttonStyle: {
      width: "100%", // 버튼이 부모 컨테이너의 너비를 차지하도록 설정
      textAlign: "left", // 텍스트가 왼쪽에 정렬되도록 설정
      padding: "0.5em", // 패딩을 추가하여 버튼의 높이 조정
    },
  };

  const togglePriceFilter = () => {
    // 필터 상태 토글
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
        width: "100%", // 부모 div의 너비를 100%로 설정
      }}
    >
      <button
        ref={buttonRef}
        onClick={togglePriceFilter}
        // 버튼 클릭 여부에 따라 텍스트 색상 및 배경 색상 변경
        className={`board-b-2 board-gray-500 text-lg`}
        style={styles.buttonStyle} // 버튼 스타일 적용
      >
        <BarChartIcon />
        가격 범위
      </button>
      {filterState[2] && (
        <div
          className="shadow-2xl px-3 text-black p-4"
          style={styles.priceRangeStyle}
        >
          <div style={styles.priceRangeGraphStyle}>
            <MoneyRangeViewerWithInput
              arr={priceRange}
              handlePriceChange={handlePriceChange}
            />
            <DoubleSlideInput
              name="priceRange"
              value={priceRange}
              onChange={handlePriceChange}
              minMax={priceRangeMinMax}
              step={500}
            />
            <p className="text-sm font-thin">
              ₩{priceToString(priceRange[0] * 30)} ~ ₩
              {priceToString(priceRange[1] * 30)} / 월
            </p>
          </div>
          <button
            className="flex mt-2 mb-2 justify-end w-full text-black"
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
