"use client";

import React, { useState, useRef, RefObject } from "react";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { IconButton } from "@mui/material";
import { useSearchDateStore } from "../../store/SearchDateStore";
import * as s from "@shared/styles/Header.styles";
import { DoubleDatePicker } from "@shared/components/Input/DoubleDatePicker";
import styled from "styled-components";

const SearchDate = () => {
  const [isListVisible, setIsListVisible] = useState(false);
  const {
    searchDate,
    setSearchDate,
  }: {
    searchDate: [Date, Date];
    setSearchDate: (a: Date, b: Date) => void;
  } = useSearchDateStore(); // useState([null, null]); // [start, end]
  const [tempSearchDate, setTempSearchDate] = useState(searchDate);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const Popup = styled.div<{ buttonref: RefObject<HTMLButtonElement> }>`
    background-color: white;
    border: 1px solid black;
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

  const Layout = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  `;

  const toggleCalander = () => {
    setIsListVisible(!isListVisible);
  };

  const handleSubmit = () => {
    setSearchDate(tempSearchDate[0], tempSearchDate[1]);
    setIsListVisible(false);
  };

  const handleCancel = () => {
    setTempSearchDate([searchDate[0], searchDate[1]]);
    setIsListVisible(false);
  };

  return (
    <span className="font-semibold leading-6 text-gray-900">
      <IconButton ref={buttonRef} onClick={toggleCalander}>
        <s.blackBoldFont>
          날짜
          <DateRangeOutlinedIcon />
        </s.blackBoldFont>
      </IconButton>
      {isListVisible && (
        <Popup buttonref={buttonRef}>
          <Layout>
            <DoubleDatePicker
              dateData={tempSearchDate}
              setDateData={setTempSearchDate}
            />
          </Layout>
          <s.acceptOrCancleButton>
            <button onClick={handleSubmit}>적용</button>
            <button onClick={handleCancel}>취소</button>
          </s.acceptOrCancleButton>
        </Popup>
      )}
    </span>
  );
};
export default SearchDate;
