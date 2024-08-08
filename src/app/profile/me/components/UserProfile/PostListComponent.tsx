import { FetchGetPost } from "@shared/components/FetchList/FetchList";
import {
  DateFormat,
  priceToString,
} from "@shared/components/StaticComponents/StaticComponents";
import { NormalText } from "@shared/styles/Public.styles";
import { guestInfoPopUpStore } from "@store/GuestInfoStore";
import { Post } from "@type/Type";
import { useState } from "react";
import { PostSummaryBlock } from "../Blocks/PostSummaryBlock";
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
      <div className="">
        <h2 className="text-3xl font-semibold">호스팅 리스트</h2>

        <div className="mt-1">
          {(postInfo && postInfo.length) > 0 ? (
            postInfo.map((res, index) => {
              const address = res.street;
              const postDate = DateFormat(res.post_date);
              const price = priceToString(res.price);

              return (
                <PostSummaryBlock
                  key={index}
                  room={res}
                  postDate={postDate}
                  price={price}
                  address={address}
                  guestMode={!guestMode}
                />
              );
            })
          ) : (
            <NormalText>올린 방이 아직 없습니다.</NormalText>
          )}
        </div>
        {guestMode && (
          <div className="mt-4">
            <button
              className="border p-2.5 bg-gray-800 border-black rounded-lg hover:bg-black"
              onClick={setPostPopUpState}
            >
              <p className="text-base text-white font-light">호스팅하기</p>
            </button>
          </div>
        )}
      </div>

      <PostUploadDialog />
    </div>
  );
}

export { PostListComponent };
