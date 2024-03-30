"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { HomeMoreRoomButton } from "./components/HomeMoreRoomButton";
import { HomeRoomContainer } from "./components/HomeRoomContainer";
import { HomeTopButtonContainer } from "./components/HomeTopButtonContainer";
import { Post } from "@type/Type";
import { useTitle } from "../UseTitle";

export const HomeChildren = ({
  roomsData: initRoomsData,
  preRoomsData: initPreRoomsData,
}: {
  roomsData: Post[];
  preRoomsData: Post[];
}) => {
  useTitle("ItHome | 딱 맞는 숙소를 찾아봐요.");
  const [roomsData, setRoomsData] = useState<Post[]>(initRoomsData);
  const [preRoomsData, setPreRoomsData] = useState<Post[]>(initPreRoomsData);
  const [listRoomAmount, setListRoomAmount] = useState(6);
  const [listPageAmount, setListPageAmount] = useState(3); // 1과 2는 이미 page.tsx에서 완료하여 HomeChildren으로 props로 전달되었으므로, 페이지가 3부터 시작.

  return (
    <>
      <HomeTopButtonContainer />
      <HomeRoomContainer roomsData={roomsData} />
      <HomeMoreRoomButton
        listRoomAmount={listRoomAmount}
        listPageAmount={listPageAmount}
        roomsData={roomsData}
        preRoomsData={preRoomsData}
        setRoomsData={setRoomsData}
        setPreRoomsData={setPreRoomsData}
        setListPageAmount={setListPageAmount}
      />
    </>
  );
};
