"use client";

import React, { useEffect, useState } from "react";
import { useTitle } from "@/app/_PageComponents/UseTitle";
import styled from "@emotion/styled";
import { HomeTopButtonContainer } from "@/app/_PageComponents/HomeTopButtonContainer";
import { HomeRoomContainer } from "@/app/_PageComponents/HomeRoomContainer";
import { HomeMoreRoomButton } from "@/app/_PageComponents/HomeMoreRoomButton";
import { Room } from "./_PageComponents/RoomType";

const Layout = styled.div`
  marginBottom: '10rem'
  display: 'flex'
  flexDirection: 'column'
  alignItems: 'center'
  width: 'auto'
`;

export default function Home() {
  useTitle("ItHome | 딱 맞는 숙소를 찾아봐요.");

  const [roomsData, setRoomsData] = useState<Room[]>([]);
  const [preRoomsData, setPreRoomsData] = useState<Room[]>([]);
  const [likes, setLikes] = useState({});
  const [listRoomAmount, setListRoomAmount] = useState(6);
  const [listPageAmount, setListPageAmount] = useState(1);

  const getBackendURL = (listRoomAmount: number, listPageAmount: number) => {
    return `${process.env.REACT_APP_BACKEND_URL}/post?maxPost=${listRoomAmount}&page=${listPageAmount}`;
  };

  const fetchRoomsDefault = () => {
    // 6개 저 보여주기 필요할 수도..?
    fetch(getBackendURL(listRoomAmount, listPageAmount))
      .then((ele) => ele.json())
      .then((ele) => setPreRoomsData(ele));
    if (preRoomsData.length !== 0) {
      setRoomsData([...roomsData, ...preRoomsData]);
      setPreRoomsData([]);
    }
    setListPageAmount(listPageAmount + 1);
  };

  const fetchData = async () => {
    let data: Room[] = await fetch(
      getBackendURL(listRoomAmount, listPageAmount)
    ).then((response) => response.json());
    setRoomsData([...roomsData, ...data]);
    data = await fetch(getBackendURL(listRoomAmount, listPageAmount + 1)).then(
      (response) => response.json()
    );
    setPreRoomsData(data);
    setListPageAmount(listPageAmount + 2);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <HomeTopButtonContainer />
      <HomeRoomContainer
        roomsData={roomsData}
        likes={likes}
        setLikes={setLikes}
      />
      <HomeMoreRoomButton
        preRoomsData={preRoomsData}
        fetchRoomsDefault={fetchRoomsDefault}
      />
    </Layout>
  );
}
