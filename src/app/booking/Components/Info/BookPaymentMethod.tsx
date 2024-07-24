import { Reservation } from "@/@type/Type";
import { Box, Checkbox, SelectChangeEvent, TextField } from "@mui/material";
import { ReservationProgress } from "@shared/components/ReservationProgress/ReservationProgress";
import { Horizon, NormalText, SecondHead } from "@shared/styles/Public.styles";
import { ChangeEvent, ReactNode } from "react";
import PaymentForm from "../Pay/Payment";
import { BookPaymentForm } from "./BookPaymentForm";

export const BookPaymentMethod = ({
  onPaySelectHandle,
  paySelect,
  checkState,
  checkHandled,
  reservation,
}: {
  onPaySelectHandle: (
    event: SelectChangeEvent<string>,
    child: ReactNode
  ) => void;
  paySelect: string;
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
        <ReservationProgress reservation={reservation} hostPosition={false} />

        <Box className="mt-4 mx-9" justifyContent="center" alignItems="center">
          <BookPaymentForm
            onPaySelectHandle={onPaySelectHandle}
            paySelect={paySelect}
          />
          {paySelect === "account" ? (
            <div className="mt-2">
              <form className="bg-white border-solid border-2 border-gray-200 rounded px-8 pt-1 pb-8 mb-4">
                <TextField
                  id="standard-size-small"
                  size="small"
                  label="성함"
                  variant="standard"
                ></TextField>
                <div className="mt-2"></div>
                <TextField
                  id="standard-size-small"
                  size="small"
                  label="계좌번호"
                  variant="standard"
                ></TextField>
              </form>
            </div>
          ) : (
            <div>
              <PaymentForm />
            </div>
          )}

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
