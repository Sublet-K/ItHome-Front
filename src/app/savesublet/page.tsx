"use client";
import React, { useEffect } from "react";
import Map from "@shared/components/Map/Map";
import { SubletPostStore } from "@store/SubletPostStore";
import PinDropIcon from "@mui/icons-material/PinDrop";
import styled from "styled-components";
import { RoomProfile } from "@app/_PageComponents/Home/components/RoomProfile";
import { useUserLikeStore } from "@store/UserLikeStore";

export function SavePost(props: any) {
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

  useEffect(() => {
    // asyncGetPost(page);
    if (!postExist) {
      asyncGetPostAll();
    }
  }, []);

  useEffect(() => {}, [postAll[0]?.marker]);

  return (
    <section className="bg-white py-8">
      <div className="bg-white text-gray-600">
        <p className="text-xl font-light container mx-auto flex flex-wrap pt-4">
          검색 숙소:{postAll.length}개
        </p>{" "}
        <div className="container mx-auto flex items-center justify-center flex-wrap pt-4">
          {postExist &&
            postAll?.map((room, index) => (
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
