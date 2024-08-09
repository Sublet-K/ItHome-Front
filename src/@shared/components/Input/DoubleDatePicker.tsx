import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ko";

export const DoubleDatePicker = ({
  dateData,
  setDateData,
}: {
  dateData: string[];
  setDateData: (date: [string, string]) => void;
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <span>
        <DatePicker
          value={dayjs(dateData[0])}
          onChange={(selectedDate) => {
            if (!selectedDate) return;
            const newDate = dayjs(selectedDate);
            if (newDate.isAfter(dayjs(dateData[1]))) {
              setDateData([
                newDate.format("YYYY-MM-DD"),
                newDate.format("YYYY-MM-DD"),
              ]);
            } else {
              setDateData([newDate.format("YYYY-MM-DD"), dateData[1]]);
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
            const newDate = dayjs(selectedDate);
            if (dayjs(dateData[0]).isAfter(newDate)) {
              setDateData([
                newDate.format("YYYY-MM-DD"),
                newDate.format("YYYY-MM-DD"),
              ]);
            } else {
              setDateData([dateData[0], newDate.format("YYYY-MM-DD")]);
            }
          }}
        />
      </span>
    </LocalizationProvider>
  );
};

export const DoubleDatePickerSearch = ({
  dateData,
  setDateData,
}: {
  dateData: string[];
  setDateData: (a: string, b: string) => void;
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <span>
        <DatePicker
          value={dayjs(dateData[0])}
          onChange={(selectedDate) => {
            if (!selectedDate) return;
            const newDate = dayjs(selectedDate);
            if (newDate.isAfter(dayjs(dateData[1]))) {
              setDateData(
                newDate.format("YYYY-MM-DD"),
                newDate.format("YYYY-MM-DD")
              );
            } else {
              setDateData(newDate.format("YYYY-MM-DD"), dateData[1]);
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
            const newDate = dayjs(selectedDate);
            if (dayjs(dateData[0]).isAfter(newDate)) {
              setDateData(
                newDate.format("YYYY-MM-DD"),
                newDate.format("YYYY-MM-DD")
              );
            } else {
              setDateData(dateData[0], newDate.format("YYYY-MM-DD"));
            }
          }}
        />
      </span>
    </LocalizationProvider>
  );
};
