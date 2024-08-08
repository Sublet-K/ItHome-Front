import { Post } from "@/@type/Type";
import { NormalImage } from "@shared/components/Image/Image";
import {
  formatMonthDate,
  priceToString,
} from "@shared/components/StaticComponents/StaticComponents";
import { DeleteButton, InfoButton } from "@shared/styles/Public.styles";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import { PostDeleteDialog } from "../Dialog/PostDeleteDialog";
import { PostDetailDialog } from "../Dialog/PostDetailDialog";
import { PostEditRoomDialog } from "../Dialog/PostEditDialog";

export function PostSummaryBlock({
  room,
  guestMode = true,
  postDate,
  price,
  address,
}: {
  room: Post;
  guestMode: boolean;
  postDate: string;
  price: string;
  address: string;
}) {
  const imageLink = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/${room.image_id[0]}.jpg`;
  const key = room.key;

  // Define the initial state for dialog visibility
  const [inputs, setInputs] = useState<{
    detailDialogShow: boolean;
    reservationDialogShow: boolean;
    deletelDialogShow: boolean;
    requestDialogShow: boolean;
    editRoomDialogShow: boolean;
  }>({
    detailDialogShow: false,
    reservationDialogShow: false,
    deletelDialogShow: false,
    requestDialogShow: false,
    editRoomDialogShow: false,
  });

  // Destructure state for convenience
  const {
    detailDialogShow,
    reservationDialogShow,
    deletelDialogShow,
    requestDialogShow,
    editRoomDialogShow,
  } = inputs;

  // Toggle function to update specific dialog states
  const toggleDialogState = (name: keyof typeof inputs) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: !prevInputs[name], // Toggle the specific dialog state
    }));
  };

  // Function to toggle the edit room dialog specifically
  const setEditRoomDialogShow: () => void = () => {
    toggleDialogState("editRoomDialogShow");
  };

  // Map dialog states to button names
  const infoButtonList: {
    // requestDialogShow: string;
    // reservationDialogShow: string;
    editRoomDialogShow: string;
  } = {
    // requestDialogShow: "받은 요청서",
    // reservationDialogShow: "예약현황",
    editRoomDialogShow: "방 수정하기",
  };

  // Handle button clicks for showing/hiding dialogs
  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { name } = e.currentTarget;
    toggleDialogState(name as keyof typeof inputs);
  };

  const router = useRouter();

  const MoveToRoomInfo = ({ room }: { room: Post }) => {
    // Navigate to the room information page with the room details
    router.push(`/roominfo/${room.key}`);
  };

  return (
    <div className="border-solid border-2 rounded-lg hover:shadow-lg mt-4">
      <div className="flex justify-center items-center">
        <NormalImage imageLink={imageLink} altContent={"Post Image"} />
      </div>
      <div className="ml-2 mt-4">
        <a
          className="cursor-pointer"
          onClick={() => {
            MoveToRoomInfo({ room });
          }}
        >
          <p className="font-semibold text-2xl text-gray-900 mr-2">{`${room.title}`}</p>
          <p className="text-sm text-gray-500">{`${room.street}`}</p>
          <p className="text-sm text-gray-500">
            {formatMonthDate(new Date(room.start_day))} ~{" "}
            {formatMonthDate(new Date(room.end_day))}
          </p>
          <p className="pt-0.5 font-semibold text-lg text-gray-900">
            ₩{priceToString(room.price)}/ 일
          </p>
        </a>
      </div>
      <div className="mb-2 col-span-4">
        <div className="block">
          {!guestMode && (
            <>
              {Object.keys(infoButtonList).map((key, index) => (
                <InfoButton
                  key={index}
                  className="ml-2"
                  name={key}
                  onClick={onClick}
                >
                  {infoButtonList[key as keyof typeof infoButtonList]}
                </InfoButton>
              ))}

              <DeleteButton
                className="ml-2"
                name="deletelDialogShow"
                onClick={onClick}
              >
                삭제하기
              </DeleteButton>

              <PostDetailDialog
                detailDialogShow={detailDialogShow}
                onClick={onClick}
                room={room}
                postDate={postDate}
                price={price}
                address={address}
              />

              <PostDeleteDialog
                deletelDialogShow={deletelDialogShow}
                onClick={onClick}
                requestKey={key}
              />

              <PostEditRoomDialog
                room={room}
                editRoomDialogShow={editRoomDialogShow}
                setEditRoomDialogShow={setEditRoomDialogShow}
                onClick={onClick}
              />
            </>
          )}
          <div className="my-4" />
        </div>
      </div>
    </div>
  );
}
