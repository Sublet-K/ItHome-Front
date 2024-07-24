import { Post, Reservation, User } from "@type/Type";
import { create } from "zustand";
import { DateFormat } from "../@shared/components/StaticComponents/StaticComponents";

export const bookingPopUpStore = create<{
  reservation: Reservation;
  startDay: string;
  endDay: string;
  dayPay: number;
  totalPay: number;
  postKey: string;
  setReservationState: (reservation: Reservation) => void;
  setTempStartDayState: (day: Date | string) => void;
  setTempEndDayState: (day: Date | string) => void;
  setDayPayState: (pay: number) => void;
  setTotalPayState: (pay: number) => void;
  setPostKey: (key: string) => void;
}>()((set) => ({
  reservation: {
    key: 3,
    r_start_day: DateFormat(new Date()),
    r_end_day: DateFormat("2000.01.01"),
    pay: 30000,
    reservation_progress: "예약 요청",
    move_in_instruction: "송파구",
    user: {} as User,
    post: {} as Post,
  } as Reservation,
  startDay: DateFormat(new Date()),
  endDay: DateFormat("2000.01.01"),
  dayPay: 1,
  totalPay: 2913136,
  postKey: "0",
  setReservationState: (reservation: Reservation) =>
    set(() => ({
      reservation: reservation,
    })),
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
