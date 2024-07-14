"use client";

import { useState, useEffect } from "react";

import { Post } from "@type/Type";
import { useTitle } from "../UseTitle";
import { useUserInfoStore } from "@store/UserInfoStore";
import { FetchMoreRoomsDefault } from "@shared/components/FetchList/FetchList";
import styled from "styled-components";
import { PolicyText } from "@shared/styles/Public.styles";
import { useInView } from "react-intersection-observer";

import { RoomProfile } from "./components/RoomProfile";
import { useUserLikeStore } from "@store/UserLikeStore";
import styles from "@shared/styles/Interactive.module.css";

const NoButtonLayout = styled(PolicyText)`
  margin-top: 3rem;
`;
export const HomeLayout = ({
  roomsData: initRoomsData,
  preRoomsData: initPreRoomsData,
}: {
  roomsData: Post[];
  preRoomsData: Post[];
}) => {
  useTitle("ItHome | 딱 맞는 숙소를 찾아봐요.");
  const { userInfo } = useUserInfoStore();

  const [roomsData, setRoomsData] = useState<Post[]>(initRoomsData);
  const [preRoomsData, setPreRoomsData] = useState<Post[]>(initPreRoomsData);
  const [listRoomAmount, setListRoomAmount] = useState(6);
  const [listPageAmount, setListPageAmount] = useState(3); // 1과 2는 이미 page.tsx에서 완료하여 HomeChildren으로 props로 전달되었으므로, 페이지가 3부터 시작.
  const [ref, inView] = useInView({
    threshold: 1.0,
  });
  useEffect(() => {
    if (inView) {
      callback();
    }
  }, [inView]);

  const callback = () => {
    if (preRoomsData.length === 0) {
      return <NoButtonLayout>더 불러올 방이 없습니다.</NoButtonLayout>;
    } else {
      FetchMoreRoomsDefault(
        listRoomAmount,
        listPageAmount,
        roomsData,
        preRoomsData,
        setRoomsData,
        setPreRoomsData,
        setListPageAmount
      );
    }
  };

  const { likePostId, setLikePostId } = useUserLikeStore();
  if (!roomsData) return <div></div>;

  return (
    <section className="bg-white py-8">
      <div className="bg-white text-gray-600">
        <div className="container mx-auto flex items-center justify-center flex-wrap pt-4">
          {roomsData.map((room, index) => (
            <RoomProfile
              key={index}
              room={room}
              likes={likePostId}
              setLikes={setLikePostId}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
