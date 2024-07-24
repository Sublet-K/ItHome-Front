import { DialogActions, DialogContent } from "@mui/material";
import { FetchDeletePost } from "@shared/components/FetchList/FetchList";
import { DialogForm } from "@shared/components/Popup/Popup";
import { DeleteButton } from "@shared/styles/Public.styles";
import { MouseEventHandler } from "react";
export const PostDeleteDialog = ({
  onClick,
  deletelDialogShow,
  requestKey,
}: {
  deletelDialogShow: boolean;
  requestKey: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <DialogForm
      openState={deletelDialogShow}
      handleClose={onClick}
      name="deletelDialogShow"
      render={() => (
        <label
          htmlFor=""
          className="block mb-2 text-sm font-medium text-gray-900 float-left"
        ></label>
      )}
    >
      <DialogContent className="font-black text-center">
        <p className="text-lg font-extrabold ">게시글을 삭제하시겠습니까?</p>
        <p className="text-sm font-thin mt-1 float-left">
          삭제를 하실 경우 다시 올려야하는데 괜찮은가요?
        </p>
      </DialogContent>
      <DialogActions>
        <div>
          <form>
            <DeleteButton onClick={() => FetchDeletePost(requestKey)}>
              삭제하기
            </DeleteButton>
          </form>
        </div>
      </DialogActions>
    </DialogForm>
  );
};
