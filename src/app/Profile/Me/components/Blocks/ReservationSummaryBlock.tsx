import {
  DeleteButton,
  DetailParagraph,
  Image,
  InfoButton,
  SecondHead,
} from "@shared/styles/Public.styles";
import { CancleReservationDialog } from "../Dialog/CancleReservationDialog";
import { useState } from "react";
import {
  DateFormat,
  priceToString,
} from "@shared/components/StaticComponents/StaticComponents";
// import { useNavigate } from "react-router-dom";
import { Post } from "@app/PostType";
import { Reservation } from "@app/ReservationType";
import { useRouter } from "next/navigation";

export function ReservationSummaryBlock({ room }: { room: Reservation }) {
  const [popupState, setpopupState] = useState(false);
  const [checkState, setCheckState] = useState<boolean>(false);
  // const navigate = useNavigate();
  const router = useRouter();

  const clickHandler = () => {
    setpopupState(!popupState);
    setCheckState(false);
  };

  const imageLink = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/${room.Post.image_id[0]}.jpg`;

  const MoveToRoomInfo = ({ room }: { room: Reservation }) => {
    // 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.

    router.push(`/roominfo/${room.Post.key}`);

    // navigate(`/roominfo/${room.Post.key}`, {
    //   room: room.Post,
    // });
  };
  return (
    <div className="flex grid grid-cols-5 mt-4 ml-4">
      <div className="w-46 h-26">
        <Image alt="" src={imageLink}></Image>
      </div>
      <div className="mb-2 ml-3 col-span-4">
        <SecondHead>
          <a
            href=""
            onClick={() => {
              MoveToRoomInfo({ room });
            }}
          >
            {room.Post.title}
          </a>
        </SecondHead>
        <DetailParagraph>호스트: {room.Post.postuser.user_id}</DetailParagraph>
        <DetailParagraph>
          기간: {DateFormat(room.r_start_day)} ~ {DateFormat(room.r_end_day)}
        </DetailParagraph>
        <DetailParagraph>비용: {priceToString(room.pay)}</DetailParagraph>
        <div>
          <div>
            <DeleteButton onClick={clickHandler}>취소하기</DeleteButton>
            <InfoButton className="ml-4">상세 정보</InfoButton>
          </div>

          <CancleReservationDialog
            popupState={popupState}
            clickHandler={clickHandler}
            checkState={checkState}
            checkHandled={setCheckState}
            key={room.key}
          />
        </div>
      </div>
    </div>
  );
}
