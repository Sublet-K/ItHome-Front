import { Reservation } from "@app/ReservationType";
import { FetchReservationByPostKey } from "@shared/components/FetchList/FetchList";
import {
  DateFormat,
  priceToString,
} from "@shared/components/StaticComponents/StaticComponents";
import {
  DeleteButton,
  DetailParagraph,
  Horizon,
  InfoButton,
  NormalText,
  SecondHead,
} from "@shared/styles/Public.styles";
import { useState } from "react";
import { CancleReservationDialog } from "../Dialog/CancleReservationDialog";
import { ReservationInfo } from "./ReservationInfo";
import { ReservationProgressInfo } from "./ReservationProgress";

export function ReservationByPostKeyInfo({
  requestKey,
}: {
  requestKey: string;
}) {
  const [reservationInfo, setReservationInfo] = useState<Reservation[]>(
    [] as Reservation[]
  );

  const [checkState, setCheckState] = useState<boolean>(false);
  const [popupState, setpopupState] = useState(false);
  const clickHandler = () => {
    setpopupState(!popupState);
    setCheckState(false);
  };
  FetchReservationByPostKey(setReservationInfo, requestKey);
  return (
    <div className="mb-4">
      <SecondHead>예약 & 거주 상태</SecondHead>
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
              <ReservationProgressInfo
                reservationProgress={res.reservationProgress}
              />

              <DetailParagraph>비용: {priceToString(res.pay)}</DetailParagraph>
              <DeleteButton
                onClick={() => {
                  clickHandler();
                }}
              >
                예약 취소하기
              </DeleteButton>
              <CancleReservationDialog
                popupState={popupState}
                clickHandler={clickHandler}
                checkState={checkState}
                checkHandled={setCheckState}
                roomKey={res.key}
                hostPosition={true}
              />

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
