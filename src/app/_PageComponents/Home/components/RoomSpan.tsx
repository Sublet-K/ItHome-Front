import { NormalText, SecondHead, Span } from "@shared/styles/Public.styles";
import { priceToString } from "@shared/components/StaticComponents/StaticComponents";
import { useRouter } from "next/navigation";

import type { Post } from "@type/Type";

export const RoomSpan = ({ room }: { room: Post }) => {
  const router = useRouter();

  return (
    <Span onClick={() => router.push(`/roominfo/${room.key}`)}>
      <SecondHead>{`${room.city} ${room.gu} ${room.dong}`}</SecondHead>
      <NormalText>₩{priceToString(room.price * 30)}/1개월</NormalText>
    </Span>
  );
};
