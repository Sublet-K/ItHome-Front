import { FetchDeleteRequest } from "@shared/components/FetchList/FetchList";
import {
  BoldText,
  DeleteButton,
  NormalText,
  PolicyText,
} from "@shared/styles/Public.styles";
import { DialogActions, DialogContent } from "@mui/material";
import React from "react";
import { DialogForm } from "@shared/components/Popup/Popup";

export const StrongVerifyUserDialog = ({
  popupState,
  onClick,
}: {
  popupState: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <DialogForm
      openState={popupState}
      handleClose={onClick}
      name="respondPopUpState"
      render={() => (
        <label
          htmlFor="test"
          className="block mb-2 text-sm font-medium text-gray-900 float-left"
        >
          test
        </label>
      )}
    >
      <DialogContent>
        <NormalText>
          강력한 인증은 아래 문서를 ithomecustomer@gmail.com으로 <br />
          보내시면됩니다.
        </NormalText>

        <NormalText>- 신원조사 증명서</NormalText>
        <NormalText>- 재학증명서</NormalText>
        <NormalText>
          인증을 받으신 분은 추천 빈도 증가와 태그 제공합니다!
        </NormalText>
      </DialogContent>
    </DialogForm>
  );
};
