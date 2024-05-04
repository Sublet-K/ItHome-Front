"use client";
import { BookPriceAndDate } from "./Components/Info/BookPriceAndDate";
import { BookRefundRule } from "./Components/Info/BookRefundRule";
import {
  CalulateDate,
  getDateDiff,
} from "@shared/components/StaticComponents/StaticComponents";
import { FetchReservationPost } from "@shared/components/FetchList/FetchList";
import { bookingPopUpStore } from "@store/BookingPopUpStore";
import { NormalButton, Wrapper } from "@shared/styles/Public.styles";
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
