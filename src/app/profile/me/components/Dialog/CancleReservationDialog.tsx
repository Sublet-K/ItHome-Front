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

export function CancleReservationDialog({
  popupState,
  clickHandler,
  checkState,
  checkHandled,
  roomKey,
  hostPosition = false,
}: {
  popupState: boolean;
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
  checkState: boolean;
  checkHandled: React.Dispatch<React.SetStateAction<boolean>>;
  roomKey: number;
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
      <DialogContent className="font-black text-center">
        <p className="text-lg font-extrabold mt-3">
          예약중인 숙소를 취소하시겠습니까?
        </p>
        <NormalText className="mt-3 ">
          <PolicyText className="text-left">
            예약 취소 기간 <br />
            <b>* 28박 미만</b>
            <br />
            - 48시간 이내에 취소하고 체크인까지 14일 이상이 남은 경우에만 환불을
            받을 수 있음.
            <br />
            - ~14일이 남은 시점까지는 50% 환불됩니다.
            <br />
            <b>* 28박 이상</b>
            <br />
            - 게스트는 예약 후 48시간 이내에 취소하고 체크인까지 28일 이상이
            남은 경우에만 전액 환불을 받을 수 있습니다.
            <br />
            - 게스트가 그 후에 예약을 취소하는 경우, 이미 숙박한 날짜의 숙박비
            전액과 예약된 숙박 기간 중 향후 30일에 대한 숙박비가 호스트에게
            지급됩니다.
            <br />
            - 게스트가 예약을 취소하는 시점에 남은 숙박 일수가 30일 미만이라면,
            남은 숙박일 전체에 대한 숙박비가 호스트에게 지급됩니다.
            <br />
            {hostPosition ? (
              <>
                호스트는 정상참작이 가능한 상황에서는 예약 취소가 가능합니다.
                자세한 사항은 잇홈 고객센터를 참고해주세요
              </>
            ) : (
              <></>
            )}
          </PolicyText>
          <Checkbox
            checked={checkState}
            onChange={(_, checked) => checkHandled(checked)}
          />
          환불규정을 확인하였습니다.
        </NormalText>
      </DialogContent>
      <DialogActions>
        <div>
          {checkState ? (
            <form>
              <DeleteButton
                onClick={() => {
                  FetchDeleteReservation(roomKey);
                }}
              >
                취소하기
              </DeleteButton>
            </form>
          ) : (
            <DisableButton disabled>취소하기</DisableButton>
          )}
        </div>
      </DialogActions>
    </DialogForm>
  );
}
