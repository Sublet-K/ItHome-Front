import { DialogForm } from "@shared/components/Popup/Popup";
import { ReservationByPostKeyInfo } from "../Info/ReservationByPostKeyInfo";
import { DialogContent } from "@mui/material";
import React, { MouseEventHandler } from "react";
export function PostReservationDialog({
  onClick,
  reservationDialogShow,
  requestKey,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  reservationDialogShow: boolean;
  requestKey: number;
}) {
  return (
    <DialogForm
      openState={reservationDialogShow}
      handleClose={onClick}
      name="reservationDialogShow"
      render={() => (
        <label
          htmlFor="test"
          className="block mb-2 text-sm font-medium text-gray-900 float-left"
        ></label>
      )}
    >
      <DialogContent sx={{ width: 512 }} className="text-left">
        <ReservationByPostKeyInfo requestKey={String(requestKey)} />
      </DialogContent>
    </DialogForm>
  );
}
