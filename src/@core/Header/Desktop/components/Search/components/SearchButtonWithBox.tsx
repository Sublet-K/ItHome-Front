import { useSearchDateStore } from "@core/Header/store/SearchDateStore";
import { useSearchLocationStore } from "@core/Header/store/SearchLocationStore";
import { useSearchPriceStore } from "@core/Header/store/SearchPriceStore";
import { FetchSearchPost } from "@shared/components/FetchList/FetchList";
import { SubletPostStore } from "@store/SubletPostStore";
import DashboardItem from "./DashboardItem";
import { useRouter } from "next/navigation";
import { BlackButton } from "@shared/styles/Public.styles";

const SearchButtonWithBox = ({ setFilterState }) => {
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
    });
  };

  return (
    <div>
      <BlackButton
        onClick={doSearch}
        // text-black opacity-90 text-base
      >
        <div className="flex">
          <img
            src="/svgs/searchButtonWhite.svg"
            alt="search"
            className="px-1"
          />
          검색하기
        </div>
      </BlackButton>
    </div>
  );
};

export default SearchButtonWithBox;
