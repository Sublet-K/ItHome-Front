import * as RS from "@shared/styles/RoomInfo.styles";
import type { Post } from "@type/Type";

export function RoomPrice({ nowRoomPost } : { nowRoomPost: Post }) {
  return (
    <RS.RoomInfoSection>
      <div className="flex justify-between items-start">
        <div className="text-lg font-bold">30박</div>
        <div className="text-3xl font-bold mt-1">
          {(nowRoomPost.price * 30)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          원~
        </div>
        <div className="text-sm font-bold mt-2">
          1박 당{" "}
          {(nowRoomPost.price * 1)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          원
        </div>
        <div className="flex flex-col text-sm text-gray-500 mt-3">
          {new Date(nowRoomPost.start_day).getMonth() + 1}월{" "}
          {new Date(nowRoomPost.start_day).getDate()}일 부터, 최소{" "}
          {nowRoomPost.min_duration}개월
        </div>
      </div>
    </RS.RoomInfoSection>
  );
}
