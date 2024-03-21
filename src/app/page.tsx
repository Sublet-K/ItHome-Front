import { HomeLayout } from "./_PageComponents/HomeLayout";
import { HomeChildren } from "./_PageComponents/HomeChildren";

export default async function Home() {
  const getBackendURL = (listRoomAmount: number, listPageAmount: number) => {
    console.log(
      `${process.env.BACKEND_URL}/post?maxPost=${listRoomAmount}&page=${listPageAmount}`
    );
    return `${process.env.BACKEND_URL}/post?maxPost=${listRoomAmount}&page=${listPageAmount}`;
  };

  const roomsData = await fetch(getBackendURL(6, 1), {
    method: "GET",
  }).then((res) => res.json());

  const preRoomsData = await fetch(getBackendURL(6, 2), { method: "GET" }).then(
    (res) => res.json()
  );

  return (
    <HomeLayout>
      Start!
      <HomeChildren roomsData={roomsData} preRoomsData={preRoomsData} />
    </HomeLayout>
  );
}
