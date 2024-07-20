import * as RS from "@shared/styles/RoomInfo.styles";
import type { Post } from "@type/Type";
import PersonIcon from "@mui/icons-material/Person";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import HomeIcon from "@mui/icons-material/Home";
import BathtubIcon from "@mui/icons-material/Bathtub";
import { NormalText, SecondHead } from "@shared/styles/Public.styles";
export function RoomPrice({ nowRoomPost }: { nowRoomPost: Post }) {
  return (
    <div>
      <h2 className="text-2xl md:text-xl font-semibold">{nowRoomPost.title}</h2>

      <div className="flex flex-wrap content-center justify-around mt-4">
        <div className="font-light text-lg md:text-sm">
          <PersonIcon className="inline-block mr-1" />
          최대 {nowRoomPost.limit_people} 인
        </div>
        <div className="font-light text-lg md:text-sm">
          <SingleBedIcon className="inline-block mr-1" />방{" "}
          {nowRoomPost.number_room} 개
        </div>
        <div className="font-light text-lg md:text-sm">
          <HomeIcon className="inline-block mr-1" />
          침실 {nowRoomPost.number_bedroom} 개
        </div>
        <div className="font-light text-lg md:text-sm">
          <BathtubIcon className="inline-block mr-1" />
          화장실 {nowRoomPost.number_bathroom} 개
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
}
