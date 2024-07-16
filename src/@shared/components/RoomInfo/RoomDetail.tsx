import * as RS from "@shared/styles/RoomInfo.styles";
import PersonIcon from "@mui/icons-material/Person";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import HomeIcon from "@mui/icons-material/Home";
import BathtubIcon from "@mui/icons-material/Bathtub";
import type { Post } from "@type/Type";

export function RoomDetail({ nowRoomPost }: { nowRoomPost: Post }) {
  return (
    <RS.RoomInfoSection>
      <div className="flex flex-col space-y-2">
        {/* 전체 30박 가격 섹션
        <div className="flex justify-between items-start">
          <div className="text-lg font-bold">1개월 당 </div>
          <div className="text-3xl font-bold">
            {(nowRoomPost.price * 30).toLocaleString()} 원~
          </div>
        </div> */}
        <p className="text-xl font-light">
          주거 가능일: {new Date(nowRoomPost.start_day).getMonth() + 1}월{" "}
          {new Date(nowRoomPost.start_day).getDate()}일~{" "}
          {new Date(nowRoomPost.end_day).getMonth() + 1}월{" "}
          {new Date(nowRoomPost.end_day).getDate()}일
        </p>

        {/* 1박 가격 섹션 */}
        <p className="text-xl font-light">
          최소 숙박일: {nowRoomPost.min_duration}일
        </p>
        <div className="flex">
          <p className="text-xl font-light">가격:&nbsp;</p>
          <p className="text-xl font-bold ">
            ₩{nowRoomPost.price.toLocaleString()}
          </p>
          <p className="text-lg">&nbsp;/ 일</p>
        </div>
        {/* 시작 날짜 및 최소 기간 섹션 */}
      </div>
    </RS.RoomInfoSection>
  );
}
