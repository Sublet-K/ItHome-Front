import { Reservation } from "@/@type/Type";
import { FetchReservation } from "@shared/components/FetchList/FetchList";
import { NormalText, SecondHead } from "@shared/styles/Public.styles";
import { useState } from "react";
import { ReservationSummaryBlock } from "../Blocks/ReservationSummaryBlock";

export function ReservationInfo() {
  const [reservationInfo, setReservationInfo] = useState<Reservation[]>([]);
  FetchReservation(setReservationInfo);
  return (
    <div className="mb-4">
      <SecondHead>예약 현황</SecondHead>
      {(reservationInfo && reservationInfo.length) > 0 ? (
        reservationInfo.map((res, index) => (
          <ReservationSummaryBlock key={index} room={res} />
        ))
      ) : (
        <NormalText>예약이 아직 없습니다.</NormalText>
      )}
    </div>
  );
}
