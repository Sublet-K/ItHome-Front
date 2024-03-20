import { NormalText, SecondHead, Span } from "../_Styles/Public.styles";
import { priceToString } from "./StaticComponents";
import { useRouter } from "next/navigation";

import type { Room } from "../RoomType";

export const RoomSpan = ({ room }: { room: Room }) => {
  const router = useRouter();

  return (
    <Span onClick={() => router.push(`/roominfo/${room.key}`)}>
      <SecondHead>{`${room.city} ${room.gu} ${room.dong}`}</SecondHead>
      <NormalText>₩{priceToString(room.price * 30)}/1개월</NormalText>
    </Span>
  );
};
