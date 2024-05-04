import { DetailParagraph } from "@shared/styles/Public.styles";

export function ReservationProgressInfo({
  reservationProgress,
}: {
  reservationProgress: string;
}) {
  let color = "green";
  if (reservationProgress == "예약 요청") {
    color = "green";
  } else if (reservationProgress == "승인") {
    color = "sky";
  } else if (reservationProgress == "예약 변경") {
    color = "yellow";
  } else if (reservationProgress == "입주 확정") {
    color = "blue";
  } else if (reservationProgress == "거절") {
    color = "red";
  } else if (reservationProgress == "예약 취소") {
    color = "red";
  }
  return (
    <DetailParagraph className={`text-${color}-600`}>
      진행 상태: {reservationProgress}
    </DetailParagraph>
  );
}
