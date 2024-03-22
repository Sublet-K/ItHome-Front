import { HomeLayout } from "@app/_PageComponents/Home/HomeLayout";
import { HomeChildren } from "@app/_PageComponents/Home/HomeChildren";

export default async function Home() {
  const getBackendURL = (listRoomAmount: number, listPageAmount: number) => {
    console.log(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post?maxPost=${listRoomAmount}&page=${listPageAmount}`
    );
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/post?maxPost=${listRoomAmount}&page=${listPageAmount}`;
  };

  const roomsData = await fetch(getBackendURL(6, 1), {
    method: "GET",
  }).then((res) => res.json());

  const preRoomsData = await fetch(getBackendURL(6, 2), { method: "GET" }).then(
    (res) => res.json()
  );

  return (
    <HomeLayout>
      <HomeChildren roomsData={roomsData} preRoomsData={preRoomsData} />
    </HomeLayout>
  );
}
