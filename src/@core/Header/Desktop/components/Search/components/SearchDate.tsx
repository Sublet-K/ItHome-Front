"use client";

import { useSearchDateStore } from "@core/Header/store/SearchDateStore";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { DoubleDatePickerSearch } from "@shared/components/Input/DoubleDatePicker";
import { Dispatch, RefObject, SetStateAction, useRef } from "react";
import styled from "styled-components";

// Popup 컴포넌트 정의
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

// Button 컴포넌트 정의
const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.5em;
  font-size: 1.125rem; /* text-lg */
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const SearchDate = ({
  filterState,
  setFilterState,
}: {
  filterState: boolean[];
  setFilterState: Dispatch<SetStateAction<boolean[]>>;
}) => {
  const {
    searchDate,
    setSearchDate,
  }: {
    searchDate: [string, string];
    setSearchDate: (a: string, b: string) => void;
  } = useSearchDateStore();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleCalander = () => {
    // 필터 상태 토글
    setFilterState([false, !filterState[1], false]);
  };

  const closePopup = () => {
    setFilterState([false, false, false]);
  };

  return (
    <span
      style={{
        fontFamily: "Pretendard",
        width: "100%", // 부모 컨테이너의 너비를 100%로 설정
        display: "block", // 부모 span이 블록 요소로 작동하도록 설정
      }}
    >
      <StyledButton
        ref={buttonRef}
        onClick={toggleCalander}
        className="rounded-md"
      >
        <DateRangeOutlinedIcon />
        날짜
      </StyledButton>
      {filterState[1] && (
        <Popup className="shadow-2xl" buttonref={buttonRef}>
          <div className="relative flex flex-col justify-between items-center gap-2.5 pb-3">
            <DoubleDatePickerSearch
              dateData={searchDate}
              setDateData={setSearchDate}
            />
          </div>
          <button
            className="flex mt-2 mb-2 justify-end w-full text-black"
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
