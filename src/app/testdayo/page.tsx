// 클라이언트 사이드에서만 작동하도록 지시하는 코드, Next.js에서 서버 사이드 렌더링 방지
"use client";

// 글로벌 변수 사용에 대한 ESLint 경고 무시
/* eslint-disable no-restricted-globals */
import React from "react";

// 필요한 Swiper 모듈들을 임포트
import {
  Navigation, // 네비게이션 버튼(다음/이전) 활성화
  Pagination, // 페이지네이션 도트 활성화
  Scrollbar, // 드래그 가능한 스크롤바 활성화
  Mousewheel, // 마우스 휠로 스와이퍼 제어 가능하게 함
} from "swiper/modules";

// Swiper 코어와 필요한 컴포넌트 임포트
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper 기본 스타일 임포트
import "swiper/swiper-bundle.css";

// 메인 앱 컴포넌트
const App = () => {
  return (
    <main>
      <Swiper
        // Swiper 인스턴스에 사용될 모듈들
        modules={[Pagination, Navigation]}
        // Swiper 초기화될 때 실행할 콜백 함수
        onSwiper={(swiper: any) => console.log("Swiper 인스턴스:", swiper)}
        // 한 번에 보여줄 슬라이드 수
        slidesPerView={1}
        // 슬라이드 변경을 위한 스와이프 동작의 임계값(픽셀 단위)
        threshold={2}
        // 슬라이드 간의 간격(픽셀 단위)
        spaceBetween={10}
        // 네비게이션 컨트롤 활성화
        navigation={true}
        // 페이지네이션 설정
        pagination={{ type: "progressbar", clickable: true }} // 페이지네이션 도트 클릭 가능하게 설정
      >
        {/* Swiper 내의 개별 슬라이드 */}
        <SwiperSlide>슬라이드 1</SwiperSlide>
        <SwiperSlide>슬라이드 2</SwiperSlide>
        <SwiperSlide>슬라이드 3</SwiperSlide>
        <SwiperSlide>슬라이드 4</SwiperSlide>
        <SwiperSlide>슬라이드 5</SwiperSlide>
      </Swiper>
    </main>
  );
};

// App 컴포넌트를 기본 내보내기로 설정
export default App;
