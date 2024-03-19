import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ko";
import dayjs from "dayjs";

export const DoubleDatePicker = ({ dateData, setDateData }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <span>
        <DatePicker
          value={dayjs(dateData[0])}
          onChange={(newDate) => {
            if (newDate.$d > dateData[1]) {
              setDateData(newDate.$d, newDate.$d);
            } else {
              setDateData(newDate.$d, dateData[1]);
            }
          }}
        />
      </span>
      <p>~</p>
      <span>
        <DatePicker
          value={dayjs(dateData[1])}
          onChange={(newDate) => {
            if (dateData[0] > newDate.$d) {
              setDateData(newDate.$d, newDate.$d);
            } else {
              setDateData(dateData[0], newDate.$d);
            }
          }}
        />
      </span>
    </LocalizationProvider>
  );
};
