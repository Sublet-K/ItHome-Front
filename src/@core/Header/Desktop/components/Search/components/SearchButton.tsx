import { useSearchDateStore } from "@core/Header/store/SearchDateStore";
import { useSearchLocationStore } from "@core/Header/store/SearchLocationStore";
import { useSearchPriceStore } from "@core/Header/store/SearchPriceStore";
import { FetchSearchPost } from "@shared/components/FetchList/FetchList";
import { SubletPostStore } from "@store/SubletPostStore";
import DashboardItem from "./DashboardItem";
import { useRouter } from "next/navigation";

const SearchButton = () => {
  const { searchDate } = useSearchDateStore();
  const { searchLocation } = useSearchLocationStore();
  const { priceRange } = useSearchPriceStore();
  const searchKeyword = "";
  const { setPosts } = SubletPostStore();
  const router = useRouter();

  const doSearch = () => {
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
      <button
        onClick={doSearch}
        className="font-bold text-black opacity-90 text-base"
      >
        <DashboardItem>
          <img src="/svgs/searchButton.svg" alt="search" />
        </DashboardItem>
      </button>
    </div>
  );
};

export default SearchButton;
