import { PostDeleteDialog } from "../Dialog/PostDeleteDialog";
import { PostDetailDialog } from "../Dialog/PostDetailDialog";
import { PostRequestDialog } from "../Dialog/PostRequestDialog";
import { PostReservationDialog } from "../Dialog/PostReservationDialog";
import {
  DeleteButton,
  DetailParagraph,
  InfoButton,
  SecondHead,
} from "@shared/styles/Public.styles";
import {
  formatMonthDate,
  priceToString,
  StyleComponent,
} from "@shared/components/StaticComponents/StaticComponents";
import { MouseEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { PostEditDialog } from "@shared/components/Popup/Popup";
import { PostEditRoomDialog } from "../Dialog/PostEditDialog";
import { ReservationProgress } from "@shared/components/ReservationProgress/ReservationProgress";
import Image from "next/image";
import { Post } from "@/@type/Type";
import { NormalImage } from "@shared/components/Image/Image";

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
  const {
    detailDialogShow,
    reservationDialogShow,
    deletelDialogShow,
    requestDialogShow,
    editRoomDialogShow,
  } = inputs;
  const setEditRoomDialogShow: () => void = () => {
    setInputs({
      ...inputs,
      editRoomDialogShow: !inputs.editRoomDialogShow,
    });
  };
  const infoButtonList: {
    detailDialogShow: string;
    // requestDialogShow: string;
    // reservationDialogShow: string;
    editRoomDialogShow: string;
  } = {
    detailDialogShow: "상세 정보",
    // requestDialogShow: "받은 요청서",
    // reservationDialogShow: "예약현황",
    editRoomDialogShow: "방 수정하기",
  };
  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]:
        !inputs[e.currentTarget.name as keyof typeof inputs],
    });
  };

  const router = useRouter();
  const MoveToRoomInfo = ({ room }: { room: Post }) => {
    // 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.

    router.push(`/roominfo/${room.key}`);

    // navigate(`/roominfo/${room.Post.key}`, {
    //   room: room.Post,
    // });
  };
  return (
    <div className="border-solid border-2 rounded-lg hover:shadow-lg mt-4">
      <div className="mt-4 flex justify-center items-center">
        <NormalImage imageLink={imageLink} altContent={"Post Image"} />
      </div>
      <div className="ml-8 mt-4">
        <a
          className="cursor-pointer"
          onClick={() => {
            MoveToRoomInfo({ room });
          }}
        >
          <p className="font-semibold text-2xl text-gray-900">{`${room.title}`}</p>
          <p className="text-sm text-gray-500">{`${room.city} ${room.gu} ${room.dong}`}</p>
          <p className="text-sm text-gray-500">
            {" "}
            {formatMonthDate(new Date(room.start_day))} ~{" "}
            {formatMonthDate(new Date(room.end_day))}
          </p>
          <p className="pt-0.5 font-semibold text-lg text-gray-900">
            ₩{priceToString(room.price)}/ 일
          </p>{" "}
        </a>
      </div>
      <div className="mb-2 ml-3 col-span-4">
        <div className="block">
          {!guestMode && (
            <>
              {Object.keys(infoButtonList).map((k, index) => {
                return (
                  <InfoButton
                    key={index}
                    className="ml-4"
                    name={k}
                    onClick={onClick}
                  >
                    {infoButtonList[k as keyof typeof infoButtonList]}
                  </InfoButton>
                );
              })}

              <DeleteButton
                className="ml-4"
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
              {/* <PostReservationDialog
                reservationDialogShow={reservationDialogShow}
                onClick={onClick}
                requestKey={key}
              /> */}

              <PostDeleteDialog
                deletelDialogShow={deletelDialogShow}
                onClick={onClick}
                requestKey={key}
              />
              {/* 
              <PostRequestDialog
                requestDialogShow={requestDialogShow}
                onClick={onClick}
                requestKey={room.requestIDs}
              /> */}

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
