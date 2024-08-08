import { useSearchDateStore } from "@core/Header/store/SearchDateStore";
import { useSearchLocationStore } from "@core/Header/store/SearchLocationStore";
import { useSearchPriceStore } from "@core/Header/store/SearchPriceStore";
import { FetchSearchPost } from "@shared/components/FetchList/FetchList";
import { SubletPostStore } from "@store/SubletPostStore";
import { useRouter } from "next/navigation";
import DashboardItem from "./DashboardItem";

import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchButton = ({
  setFilterState,
}: {
  setFilterState: Dispatch<SetStateAction<boolean[]>>;
}) => {
  const { searchDate } = useSearchDateStore();
  const { searchLocation } = useSearchLocationStore();
  const { priceRange } = useSearchPriceStore();
  const searchKeyword = "";
  const { setPosts } = SubletPostStore();
  const router = useRouter();

  const doSearch = () => {
    setFilterState([false, false, false]);
    FetchSearchPost(
      searchDate,
      searchLocation,
      priceRange,
      searchKeyword,
      setPosts
    ).then(() => {
      router.push("/searchsubletinfo");
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
    });
  };

  return (
    <div>
      <button
        onClick={doSearch}
        className="font-bold text-black opacity-90 text-base"
      >
        <DashboardItem clickedState={false}>
          <div className="flex">
            <img src="/svgs/searchButton.svg" alt="search" />
            {/* 검색 */}
          </div>
        </DashboardItem>
      </button>
    </div>
  );
};

export default SearchButton;
