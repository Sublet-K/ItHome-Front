import { Horizon, NormalText, SecondHead } from "@shared/styles/Public.styles";
import {
  Box,
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
// import PaymentForm from "../Pay/Payment";
// import { BookPaymentForm } from "./BookPaymentForm.js";
import { ChangeEvent } from "react";
import { ReservationProgress } from "@shared/components/ReservationProgress/ReservationProgress";
import { Reservation } from "@/@type/Type";

export const BookPaymentMethod = ({
  // onPaySelectHandle,
  checkState,
  checkHandled,
  reservation,
}: {
  // onPaySelectHandle: ChangeEvent<{ value: unknown }>;
  checkState: boolean;
  checkHandled: (e: ChangeEvent<HTMLInputElement>) => void;
  reservation: Reservation;
}) => {
  return (
    <>
      <SecondHead className="mt-4">결제 수단</SecondHead>
      {/* 카드 번호, 유효기간, vs */}
      <div className="mt-2 ml-4">
        <NormalText>
          안전 계좌에 입금 후 예약 확정이 진행됩니다. 또한 사기 방지를 위해 입주
          이후 호스트에게 송급됩니다.
        </NormalText>
        <Box className="mt-4 mx-9" justifyContent="center" alignItems="center">
          <ReservationProgress reservation={reservation} hostPosition={false} />
          <NormalText className="mt-2">
            <Checkbox checked={checkState} onChange={checkHandled} />
            체크박스를 클릭하시면 이체를 완료하셨음을 동의하는 것입니다.
          </NormalText>
        </Box>
      </div>
      <Horizon />
    </>
  );
};
