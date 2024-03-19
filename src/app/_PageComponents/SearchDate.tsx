"use client";

import React, { useState, useRef } from "react";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { IconButton } from "@mui/material";
import { useSearchDateStore } from "./SearchDateStore";
import * as s from "./Header.styles";
import { DoubleDatePicker } from "./DoubleDatePicker";

const SearchDate = () => {
  const [isListVisible, setIsListVisible] = useState(false);
  const {
    searchDate,
    setSearchDate,
  }: {
    searchDate: [Date, Date];
    setSearchDate: (a: Date, b: Date) => void;
  } = useSearchDateStore(); // useState([null, null]); // [start, end]
  const buttonRef = useRef<HTMLButtonElement>(null);

  const styles = {
    calandersContainer: {
      justifyContent: "center",
      textAlign: "center",
      display: "flex",
      flexDirection: "row",
    },
    serachByDate: {
      fontWeight: "bold",
      color: "rgba(0, 0, 0, 1)",
    },
    calanderStyle: {
      backgroundColor: "white",
      border: "1px solid black",
      position: "absolute",
      top: `${
        buttonRef.current
          ? buttonRef.current.offsetTop + buttonRef.current.offsetHeight
          : 0
      }px`,
      left: `${buttonRef.current ? buttonRef.current.offsetLeft : 0}px`,
      zIndex: 101,
    },
  } as { [key: string]: React.CSSProperties };

  const toggleCalander = () => {
    setIsListVisible(!isListVisible);
  };
  /* range로 해야 좋은데 계속 깨져서, 이걸로 임시 대체 합니다. */
  return isListVisible ? (
    <div style={styles.calandersContainer}>
      <DoubleDatePicker dateData={searchDate} setDateData={setSearchDate} />
    </div>
  ) : (
    <IconButton ref={buttonRef} onClick={toggleCalander}>
      <s.blackBoldFont>
        날짜
        <DateRangeOutlinedIcon />
      </s.blackBoldFont>
    </IconButton>
  );
};
export default SearchDate;
