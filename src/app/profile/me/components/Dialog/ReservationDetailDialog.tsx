import { FetchDeleteReservation } from "@shared/components/FetchList/FetchList";
import { DialogForm } from "@shared/components/Popup/Popup";
import {
  DeleteButton,
  DisableButton,
  NormalText,
  PolicyText,
} from "@shared/styles/Public.styles";
import { Checkbox, DialogActions, DialogContent } from "@mui/material";
import React from "react";
import { Reservation } from "@/@type/Type";
import { ReservationProgress } from "@shared/components/ReservationProgress/ReservationProgress";

export function ReservationDetailDialog({
  popupState,
  clickHandler,
  reservation,
  hostPosition = false,
}: {
  popupState: boolean;
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
  reservation: Reservation;
  hostPosition: boolean;
}) {
  return (
    <DialogForm
      openState={popupState}
      handleClose={clickHandler}
      name="editRoomDialogShow"
      render={() => (
        <label
          htmlFor="test"
          className="block mb-2 text-sm font-medium text-gray-900 float-left"
        >
          test
        </label>
      )}
    >
      <DialogContent
        className="font-black text-center "
        sx={{ height: 512, width: 512 }}
      >
        <ReservationProgress
          reservation={reservation}
          hostPosition={hostPosition}
        />
      </DialogContent>
    </DialogForm>
  );
}
