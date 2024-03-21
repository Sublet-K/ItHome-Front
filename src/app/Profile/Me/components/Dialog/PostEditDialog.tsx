import { Post } from "@/app/PostType";
import { DialogForm, PostEditDialog } from "@shared/components/Popup/Popup";

export const PostEditRoomDialog = ({
  editRoomDialogShow,
  onChange,
  room,
}: {
  editRoomDialogShow: boolean;
  onChange: React.ChangeEvent<HTMLInputElement>;
  room: Post;
}) => {
  return (
    <DialogForm
      openState={editRoomDialogShow}
      handleClose={onChange}
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
