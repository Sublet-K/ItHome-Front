import { FetchGetRequestByRequestId } from "@shared/components/FetchList/FetchList";
import { DialogForm } from "@shared/components/Popup/Popup";
import { DialogContent } from "@mui/material";
import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";
import { RequestForm } from "@app/RequestType";
import { RequestRoom } from "@app/RoomType";
import { PostRequest } from "../Info/GetPostRequest";

export function PostRequestDialog({
  requestDialogShow,
  onClick,
  requestKey,
}: {
  requestDialogShow: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  requestKey: string[];
}) {
  const [requestInfo, setRequestInfo] = useState<RequestForm[]>(
    [] as RequestForm[]
  );

  FetchGetRequestByRequestId(requestKey, setRequestInfo);
  return (
    <DialogForm
      openState={requestDialogShow}
      handleClose={onClick}
      name="requestDialogShow"
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
        <PostRequest requestInfo={requestInfo} />
      </DialogContent>
    </DialogForm>
  );
}
