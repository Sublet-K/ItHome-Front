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
import { Reservation } from "@type/Type";
import { bookingPopUpStore } from "@store/BookingPopUpStore";
import {
  DisableButton,
  NormalButton,
  Wrapper,
} from "@shared/styles/Public.styles";
import { useUserInfoStore } from "@store/UserInfoStore";
import { LoginContent } from "@shared/components/loginComponents/LoginContent";

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

  const [checkState, setCheckState] = useState(false);

  const checkHandled = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckState(!checkState);
  };
  const { userInfo } = useUserInfoStore(); // 로그인 테스트 (true: 로그인, false: 로그아웃)

  const totalDay = getDateDiff(startDay, endDay);
  const monthPay = reservation.pay * 28;
  return (
    <Wrapper>
      <div
        style={{
          margin: "0px 80px 0px 80px",
        }}
        className="items-center"
      >
        <div
          style={{
            margin: "20px 0px 20px 0px",
          }}
        >
          <BookPriceAndDate
            startDay={startDay}
            endDay={endDay}
            totalDay={totalDay}
            totalPay={totalPay}
            monthPay={monthPay}
          />
        </div>
        <div
          style={{
            margin: "20px 0px 20px 0px",
          }}
        >
          <BookPaymentMethod
            reservation={reservation}
            // onPaySelectHandle={onPaySelectHandle}
            checkState={checkState}
            checkHandled={checkHandled}
          />
        </div>

        <div
          style={{
            margin: "20px 0px 20px 0px",
          }}
        >
          <BookRefundRule
            totalRefundDate={totalRefundDate}
            partRefundDate={partRefundDate}
          />
        </div>

        <div
          style={{
            margin: "20px 0px 20px 0px",
          }}
        >
          {userInfo.user_id ? (
            <>
              {checkState ? (
                <NormalButton onClick={handlePostReservation}>
                  예약 요청하기
                </NormalButton>
              ) : (
                <DisableButton disabled>예약 요청하기</DisableButton>
              )}
            </>
          ) : (
            <>
              <LoginContent setPopUpState={undefined} />
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
}
