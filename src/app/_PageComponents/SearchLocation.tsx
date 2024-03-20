import React, { useState, useRef } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSearchLocationStore } from "../_Store/SearchLocationStore";
import * as headerStyle from "../_Styles/Header.styles";
import { LocationInput } from "../_InputComponents/LocationInput";
import { CSSProperties } from "react";

const SearchLocation = () => {
  const { searchLocation, setSearchLocation } = useSearchLocationStore();
  const [tempPos, setTempPos] = useState(searchLocation); // 실제 값은 priceRange에 저장 // 추후 위치 기반으로 초기화.
  const [isListVisible, setIsListVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const styles: { [key: string]: CSSProperties } = {
    locationStyle: {
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
  };

  const togglePosFilter = () => {
    setIsListVisible(!isListVisible);
  };

  const handleSubmit = () => {
    setSearchLocation(tempPos[0], tempPos[1]);
    setIsListVisible(false);
  };

  const handleCancel = () => {
    setTempPos(searchLocation);
    setIsListVisible(false);
  };

  return (
    <div>
      <button ref={buttonRef} onClick={togglePosFilter}>
        <headerStyle.blackBoldFont>
          위치
          <LocationOnIcon />
        </headerStyle.blackBoldFont>
      </button>
      {isListVisible && (
        <div style={styles.locationStyle}>
          <LocationInput
            pos={tempPos}
            currentPos={searchLocation}
            onChange={setTempPos}
          />
          <headerStyle.acceptOrCancleButton>
            <button onClick={handleSubmit}>적용</button>
            <button onClick={handleCancel}>취소</button>
          </headerStyle.acceptOrCancleButton>
        </div>
      )}
    </div>
  );
};

export default SearchLocation;
