import { Post } from "@/app/PostType";
import { DialogForm, PostEditDialog } from "@shared/components/Popup/Popup";
import { MouseEventHandler } from "react";

export const PostEditRoomDialog = ({
  editRoomDialogShow,
  onClick,
  room,
}: {
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
        >
          test
        </label>
      )}
    >
      <PostEditDialog post={room} />
    </DialogForm>
  );
};
