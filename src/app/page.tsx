import { HomeLayout } from "@app/_PageComponents/Home/HomeLayout";
import { HomeChildren } from "@app/_PageComponents/Home/HomeChildren";

async function fetchRoomsDefault(
  listRoomAmount: number,
  listPageAmount: number
) {
  const GetURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/post?maxPost=${listRoomAmount}&page=${listPageAmount}`;
  const roomsData = fetch(GetURL).then((res) => res.json());
  return roomsData;
}

export default async function Home() {
  const numRooms = 6;

  const roomsData = await fetchRoomsDefault(numRooms, 1);
  const preRoomsData = await fetchRoomsDefault(numRooms, 2);

  return (
    <HomeLayout>
      <HomeChildren roomsData={roomsData} preRoomsData={preRoomsData} />
    </HomeLayout>
  );
}
