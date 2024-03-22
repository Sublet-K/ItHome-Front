import {
  DialogForm,
  PostSummaryDetailDialog,
} from "@shared/components/Popup/Popup";
import { DialogContent } from "@mui/material";
import { RequestRoom } from "@app/RoomType";
import { MouseEventHandler } from "react";
import { Post } from "@app/PostType";

export const PostDetailDialog = ({
  detailDialogShow,
  onChange,
  room,
  postDate,
  price,
  address,
}: {
  detailDialogShow: boolean;
  onChange: MouseEventHandler<HTMLButtonElement>;
  room: Post;
  postDate: string;
  price: string;
  address: string;
}) => {
  return (
    <DialogForm
      openState={detailDialogShow}
      handleClose={onChange}
      name="detailDialogShow"
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
        <PostSummaryDetailDialog
          room={room}
          postDate={postDate}
          price={price}
          address={address}
        />
      </DialogContent>
    </DialogForm>
  );
};
