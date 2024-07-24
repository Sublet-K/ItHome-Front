"use client";
import { FetchReservationPost } from "@shared/components/FetchList/FetchList";
import { LoginContent } from "@shared/components/loginComponents/LoginContent";
import {
  Alert,
  CalulateDate,
  FailAlert,
  getDateDiff,
  notFoundError,
  raiseError,
} from "@shared/components/StaticComponents/StaticComponents";
import {
  NormalButton,
  SecondHead,
  Wrapper,
} from "@shared/styles/Public.styles";
import { bookingPopUpStore } from "@store/BookingPopUpStore";
import { useUserInfoStore } from "@store/UserInfoStore";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useState } from "react";
import { BookPriceAndDate } from "./Components/Info/ReservationPriceAndDate";
import { BookRefundRule } from "./Components/Info/ReservationRefundRule";

export default function Reservation(userId: string) {
  // useTitle('예약하기 | ItHome');
  const { reservation, postKey } = bookingPopUpStore((state) => ({
    reservation: state.reservation,
    postKey: state.postKey,
  }));

  const [startDay, endDay] = [
    reservation.r_start_day.toString(),
    reservation.r_end_day.toString(),
  ];
  const [inputs, setInputs] = useState({
    requestText: "",
  });

  const [successState, setSuccessState] = useState(false);
  const [failState, setFailState] = useState(false);
  const router = useRouter();

  const inputHandle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const totalPay = reservation.pay * getDateDiff(startDay, endDay);
  const handlePostReservation = () => {
    const confirmStartDay = new Date(startDay).toISOString();
    const confirmEndDay = new Date(endDay).toISOString();
    FetchReservationPost(
      userId,
      "9", //postKey가 현재 테스트를 위해 zustand에서 가져옵니다. 추후 런칭 전 zustand 없애야함.
      confirmStartDay,
      confirmEndDay,
      reservation.pay,
      inputs.requestText
    )
      .then((res) => notFoundError(res, true, setSuccessState))
      .then(() => {
        // 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.
        router.push(`/`);
      })
      .catch(raiseError("ReservationError", true, setFailState));
  };

  const totalRefundDate = CalulateDate(startDay, -7);
  const partRefundDate = CalulateDate(startDay, -3);
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
          <SecondHead>요청 사항</SecondHead>

          <input
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
            name="requestText"
            onChange={inputHandle}
            value={inputs.requestText}
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
            <NormalButton onClick={handlePostReservation}>
              예약하기
            </NormalButton>
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
