import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ko";

export const DoubleDatePicker = ({ dateData, setDateData }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <span className="">
        <DatePicker
          value={dayjs(dateData[0])}
          onChange={(newDate) => {
            if (!newDate) return;
            if (newDate.$d > dateData[1]) {
              setDateData([newDate.$d, newDate.$d]);
            } else {
              setDateData([newDate.$d, dateData[1]]);
            }
          }}
        />
      </span>
      <div className="mt-2"></div>
      <span>
        <DatePicker
          value={dayjs(dateData[1])}
          onChange={(newDate) => {
            if (!newDate) return;
            if (dateData[0] > newDate.$d) {
              setDateData([newDate.$d, newDate.$d]);
            } else {
              setDateData([dateData[0], newDate.$d]);
            }
          }}
        />
      </span>
    </LocalizationProvider>
  );
};
