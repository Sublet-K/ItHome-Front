import { useSearchDateStore } from "@core/Header/store/SearchDateStore";
import { useSearchKeyword } from "@core/Header/store/SearchKeywordStore";
import { useSearchLocationStore } from "@core/Header/store/SearchLocationStore";
import { useSearchPriceStore } from "@core/Header/store/SearchPriceStore";
import SearchIcon from "@mui/icons-material/Search";
import { FetchSearchPost } from "@shared/components/FetchList/FetchList";
import { SubletPostStore } from "@store/SubletPostStore";
import * as hs from "../../Header.styles";
import DashboardItem from "./DashboardItem";

const SearchButton = () => {
  const { searchDate } = useSearchDateStore();
  const { searchLocation } = useSearchLocationStore();
  const { priceRange } = useSearchPriceStore();
  const { searchKeyword } = useSearchKeyword();
  const { setPosts } = SubletPostStore();
  const doSearch = () => {
    FetchSearchPost(
      searchDate,
      searchLocation,
      priceRange,
      searchKeyword,
      setPosts
    ).then(() => {
      if (location.pathname === "/searchsubletinfo") {
        // searchtest
        window.location.reload();
      } else {
        window.location.href = "/searchsubletinfo"; // searchtest
      }
    });
  };

  return (
    <button
      onClick={doSearch}
      className="font-bold text-black opacity-90 text-base"
    >
      <DashboardItem>
        <img src="/svgs/searchButton.svg" alt="search" />
      </DashboardItem>
    </button>
  );
};

export default SearchButton;
