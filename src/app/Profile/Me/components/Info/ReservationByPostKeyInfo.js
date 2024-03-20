import { FetchReservationByPostKey } from '@shared/components/FetchList/FetchList';
import {
  DateFormat,
  priceToString,
} from '@shared/components/StaticComponents/StaticComponents';
import {
  DetailParagraph,
  Horizon,
  NormalText,
  SecondHead,
} from '@shared/components/styles/Public.styles';
import { useState } from 'react';

export function ReservationByPostKeyInfo({ requestKey }) {
  const [reservationInfo, setReservationInfo] = useState([]);

  FetchReservationByPostKey(setReservationInfo, requestKey);
  return (
    <div className="mb-4">
      <SecondHead>예약 현황</SecondHead>
      <Horizon />
      {reservationInfo.length > 0 ? (
        reservationInfo.map(res => {
          return (
            <>
              <DetailParagraph>게스트: {res.User.username}</DetailParagraph>
              <DetailParagraph>
                기간: {DateFormat(res.r_start_day)} ~{' '}
                {DateFormat(res.r_end_day)}
              </DetailParagraph>
              <DetailParagraph>비용: {priceToString(res.pay)}</DetailParagraph>
              <Horizon />
            </>
          );
        })
      ) : (
        <NormalText>예약이 아직 없습니다.</NormalText>
      )}
    </div>
  );
}
