"use client";
import { Post } from "@/@type/Type";
import { RoomProfile } from "@app/_PageComponents/Home/components/RoomProfile";
import { FetchGetLikePosts } from "@shared/components/FetchList/FetchList";
import { useUserLikeStore } from "@store/UserLikeStore";
import { useEffect, useState } from "react";

export function SavePost() {
  const { likePostId, setLikePostId } = useUserLikeStore();
  const [likePosts, setLikesPosts] = useState([] as Post[]);

  useEffect(() => {
    FetchGetLikePosts(setLikesPosts);
  }, []);

  return (
    <section className="bg-white py-8">
      <div className="bg-white text-gray-600">
        <p className="text-xl font-light container mx-auto flex flex-wrap pt-4">
          저장한 호스팅: {likePosts.length}개
        </p>
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
