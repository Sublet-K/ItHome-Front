import { toggleLikes } from "@shared/components/FetchList/FetchList";
import { useRouter } from "next/navigation";
import { Post } from "@type/Type";
import { Dispatch, SetStateAction } from "react";
import { MainProfileImage } from "@shared/components/Image/Image";
import {
  formatDate,
  formatMonthDate,
  priceToString,
} from "@shared/components/StaticComponents/StaticComponents";

export const RoomProfile = ({
  room,
  likes,
  setLikes,
  userId,
}: {
  room: Post;
  likes: { [key: number]: number };
  setLikes: Dispatch<SetStateAction<{ [key: number]: number }>>;
  userId?: string;
}) => {
  const imageLink = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/${room.image_id[0]}.jpg`;

  const router = useRouter();
  const moveToRoomInfo = ({ room }: { room: Post }) => {
    // 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.
    router.push(`/roominfo/${room.key}`);
  };

  if (!room) return <div></div>;
  return (
    <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
      <span onClick={() => moveToRoomInfo({ room })}>
        <MainProfileImage imageLink={imageLink} altContent="Room image" />
      </span>
      <div className="pt-3 flex items-center justify-between">
        <a
          className="cursor-pointer"
          onClick={() => router.push(`/roominfo/${room.key}`)}
        >
          <p className="font-semibold text-lg text-gray-900">{`${room.title}`}</p>
          <p className="text-sm text-gray-500">{`${room.city} ${room.gu} ${room.dong}`}</p>
          <p className="text-sm text-gray-500">
            {" "}
            {formatMonthDate(new Date(room.start_day))} ~{" "}
            {formatMonthDate(new Date(room.end_day))}
          </p>
        </a>
        <button onClick={toggleLikes(room, likes, setLikes)}>
          {likes[room.key] !== undefined ? (
            <svg
              className="h-6 w-6 fill-current text-gray-500 hover:text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
            >
              <path d="M14 20.408c-.492.308-.903.546-1.192.709-.153.086-.308.17-.463.252h-.002a.75.75 0 01-.686 0 16.709 16.709 0 01-.465-.252 31.147 31.147 0 01-4.803-3.34C3.8 15.572 1 12.331 1 8.513 1 5.052 3.829 2.5 6.736 2.5 9.03 2.5 10.881 3.726 12 5.605 13.12 3.726 14.97 2.5 17.264 2.5 20.17 2.5 23 5.052 23 8.514c0 3.818-2.801 7.06-5.389 9.262A31.146 31.146 0 0114 20.408z" />
            </svg>
          ) : (
            <svg
              className="h-6 w-6 fill-current text-gray-500 hover:text-black"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
            </svg>
          )}
        </button>
      </div>
      <p className="pt-0.5 font-semibold text-lg text-gray-900">
        ₩{priceToString(room.price * 30)}/ 월
      </p>
    </div>
  );
};
