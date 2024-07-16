import * as RS from "@shared/styles/RoomInfo.styles";
import type { Post } from "@type/Type";
import PersonIcon from "@mui/icons-material/Person";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import HomeIcon from "@mui/icons-material/Home";
import BathtubIcon from "@mui/icons-material/Bathtub";
import { NormalText, SecondHead } from "@shared/styles/Public.styles";
export function RoomPrice({ nowRoomPost }: { nowRoomPost: Post }) {
  return (
    <RS.RoomInfoSection>
      <RS.RoomTitle>{nowRoomPost.title}</RS.RoomTitle>

      <div className="flex w-1/4 flex-wrap content-center flex-row justify-around mt-4">
        <div className="font-light">
          <PersonIcon />
          최대 {nowRoomPost.limit_people} 인
        </div>
        <div className="font-light">
          <SingleBedIcon />방 {nowRoomPost.number_room} 개
        </div>
        <div className="font-light">
          <HomeIcon />
          침실 {nowRoomPost.number_bedroom} 개
        </div>
        <div className="font-light">
          <BathtubIcon />
          화장실 {nowRoomPost.number_bathroom} 개
        </div>
      </div>
    </RS.RoomInfoSection>
  );
}
