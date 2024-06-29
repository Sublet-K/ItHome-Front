import { useEffect, useState } from "react";
import {
  NormalButton,
  NormalText,
  SecondHead,
  UploadButton,
} from "@shared/styles/Public.styles";
import {
  DateFormat,
  priceToString,
} from "@shared/components/StaticComponents/StaticComponents";
import { FetchGetPost } from "@shared/components/FetchList/FetchList";
import { guestInfoPopUpStore } from "@store/GuestInfoStore";
import { PostSummaryBlock } from "../Blocks/PostSummaryBlock";
import { Post } from "@type/Type";
import { PostUploadDialog } from "../Dialog/PostUploadDialog";

function PostListComponent({
  userId,
  guestMode = true,
}: {
  userId: string;
  guestMode?: boolean;
}) {
  const [postInfo, setPostInfo] = useState<Post[]>([]);

  FetchGetPost(userId, setPostInfo);
  const { postPopUpState, setPostPopUpState } = guestInfoPopUpStore(
    (state) => ({
      postPopUpState: state.postPopUpState,
      setPostPopUpState: state.setPostPopUpState,
    })
  );

  return (
    <div className="">
      <div className="flex justify-between">
        <SecondHead className="inline">내 방 보기</SecondHead>

        {guestMode && (
          <UploadButton className="mb-4" onClick={setPostPopUpState}>
            방 올리기
          </UploadButton>
        )}
      </div>
      <div className="mt-4">
        {(postInfo && postInfo.length) > 0 ? (
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
        <PostUploadDialog />
      </div>
    </div>
  );
}

export { PostListComponent };
