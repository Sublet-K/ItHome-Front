import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ko";

export const DoubleDatePicker = ({ dateData, setDateData }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <span>
        <DatePicker
          value={dayjs(dateData[0])}
          onChange={(selectedDate) => {
            if (!selectedDate) return;
            const newDate = dayjs(selectedDate).format("YYYY-MM-DD");
            if (newDate > dateData[1]) {
              setDateData(newDate, newDate);
            } else {
              setDateData(newDate, dateData[1]);
            }
          }}
        />
      </span>
      <div className="mt-2"></div>
      <span>
        <DatePicker
          value={dayjs(dateData[1])}
          onChange={(selectedDate) => {
            if (!selectedDate) return;
            const newDate = dayjs(selectedDate).format("YYYY-MM-DD");
            if (dateData[0] > newDate) {
              setDateData(newDate, newDate);
            } else {
              setDateData(dateData[0], newDate);
            }
          }}
        />
      </span>
    </LocalizationProvider>
  );
};
