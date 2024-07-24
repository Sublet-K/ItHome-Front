"use client";
import { RoomProfile } from "@app/_PageComponents/Home/components/RoomProfile";
import { useTitle } from "@app/_PageComponents/UseTitle";
import { SubletPostStore } from "@store/SubletPostStore";
import { useUserLikeStore } from "@store/UserLikeStore";
import { useEffect } from "react";
import styled from "styled-components";

const HoverBtnDiv = styled.div`
  margin: 0 0 0 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const HoverNewPageDiv = styled.div`
  display: flex;
  cursor: pointer;
  gap: 1rem;
  padding: 1rem;
  &:hover {
    background-color: #ceffc8;
  }
`;
const WebkitScrollbar = styled.div`
&::-webkit-scrollbar: {
  width: "5px",
  height: "100px",
  WebkitAppearance: "none",
};
&::-webkit-scrollbar-thumb: {
  borderRadius: "8px",
  border: "2px solid",
  borderColor: "#E7EBF0",
  backgroundColor: "rgba(0 0 0 / 0.5)",
};
`;

function SubletInfo(
  props: any
  //   {
  //   start_day: string | number | Date;
  //   id: any;
  //   image_id: any[];
  //   title: string;
  //   city: string;
  //   gu: string;
  //   dong: string;
  //   street: string;
  //   street_number: number;
  // }
) {
  const start_day = new Date(props.start_day);
  // useEffect(() => {
  // }, [props.marker]);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex">
        <div
          className="flex"
          onClick={() => {
            window.open(`/roominfo/${props.id}`);
          }}
        >
          <img
            alt="Room"
            className="h-20 w-20 rounded-lg"
            height="80"
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/${props.image_id[0]}.jpg`}
            style={{
              aspectRatio: "80/80",
              objectFit: "cover",
            }}
            width="80"
          />
          <div className="flex flex-col justify-between w-full ml-6">
            <h2 className="text-lg font-semibold">{props.title}</h2>
            <p className="text-sm">{props.position}</p>
            <p className="text-sm">
              {props.city +
                " " +
                props.gu +
                " " +
                props.dong +
                " " +
                props.street +
                " " +
                props.street_number}
            </p>
            <p className="text-sm">
              {start_day.getMonth() + 1}월 {start_day.getDate()}일 부터, 최소{" "}
              {props.min_duration}개월
            </p>
            <p className="text-lg font-bold text-[#bd1e59] text-right">
              ₩
              {(props.price * 30)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              / 30일
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchSubletInfo(props: any) {
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
  const { likePostId, setLikePostId } = useUserLikeStore();
  useTitle("검색 결과");

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
