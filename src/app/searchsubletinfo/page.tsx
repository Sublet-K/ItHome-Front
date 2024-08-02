"use client";
import { RoomProfile } from "@app/_PageComponents/Home/components/RoomProfile";
import { useTitle } from "@app/_PageComponents/UseTitle";
import { SubletPostStore } from "@store/SubletPostStore";
import { useUserLikeStore } from "@store/UserLikeStore";
import { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SearchSubletInfo(props: any) {
  const {} = SubletPostStore((state) => ({
    page: state.page,
    asyncGetPost: state.asyncGetPost,
    asyncGetPostAll: state.asyncGetPostAll,
  }));
  const { post, postExist } = SubletPostStore((state) => ({
    post: state.post,
    postExist: state.postExist,
  }));
  const { likePostId, setLikePostId } = useUserLikeStore();
  useTitle("검색 결과");

  useEffect(() => {}, [post[0]?.marker]);

  return (
    <section className="bg-white py-8">
      <div className="bg-white text-gray-600">
        <p className="text-xl font-light container mx-auto flex flex-wrap pt-4">
          검색 숙소:{post.length}개
        </p>{" "}
        <div className="container mx-auto flex items-center justify-center flex-wrap pt-4">
          {postExist &&
            post?.map((room, index) => (
              <RoomProfile
                key={index}
                room={room}
                likes={likePostId}
                setLikes={setLikePostId}
              />
            ))}
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
