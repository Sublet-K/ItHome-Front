import { HomeLayout } from "@app/_PageComponents/Home/HomeLayout";
import { HomeChildren } from "@app/_PageComponents/Home/HomeChildren";

const headerOptions: (method: string, contentType?: string) => RequestInit = (
  method: string,
  contentType = "application/json"
) => ({
  credentials: "include",
  method: method,
  headers: {
    "Content-Type": contentType,
  },
});

async function fetchRoomsDefault(
  listRoomAmount: number,
  listPageAmount: number
) {
  const GetURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/post?maxPost=${listRoomAmount}&page=${listPageAmount}`;
  const roomsData = fetch(GetURL, {
    cache: "force-cache",
    ...headerOptions("GET"),
  }) // , { cache: "force-cache" } or , { ...headerOptions("GET") } FetchLists에 있는 headerOptions입니다.
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
  return roomsData;
}

export default async function Home() {
  const numRooms = 6;

  let roomsData = await fetchRoomsDefault(numRooms, 1);
  let preRoomsData = await fetchRoomsDefault(numRooms, 2);

  return (
    <HomeLayout>
      <HomeChildren roomsData={roomsData} preRoomsData={preRoomsData} />
    </HomeLayout>
  );
}
