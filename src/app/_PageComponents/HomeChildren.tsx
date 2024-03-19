"use client";

import { useState } from "react";
import { HomeMoreRoomButton } from "./HomeMoreRoomButton";
import { HomeRoomContainer } from "./HomeRoomContainer";
import { HomeTopButtonContainer } from "./HomeTopButtonContainer";
import { Room } from "./RoomType";
import { useTitle } from "./UseTitle";

export const HomeChildren = ({
  roomsData: initRoomsData,
  preRoomsData: initPreRoomsData,
}: {
  roomsData: Room[];
  preRoomsData: Room[];
}) => {
  useTitle("ItHome | 딱 맞는 숙소를 찾아봐요.");

  const [roomsData, setRoomsData] = useState<Room[]>(initRoomsData);
  const [preRoomsData, setPreRoomsData] = useState<Room[]>(initPreRoomsData);
  const [listRoomAmount, setListRoomAmount] = useState(6);
  const [listPageAmount, setListPageAmount] = useState(1);

  const getBackendURL = (listRoomAmount: number, listPageAmount: number) => {
    console.log(
      `${process.env.BACKEND_URL}/post?maxPost=${listRoomAmount}&page=${listPageAmount}`
    );
    return `${process.env.BACKEND_URL}/post?maxPost=${listRoomAmount}&page=${listPageAmount}`;
  };

  const fetchRoomsDefault = () => {
    fetch(getBackendURL(listRoomAmount, listPageAmount))
      .then((ele) => ele.json())
      .then((ele) => setPreRoomsData(ele));
    // 6개 저 보여주기 필요할 수도..?
    if (preRoomsData.length !== 0) {
      setRoomsData([...roomsData, ...preRoomsData]);
      setPreRoomsData([]);
    }
    setListPageAmount(listPageAmount + 1);
  };

  return (
    <>
      <HomeTopButtonContainer />
      <HomeRoomContainer roomsData={roomsData} />
      <HomeMoreRoomButton
        preRoomsData={preRoomsData}
        fetchRoomsDefault={fetchRoomsDefault}
      />
    </>
  );
};
