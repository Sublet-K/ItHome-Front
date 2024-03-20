import { FetchReservation } from '@shared/components/FetchList/FetchList';
import { useState } from 'react';
import { ReservationSummaryBlock } from 'pages/GuestInfo/components/Blocks/ReservationSummaryBlock.js';
import { NormalText, SecondHead } from '@shared/components/styles/Public.styles';

export function ReservationInfo() {
  const [reservationInfo, setReservationInfo] = useState([]);
  FetchReservation(setReservationInfo);
  return (
    <div className="mb-4">
      <SecondHead>예약 현황</SecondHead>
      {reservationInfo.length > 0 ? (
        reservationInfo.map(res => <ReservationSummaryBlock room={res} />)
      ) : (
        <NormalText>예약이 아직 없습니다.</NormalText>
      )}
    </div>
  );
}
