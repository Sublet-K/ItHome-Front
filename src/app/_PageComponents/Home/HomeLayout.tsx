"use client";

import { useEffect, useState } from "react";

import { FetchMoreRoomsDefault } from "@shared/components/FetchList/FetchList";
import { useUserInfoStore } from "@store/UserInfoStore";
import { Post } from "@type/Type";
import { useInView } from "react-intersection-observer";
import { useTitle } from "../UseTitle";

import { useUserLikeStore } from "@store/UserLikeStore";
import { MarketingBanner } from "./components/MarketingBanner";
import { RoomProfile } from "./components/RoomProfile";

export const HomeLayout = ({
  roomsData: initRoomsData,
  preRoomsData: initPreRoomsData,
}: {
  roomsData: Post[];
  preRoomsData: Post[];
}) => {
  useTitle("ItHome");
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
      return (
        <div className="mt-12 text-center text-gray-600">
          더 불러올 방이 없습니다.
        </div>
      );
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
    <section
      className="bg-white py-8 mx-auto px-4"
      style={{
        fontFamily: "Pretendard",
      }}
    >
      <div className="bg-white text-gray-600">
        {/* Marketing Banner */}
        <MarketingBanner />
        {/* End of Marketing Banner */}
        <div className="flex flex-wrap justify-center items-center pt-4">
          {roomsData.map((room, index) => (
            <RoomProfile
              key={index}
              room={room}
              likes={likePostId}
              setLikes={setLikePostId}
            />
          ))}
          <div ref={ref}></div> {/* 무한 스크롤을 위한 위치 정보 */}
        </div>
      </div>
    </section>
  );
};
