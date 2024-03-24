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
import { StyleComponent } from "@shared/components/StaticComponents/StaticComponents";
import { MouseEventHandler, useState } from "react";
import { Room } from "@/app/RoomType";
import { Post } from "@/app/PostType";
import { useRouter } from "next/navigation";

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

  const infoButtonList: {
    detailDialogShow: string;
    requestDialogShow: string;
    reservationDialogShow: string;
    editRoomDialogShow: string;
  } = {
    detailDialogShow: "상세 정보",
    requestDialogShow: "받은 요청서",
    reservationDialogShow: "예약현황",
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
    <div className="flex grid grid-cols-5 mt-4 ml-4">
      <div className="w-46 h-26">
        <img className="object-cover rounded-lg" src={imageLink}></img>
      </div>
      <div className="mb-2 ml-3 col-span-4">
        <div className="inline-block">
          <SecondHead className="float-start mr-4">
            <a
              href=""
              onClick={() => {
                MoveToRoomInfo({ room });
              }}
            >
              {room.title}
            </a>
          </SecondHead>
          {room.contract ? (
            <StyleComponent content="VerifyRoom" />
          ) : (
            <StyleComponent content="UnverifyRoom" />
          )}
        </div>

        <DetailParagraph>주소: {address}</DetailParagraph>
        <DetailParagraph>숙박료: {price}</DetailParagraph>
        <div className="block">
          {guestMode && (
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
              <PostReservationDialog
                reservationDialogShow={reservationDialogShow}
                onClick={onClick}
                requestKey={key}
              />

              <PostDeleteDialog
                deletelDialogShow={deletelDialogShow}
                onClick={onClick}
                requestKey={key}
              />

              <PostRequestDialog
                requestDialogShow={requestDialogShow}
                onClick={onClick}
                requestKey={room.requestIDs}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
