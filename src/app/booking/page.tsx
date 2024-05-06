"use client";
import { BookPriceAndDate } from "./Components/Info/BookPriceAndDate";
import { BookRefundRule } from "./Components/Info/BookRefundRule";
import { BookPaymentMethod } from "./Components/Info/BookPaymentMethod";
import { useTitle } from "@shared/components/hook/HookCollect";
import {
  Alert,
  CalulateDate,
  FailAlert,
  getDateDiff,
  notFoundError,
  raiseError,
} from "@shared/components/StaticComponents/StaticComponents";
import { ChangeEvent, useState } from "react";
import { FetchPutReservation } from "@shared/components/FetchList/FetchList";
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
  const { reservation } = bookingPopUpStore((state) => ({
    reservation: state.reservation,
  })); //추후 zustand를 지우고 reservation Info를 직접 받아야합니다.
  const [startDay, endDay] = [
    reservation.r_start_day.toString(),
    reservation.r_end_day.toString(),
  ];
  const [successState, setSuccessState] = useState(false);
  const [failState, setFailState] = useState(false);
  const [paySelect, setPaySelect] = useState("account");
  const onPaySelectHandle = (e: any) => {
    setPaySelect(e.target.value);
  };
  const totalPay = reservation.pay * getDateDiff(startDay, endDay);
  const handlePostReservation = () => {
    FetchPutReservation(reservation.key, "결제확정")
      .then((res) => notFoundError(res, true, setSuccessState))
      .catch(raiseError("FetchPutReservation", true, setFailState));
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
            onPaySelectHandle={onPaySelectHandle}
            paySelect={paySelect}
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
        <div>
          {successState && <Alert />}
          {failState && <FailAlert />}
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
                  결제하기
                </NormalButton>
              ) : (
                <DisableButton disabled>결제하기</DisableButton>
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
