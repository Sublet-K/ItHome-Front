import {
  FetchPutReservation,
  FetchReservationByPostKey,
} from "@shared/components/FetchList/FetchList";
import { ReservationProgress } from "@shared/components/ReservationProgress/ReservationProgress";
import {
  Alert,
  FailAlert,
  notFoundError,
  raiseError,
} from "@shared/components/StaticComponents/StaticComponents";
import {
  DeleteButton,
  DetailParagraph,
  Horizon,
  NormalButton,
  NormalText,
  SecondHead,
} from "@shared/styles/Public.styles";
import { Reservation } from "@type/Type";
import { useState } from "react";
import { CancleReservationDialog } from "../Dialog/CancleReservationDialog";

export function ReservationByPostKeyInfo({
  requestKey,
}: {
  requestKey: string;
}) {
  const [reservationInfo, setReservationInfo] = useState<Reservation[]>(
    [] as Reservation[]
  );
  const [successState, setSuccessState] = useState(false);
  const [failState, setFailState] = useState(false);
  const [checkState, setCheckState] = useState<boolean>(false);
  const [popupState, setpopupState] = useState(false);
  const cancelReservation = () => {
    setpopupState(!popupState);
    setCheckState(false);
  };
  const acceptReseravationRequest = (key: number, state: string) => {
    FetchPutReservation(key, state)
      .then((res) => notFoundError(res, true, setSuccessState))
      .catch(raiseError("FetchPutReservation", true, setFailState));
  };
  const declineReseravationRequest = (key: number, state: string) => {
    FetchPutReservation(key, state)
      .then((res) => notFoundError(res, true, setSuccessState))
      .catch(raiseError("FetchPutReservation", true, setFailState));
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
              <DetailParagraph>게스트: {res.user.username}</DetailParagraph>
              <ReservationProgress reservation={res} hostPosition={true} />
              {res.reservation_progress === "예약 요청" ? (
                <>
                  <NormalButton
                    onClick={() => {
                      acceptReseravationRequest(res.key, "승인");
                    }}
                  >
                    수락하기
                  </NormalButton>
                  <DeleteButton
                    onClick={() => {
                      declineReseravationRequest(res.key, "예약 거절");
                    }}
                  >
                    거절하기
                  </DeleteButton>
                </>
              ) : (
                <>
                  <DeleteButton
                    onClick={() => {
                      cancelReservation();
                    }}
                  >
                    예약 취소하기
                  </DeleteButton>
                </>
              )}

              <div>
                {successState && <Alert />}
                {failState && <FailAlert />}
              </div>
              <CancleReservationDialog
                popupState={popupState}
                clickHandler={cancelReservation}
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
