"use client";

import { useSearchLocationStore } from "@core/Header/store/SearchLocationStore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AdministrativeDistricts from "@shared/StaticData/AdministrativeDistricts";
import DropBoxSelect from "@shared/components/Input/DropBoxSelect";
import { RefObject, useRef, useState } from "react";
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
const StyledButton = styled.button<{ isClicked: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.5em;
  font-size: 1.125rem; /* text-lg */
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const SearchLocation = ({ filterState, setFilterState }) => {
  const { searchLocation, setSearchLocation } = useSearchLocationStore();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cities = Object.keys(AdministrativeDistricts) as string[];

  const togglePosFilter = () => {
    // 필터 상태 토글
    setFilterState([!filterState[0], false, false]);
  };

  const onChange = (e: any) => {
    if (e.target.name === "city") setSearchLocation(e.target.value, "");
    else setSearchLocation(searchLocation["city"], e.target.value);
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
        onClick={togglePosFilter}
        isClicked={filterState[0]} // 상태에 따라 스타일 적용
        className="rounded-md"
      >
        <LocationOnIcon />
        지역
      </StyledButton>
      {filterState[0] && (
        <Popup className="shadow-2xl" buttonref={buttonRef}>
          <div className="relative flex flex-col justify-between gap-2.5 pb-3">
            시/도
            <DropBoxSelect
              name="city"
              state={searchLocation["city"]}
              onChange={onChange}
              labelName=""
              labelId="city"
              id="city"
              menuItems={cities}
            />
            구/시/군/면
            <DropBoxSelect
              name="gu"
              state={searchLocation["gu"]}
              onChange={onChange}
              labelName="모두"
              labelId="gu"
              id="gu"
              menuItems={
                searchLocation["city"]
                  ? (AdministrativeDistricts as { [key: string]: string[] })[
                      searchLocation["city"]
                    ]
                  : ["시/군을 먼저 선택해주세요"]
              }
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

export default SearchLocation;
