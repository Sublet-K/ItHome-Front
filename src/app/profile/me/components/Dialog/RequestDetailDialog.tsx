import {
  DialogForm,
  RequestSummaryDetailDialog,
} from "@shared/components/Popup/Popup";
import { DialogContent } from "@mui/material";
import React from "react";
import { RequestForm } from "@/@type/Type";

export const RequestDetailDialog = ({
  onChange,
  detailPopUpState,
  request,
  address,
  price,
  startDate,
  endDate,
}: {
  onChange: React.MouseEventHandler<HTMLButtonElement>;
  detailPopUpState: boolean;
  request: RequestForm;
  address: string;
  price: string;
  startDate: string;
  endDate: string;
}) => {
  return (
    <DialogForm
      openState={detailPopUpState}
      handleClose={onChange}
      name="detailPopUpState"
      render={() => (
        <label
          htmlFor="test"
          className="block mb-2 text-sm font-medium text-gray-900 float-left"
        >
          test
        </label>
      )}
    >
      <DialogContent sx={{ width: 512 }} className="text-left">
        <RequestSummaryDetailDialog
          request={request}
          address={address}
          price={price}
          startDate={startDate}
          endDate={endDate}
        />
      </DialogContent>
    </DialogForm>
  );
};
