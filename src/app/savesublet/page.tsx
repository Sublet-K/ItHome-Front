"use client";
import { Post } from "@/@type/Type";
import { RoomProfile } from "@app/_PageComponents/Home/components/RoomProfile";
import { FetchGetLikePosts } from "@shared/components/FetchList/FetchList";
import { SubletPostStore } from "@store/SubletPostStore";
import { useUserLikeStore } from "@store/UserLikeStore";
import { useState } from "react";

export function SavePost(props: any) {
  const { likePostId, setLikePostId } = useUserLikeStore();
  const [likePosts, setLikesPosts] = useState([] as Post[]);
  FetchGetLikePosts(setLikesPosts);
  const { page, asyncGetPost, asyncGetPostAll } = SubletPostStore((state) => ({
    page: state.page,
    asyncGetPost: state.asyncGetPost,
    asyncGetPostAll: state.asyncGetPostAll,
  }));
  const { post, postExist, postAll } = SubletPostStore((state) => ({
    post: state.post,
    postExist: state.postExist,
    postAll: state.postAll,
  }));

  return (
    <section className="bg-white py-8">
      <div className="bg-white text-gray-600">
        <p className="text-xl font-light container mx-auto flex flex-wrap pt-4">
          저장한 호스팅:{likePosts.length}개
        </p>{" "}
        <div className="flex flex-wrap justify-center items-center pt-4">
          {likePosts.map((room, index) => (
            <RoomProfile
              key={index}
              room={room}
              likes={likePostId}
              setLikes={setLikePostId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SavePost;
