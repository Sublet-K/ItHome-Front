import {
  DialogForm,
  PostSummaryDetailDialog,
} from "@shared/components/Popup/Popup";
import { DialogContent } from "@mui/material";
import { MouseEventHandler } from "react";
import { RequestRoom } from "@app/RoomType";
import { Post } from "@/@type/Type";

export const PostDetailDialog = ({
  detailDialogShow,
  onClick,
  room,
  postDate,
  price,
  address,
}: {
  detailDialogShow: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  room: Post;
  postDate: string;
  price: string;
  address: string;
}) => {
  return (
    <DialogForm
      openState={detailDialogShow}
      handleClose={onClick}
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
