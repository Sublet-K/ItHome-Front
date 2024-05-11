import * as hs from "../Header.styles";
import SearchIcon from "@mui/icons-material/Search";
import { FetchSearchPost } from "@shared/components/FetchList/FetchList";
import { SubletPostStore } from "@store/SubletPostStore";
import { useSearchDateStore } from "@core/Header/store/SearchDateStore";
import { useSearchLocationStore } from "@core/Header/store/SearchLocationStore";
import { useSearchPriceStore } from "@core/Header/store/SearchPriceStore";
import { useSearchKeyword } from "@core/Header/store/SearchKeywordStore";

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
      if (location.pathname === "/searchtest") {
        // searchtest
        window.location.reload();
      } else {
        window.location.href = "/searchtest"; // searchtest
      }
    });
  };

  return (
    <hs.SearchIconStyle>
      <SearchIcon onClick={doSearch} style={{ fontSize: "1.5em" }} />
    </hs.SearchIconStyle>
  );
};

export default SearchButton;
