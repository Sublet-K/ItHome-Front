import styled from "styled-components";
import { RoomProfile } from "./RoomProfile";

import type { Room } from "./RoomType";
import { Dispatch, SetStateAction } from "react";

const Layout = styled.div`
  display: 'grid'
  gridTemplateRows: '1fr'
  gridTemplateColumns: '1fr 1fr 1fr'
  fontSize: '1em'
`;

export const HomeRoomContainer = ({
  roomsData,
  likes,
  setLikes,
}: {
  roomsData: Room[];
  likes: { [key: number]: Room };
  setLikes: Dispatch<SetStateAction<{ [key: number]: Room }>>;
}) => {
  if (!roomsData) return <Layout></Layout>;

  return (
    <Layout>
      {roomsData.map((room, index) => (
        <RoomProfile
          key={index}
          room={room}
          likes={likes}
          setLikes={setLikes}
        />
      ))}
    </Layout>
  );
};
