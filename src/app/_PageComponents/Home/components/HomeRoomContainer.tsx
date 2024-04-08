"use client";

import styled from "styled-components";
import { RoomProfile } from "./RoomProfile";

import type { Post } from "@type/Type";
import { useState } from "react";
import { useUserLikeStore } from "@store/UserLikeStore";

const Layout = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 1em;
`;

export const HomeRoomContainer = ({ roomsData }: { roomsData: Post[] }) => {
  const { likePostId, setLikePostId } = useUserLikeStore();
  if (!roomsData) return <Layout></Layout>;

  return (
    <Layout>
      {roomsData.map((room, index) => (
        <RoomProfile
          key={index}
          room={room}
          likes={likePostId}
          setLikes={setLikePostId}
        />
      ))}
    </Layout>
  );
};
