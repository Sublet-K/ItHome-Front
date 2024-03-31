"use client";
import { BookPriceAndDate } from "./Components/Info/BookPriceAndDate";
import { BookRefundRule } from "./Components/Info/BookRefundRule";
import { BookPaymentMethod } from "./Components/Info/BookPaymentMethod";
import { useTitle } from "@shared/components/hook/HookCollect";
import {
  CalulateDate,
  getDateDiff,
} from "@shared/components/StaticComponents/StaticComponents";
import { ChangeEvent, useState } from "react";
import { FetchReservationPost } from "@shared/components/FetchList/FetchList";
import { Reservation } from "@/@type/Type";
import { bookingPopUpStore } from "@store/BookingPopUpStore";

export default function Booking(userId: string) {
  // useTitle('예약하기 | ItHome');

  const { reservation, postKey } = bookingPopUpStore((state) => ({
    reservation: state.reservation,
    postKey: state.postKey,
  }));
  const [startDay, endDay] = [
    reservation.r_start_day.toString(),
    reservation.r_end_day.toString(),
  ];
  const totalPay = reservation.pay * getDateDiff(startDay, endDay);
  const handlePostReservation = () => {
    const confirmStartDay = new Date(startDay).toISOString();
    const confirmEndDay = new Date(endDay).toISOString();
    FetchReservationPost(
      userId,
      postKey,
      confirmStartDay,
      confirmEndDay,
      reservation.pay
    );
  };
  const totalRefundDate = CalulateDate(startDay, -7);
  const partRefundDate = CalulateDate(startDay, -3);

  const [paySelect, setPaySelect] = useState("account");
  // const onPaySelectHandle = (e: ChangeEvent<{ value: unknown }>) => {
  //   setPaySelect(e.target.value as string);
  // };
  const [checkState, setCheckState] = useState(false);

  const checkHandled = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckState(!checkState);
  };

  const totalDay = getDateDiff(startDay, endDay);
  const monthPay = reservation.pay * 28;
  return (
    <div className="ml-4 w-4/5 items-center">
      <BookPriceAndDate
        startDay={startDay}
        endDay={endDay}
        totalDay={totalDay}
        totalPay={totalPay}
        monthPay={monthPay}
      />
      <BookPaymentMethod
        paySelect={paySelect}
        reservation={reservation}
        // onPaySelectHandle={onPaySelectHandle}
        checkState={checkState}
        checkHandled={checkHandled}
      />
      <BookRefundRule
        totalRefundDate={totalRefundDate}
        partRefundDate={partRefundDate}
        checkState={checkState}
        handlePostReservation={handlePostReservation}
      />
    </div>
  );
}
