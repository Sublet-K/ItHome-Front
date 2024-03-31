import {
  DeleteButton,
  DetailParagraph,
  InfoButton,
  SecondHead,
} from "@shared/styles/Public.styles";
import Image from "next/image";

import { CancleReservationDialog } from "../Dialog/CancleReservationDialog";
import { useState } from "react";
import {
  DateFormat,
  priceToString,
} from "@shared/components/StaticComponents/StaticComponents";
// import { useNavigate } from "react-router-dom";
import { Post } from "@app/PostType";
import { useRouter } from "next/navigation";
import { ReservationInfo } from "../Info/ReservationInfo";
import { ReservationProgressInfo } from "../Info/ReservationProgress";
import { ReservationInformationBlock } from "@shared/components/ReservationProgress/ReservationInformationBlock";
import { ReservationProgress } from "@shared/components/ReservationProgress/ReservationProgress";
import { Reservation } from "@/@type/Type";
import { ReservationDetailDialog } from "../Dialog/ReservationDetailDialog";

export function ReservationSummaryBlock({ room }: { room: Reservation }) {
  const [popupState, setpopupState] = useState(false);
  const [detailPopupState, setDetailPopupState] = useState(false);

  const [checkState, setCheckState] = useState<boolean>(false);
  // const navigate = useNavigate();
  const router = useRouter();
  const clickHandler = () => {
    setpopupState(!popupState);
    setCheckState(false);
  };

  const imageLink = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/${room.post.image_id[0]}.jpg`;
  const MoveToRoomInfo = ({ room }: { room: Reservation }) => {
    // 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.

    router.push(`/roominfo/${room.post.key}`);

    // navigate(`/roominfo/${room.Post.key}`, {
    //   room: room.Post,
    // });
  };
  return (
    <div className="border-solid border-2 rounded-lg hover:shadow-lg">
      <div className="flex justify-center items-center">
        <Image
          src={imageLink}
          className="rounded-lg"
          width="256"
          height="256"
          alt="my profile"
        />
        <div className="ml-4">
          <SecondHead>
            <a
              href=""
              onClick={() => {
                MoveToRoomInfo({ room });
              }}
            >
              {room.post.title}
            </a>
          </SecondHead>
          <DetailParagraph>
            호스트: {room.post.postuser.user_id}
          </DetailParagraph>
          <DetailParagraph>
            기간: {DateFormat(room.r_start_day)} ~ {DateFormat(room.r_end_day)}
          </DetailParagraph>
        </div>
        <ReservationProgressInfo
          reservationProgress={room.reservation_progress}
        />
      </div>

      <div className="mb-2 ml-3">
        <div>
          <div>
            <DeleteButton onClick={clickHandler}>취소하기</DeleteButton>
            <InfoButton
              onClick={() => {
                setDetailPopupState(!detailPopupState);
              }}
              className="ml-4"
            >
              예약 진행상황
            </InfoButton>
          </div>
          <ReservationDetailDialog
            popupState={detailPopupState}
            clickHandler={() => {
              setDetailPopupState(!detailPopupState);
            }}
            reservation={room}
            hostPosition={false}
          />
          <CancleReservationDialog
            popupState={popupState}
            clickHandler={clickHandler}
            checkState={checkState}
            checkHandled={setCheckState}
            roomKey={room.key}
            hostPosition={false}
          />
        </div>
      </div>
    </div>
  );
}
