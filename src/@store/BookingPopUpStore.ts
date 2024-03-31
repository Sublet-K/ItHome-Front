import { create } from "zustand";
import { DateFormat } from "../@shared/components/StaticComponents/StaticComponents";
import { Reservation } from "@/@type/Type";

export const bookingPopUpStore = create<{
  reservation: Reservation;
  startDay: string;
  endDay: string;
  dayPay: number;
  totalPay: number;
  postKey: string;
  setTempStartDayState: (day: Date | string) => void;
  setTempEndDayState: (day: Date | string) => void;
  setDayPayState: (pay: number) => void;
  setTotalPayState: (pay: number) => void;
  setPostKey: (key: string) => void;
}>()((set) => ({
  reservation: {} as Reservation,
  startDay: DateFormat(new Date()),
  endDay: DateFormat("2000.01.01"),
  dayPay: 1,
  totalPay: 2913136,
  postKey: "0",
  setTempStartDayState: (day) =>
    set(() => ({
      startDay: DateFormat(day),
    })),
  setTempEndDayState: (day) =>
    set(() => ({
      endDay: DateFormat(day),
    })),
  setDayPayState: (pay) =>
    set(() => ({
      dayPay: pay,
    })),
  setTotalPayState: (pay) =>
    set(() => ({
      totalPay: pay,
    })),
  setPostKey: (key) =>
    set(() => ({
      postKey: key,
    })),
}));
