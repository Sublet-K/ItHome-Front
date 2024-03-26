import { Reservation } from "@app/ReservationType";
import { FetchReservationByPostKey } from "@shared/components/FetchList/FetchList";
import {
  DateFormat,
  priceToString,
} from "@shared/components/StaticComponents/StaticComponents";
import {
  DetailParagraph,
  Horizon,
  NormalText,
  SecondHead,
} from "@shared/styles/Public.styles";
import { useState } from "react";

export function ReservationByPostKeyInfo({
  requestKey,
}: {
  requestKey: string;
}) {
  const [reservationInfo, setReservationInfo] = useState<Reservation[]>(
    [] as Reservation[]
  );

  FetchReservationByPostKey(setReservationInfo, reservationInfo, requestKey);
  return (
    <div className="mb-4">
      <SecondHead>예약 현황</SecondHead>
      <Horizon />
      {(reservationInfo && reservationInfo.length) > 0 ? (
        reservationInfo.map((res, index) => {
          return (
            <div key={index}>
              <DetailParagraph>게스트: {res.User.username}</DetailParagraph>
              <DetailParagraph>
                기간: {DateFormat(res.r_start_day)} ~{" "}
                {DateFormat(res.r_end_day)}
              </DetailParagraph>
              <DetailParagraph>비용: {priceToString(res.pay)}</DetailParagraph>
              <Horizon />
            </div>
          );
        })
      ) : (
        <NormalText>예약이 아직 없습니다.</NormalText>
      )}
    </div>
  );
}
