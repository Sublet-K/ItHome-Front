"use client";

import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { DoubleDatePicker } from "@shared/components/Input/DoubleDatePicker";
// import * as s from "@shared/styles/Header.styles";
import { RefObject, useRef, useState } from "react";
import styled from "styled-components";
import { useSearchDateStore } from "@core/Header/store/SearchDateStore";

const Popup = styled.div<{ buttonref: RefObject<HTMLButtonElement> }>`
  background-color: white;
  position: absolute;
  width: 20em;
  top: ${({ buttonref }) =>
    buttonref.current
      ? buttonref.current.offsetTop + buttonref.current.offsetHeight
      : 0}px;
  left: ${({ buttonref }) =>
    buttonref.current ? buttonref.current.offsetLeft : 0}px;
  padding: 1.5em 1em 0 1em;
  z-index: 101;
  justify-content: center;
`;

const SearchDate = ({ filterState, setFilterState }) => {
  const {
    searchDate,
    setSearchDate,
  }: {
    searchDate: [string, string];
    setSearchDate: (a: string, b: string) => void;
  } = useSearchDateStore(); // useState([null, null]); // [start, end]
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleCalander = () => {
    setFilterState([false, !filterState[1], false]);
  };

  const closePopup = () => {
    setFilterState([false, false, false]);
  };

  return (
    <span
      style={{
        fontFamily: "Pretendard",
      }}
    >
      <button ref={buttonRef} onClick={toggleCalander} className="text-lg">
        <DateRangeOutlinedIcon />
        날짜
      </button>
      {filterState[1] && (
        <Popup className="shadow-2xl" buttonref={buttonRef}>
          <div className="relative flex flex-col justify-between items-center gap-2.5 pb-3">
            <DoubleDatePicker
              dateData={searchDate}
              setDateData={setSearchDate}
            />
          </div>
          <button
            className="flex mt-2 mb-2 justify-end w-full"
            onClick={closePopup}
          >
            닫기
          </button>
        </Popup>
      )}
    </span>
  );
};
export default SearchDate;
