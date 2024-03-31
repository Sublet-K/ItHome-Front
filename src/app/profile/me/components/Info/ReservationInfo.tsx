import { FetchReservation } from "@shared/components/FetchList/FetchList";
import { useState } from "react";
import { NormalText, SecondHead } from "@shared/styles/Public.styles";
import { ReservationSummaryBlock } from "../Blocks/ReservationSummaryBlock";
import { Reservation } from "@/@type/Type";

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
