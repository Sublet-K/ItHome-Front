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

  useEffect(() => {
    toast("검색이 완료되었습니다.", {
      position: "top-right", // 위치를 하단 중앙으로 설정
      autoClose: 1000, // 1초 후에 자동으로 닫힘
      hideProgressBar: true, // 진행 바 숨김
      closeOnClick: true, // 클릭 시 닫힘
      pauseOnHover: true, // 마우스 오버 시 일시 정지
      draggable: true, // 드래그 가능
      theme: "light", // 심플한 밝은 색상 테마
      style: {
        backgroundColor: "#333", // 어두운 배경색
        color: "#fff", // 흰색 텍스트
        borderRadius: "8px", // 약간의 둥근 모서리
        padding: "10px", // 패딩 추가
      },
    });
  }, [post[0]?.marker]);

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
