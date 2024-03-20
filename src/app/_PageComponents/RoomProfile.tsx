import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { toggleLikes } from "./FetchList";
import { RoomSpan } from "./RoomSpan";
import { Image } from "../_Styles/Public.styles";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { Room } from "../RoomType";
import { Dispatch, SetStateAction } from "react";

export const RoomProfile = ({
  room,
  likes,
  setLikes,
}: {
  room: Room;
  likes: { [key: number]: Room };
  setLikes: Dispatch<SetStateAction<{ [key: number]: Room }>>;
}) => {
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em;
  `;

  const RoomTitleAndLike = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `;

  const router = useRouter();
  const moveToRoomInfo = ({ room }: { room: Room }) => {
    // 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.
    router.push(`/roominfo/${room.key}`);
  };

  if (!room) return <div></div>;
  return (
    <Container>
      <IconButton onClick={() => moveToRoomInfo({ room })}>
        <Image
          src={`${process.env.REACT_APP_BACKEND_URL}/public/${room.image_id[0]}.jpg`}
          alt="Room image"
        />
      </IconButton>
      <RoomTitleAndLike>
        <RoomSpan room={room} />
        <IconButton onClick={toggleLikes(room, likes, setLikes)}>
          {likes[room.key] !== undefined ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </RoomTitleAndLike>
    </Container>
  );
};
