import { FetchDeleteRequest } from "@shared/components/FetchList/FetchList";
import {
  DeleteButton,
  NormalText,
  PolicyText,
} from "@shared/styles/Public.styles";
import { DialogActions, DialogContent } from "@mui/material";
import React from "react";
import { DialogForm } from "@shared/components/Popup/Popup";

export const RequestDeleteDialog = ({
  deletePopUpState,
  onChange,
  key,
}: {
  deletePopUpState: boolean;
  onChange: React.MouseEventHandler<HTMLButtonElement>;
  key: string;
}) => {
  return (
    <DialogForm
      openState={deletePopUpState}
      handleClose={onChange}
      name="deletePopUpState"
      render={() => (
        <label
          htmlFor="test"
          className="block mb-2 text-sm font-medium text-gray-900 float-left"
        >
          test
        </label>
      )}
    >
      <DialogContent className="font-black text-center">
        <NormalText>요청서를 삭제하시겠습니까?</NormalText>
        <PolicyText>삭제를 하실 경우 요청서 내역은 사라집니다.</PolicyText>
      </DialogContent>
      <DialogActions>
        <form>
          <DeleteButton onClick={() => FetchDeleteRequest(key)}>
            삭제하기
          </DeleteButton>
        </form>
      </DialogActions>
    </DialogForm>
  );
};
