import { Post } from "@/@type/Type";
import { DialogForm, PostEditDialog } from "@shared/components/Popup/Popup";
import { MouseEventHandler } from "react";

export const PostEditRoomDialog = ({
  editRoomDialogShow,
  setEditRoomDialogShow,
  onClick,
  room,
}: {
  setEditRoomDialogShow: () => void;
  editRoomDialogShow: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  room: Post;
}) => {
  return (
    <DialogForm
      openState={editRoomDialogShow}
      handleClose={onClick}
      name="editRoomDialogShow"
      render={() => (
        <label
          htmlFor="test"
          className="block mb-2 text-sm font-medium text-gray-900 float-left"
        ></label>
      )}
    >
      <PostEditDialog
        setEditRoomDialogShow={setEditRoomDialogShow}
        post={room}
      />
    </DialogForm>
  );
};
