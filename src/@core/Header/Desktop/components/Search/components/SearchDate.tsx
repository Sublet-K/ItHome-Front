"use client";

import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import { DoubleDatePicker } from "@shared/components/Input/DoubleDatePicker";
import * as s from "@shared/styles/Header.styles";
import { RefObject, useRef, useState } from "react";
import styled from "styled-components";
import { useSearchDateStore } from "../../../../store/SearchDateStore";

const SearchDate = () => {
  const [isListVisible, setIsListVisible] = useState(false);
  const {
    searchDate,
    setSearchDate,
  }: {
    searchDate: [string, string];
    setSearchDate: (a: string, b: string) => void;
  } = useSearchDateStore(); // useState([null, null]); // [start, end]
  const [tempSearchDate, setTempSearchDate] = useState(searchDate);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
    <span
      style={{
        fontFamily: "Pretendard",
      }}
    >
      <button ref={buttonRef} onClick={toggleCalander} className="text-lg">
        <DateRangeOutlinedIcon />
        날짜
      </button>
      {isListVisible && (
        <Popup className="shadow-2xl" buttonref={buttonRef}>
          <Layout>
            <DoubleDatePicker
              dateData={tempSearchDate}
              setDateData={setTempSearchDate}
            />
          </Layout>
          <s.acceptOrCancleButton>
            {" "}
            <button onClick={handleSubmit} className="text-base font-light">
              적용
            </button>
            <button onClick={handleCancel} className="text-base font-light">
              취소
            </button>
          </s.acceptOrCancleButton>
        </Popup>
      )}
    </span>
  );
};
export default SearchDate;
