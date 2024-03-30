import { ReservationInformationBlock } from "./ReservationInformationBlock";
import {
  CalulateDate,
  DateFormat,
  priceToString,
} from "../StaticComponents/StaticComponents";
import { Reservation } from "@/@type/Type";

export const ReservationProgress = ({
  reservation,
  hostPosition,
}: {
  reservation: Reservation;
  hostPosition: boolean;
}) => {
  return (
    <>
      <ReservationInformationBlock
        title={"기간"}
        content={`${DateFormat(reservation.r_start_day)}~${DateFormat(
          reservation.r_end_day
        )}`}
      />
      <ReservationInformationBlock
        title={"금액"}
        content={priceToString(reservation.pay)}
      />
      {hostPosition ? (
        <>
          <ReservationInformationBlock
            title={"입금 예정일"}
            content={CalulateDate(String(reservation.r_start_day), 15)}
          />
        </>
      ) : (
        <>
          <ReservationInformationBlock
            title={"계좌번호"}
            content={"우리은행 1002-657-453-680"}
          />
        </>
      )}

      <ReservationInformationBlock
        title={"입금여부"}
        content={reservation.reservation_progress}
      />
      <ReservationInformationBlock
        title={"입주방식"}
        content={reservation.move_in_instruction}
      />
    </>
  );
};
