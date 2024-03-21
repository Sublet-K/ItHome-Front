import { guestInfoPopUpStore } from "@store/GuestInfoStore";
import { useEffect, useState } from "react";
import {
  NormalButton,
  NormalText,
  SecondHead,
} from "@shared/styles/Public.styles";
import {
  DateFormat,
  priceToString,
} from "@shared/components/StaticComponents/StaticComponents";
import { FetchGetPost } from "@shared/components/FetchList/FetchList";
import { PostSummaryBlock } from "../Blocks/PostSummaryBlock";
import { Post } from "@app/PostType";

function PostListComponent({
  userId,
  guestMode = true,
}: {
  userId: string;
  guestMode?: boolean;
}) {
  const [postInfo, setPostInfo] = useState<Post[]>([]);
  FetchGetPost(userId, setPostInfo);
  const { setPostPopUpState } = guestInfoPopUpStore((state) => ({
    setPostPopUpState: state.setPostPopUpState,
  }));

  return (
    <div className="mb-4 mt-8">
      <SecondHead className="inline">방 현황</SecondHead>

      {postInfo.length > 0 ? (
        postInfo.map((res, index) => {
          const address = res.city + " " + res.gu + " " + res.dong;
          const postDate = DateFormat(res.post_date);
          const price = priceToString(res.price);

          return (
            <PostSummaryBlock
              key={index}
              room={res}
              postDate={postDate}
              price={price}
              address={address}
              guestMode={guestMode}
            />
          );
        })
      ) : (
        <NormalText>올린 방이 아직 없습니다.</NormalText>
      )}

      {guestMode && (
        <NormalButton onClick={setPostPopUpState}>방 올리기</NormalButton>
      )}
    </div>
  );
}

export { PostListComponent };
