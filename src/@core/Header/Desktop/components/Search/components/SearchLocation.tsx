import { useSearchLocationStore } from "@core/Header/store/SearchLocationStore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AdministrativeDistricts from "@shared/StaticData/AdministrativeDistricts";
import DropBoxSelect from "@shared/components/Input/DropBoxSelect";
import * as headerStyle from "@shared/styles/Header.styles";
import { RefObject, useRef, useState } from "react";
import styled from "styled-components";

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

const SearchLocation = ({ filterState, setFilterState }) => {
  const { searchLocation, setSearchLocation } = useSearchLocationStore();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cities = Object.keys(AdministrativeDistricts) as string[];

  const togglePosFilter = () => {
    setFilterState([!filterState[0], false, false]);
  };

  const onChange = (e: any) => {
    if (e.target.name == "city") setSearchLocation(e.target.value, "");
    else setSearchLocation(searchLocation["city"], e.target.value);
  };

  return (
    <span
      style={{
        fontFamily: "Pretendard",
      }}
    >
      <button ref={buttonRef} onClick={togglePosFilter} className="text-lg">
        <LocationOnIcon />
        지역
      </button>
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
        </Popup>
      )}
    </span>
  );
};

export default SearchLocation;

/* 지도로 위치 입력하던 부분 보류. -> 아예 지도 검색 부분은 다른 페이지로 넘어가서 하는게 나을 듯. searchedSublet 기반으로. <- 이 페이지가 직방 지도 검색하고 비슷한 느낌이어서
import { LocationInput } from "@shared/components/Input/LocationInput";

          <LocationInput
            pos={tempPos}
            currentPos={searchLocation}
            onChange={setTempPos}
          />
*/
