import * as RS from "@shared/styles/RoomInfo.styles";
import PersonIcon from "@mui/icons-material/Person";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import HomeIcon from "@mui/icons-material/Home";
import BathtubIcon from "@mui/icons-material/Bathtub";
import type { Post } from "@type/Type";
import {
  formatMonthDate,
  priceToString,
} from "../StaticComponents/StaticComponents";

export function RoomDetail({ nowRoomPost }: { nowRoomPost: Post }) {
  return (
    <div>
      <div className="space-y-1">
        <p className="text-2xl mb-3">요약</p>
        <div className="ml-4">
          <p className="text-gray-800">
            숙박 가능일: {formatMonthDate(new Date(nowRoomPost.start_day))} ~{" "}
            {formatMonthDate(new Date(nowRoomPost.end_day))}
          </p>

          {/* 1박 가격 섹션 */}
          <p className="text-gray-800">
            최소 숙박일: {nowRoomPost.min_duration}일
          </p>
          <div className="flex mt-2">
            <p className="pt-0.5 font-semibold text-xl text-gray-900">
              ₩{priceToString(nowRoomPost.price * 30)}/ 월
              <hr />
            </p>
            <p className="text mt-1.5 text-gray-500">
              {" "}
              (₩{priceToString(nowRoomPost.price)} x 30일)
            </p>
          </div>
        </div>
        {/* 시작 날짜 및 최소 기간 섹션 */}
      </div>

      <hr className="my-4" />
    </div>
  );
}
