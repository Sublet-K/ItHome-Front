import * as hs from "../Header.styles";
import SearchIcon from "@mui/icons-material/Search";
import { FetchSearchedPost } from "@shared/components/FetchList/FetchList";
import { SubletPostStore } from "@store/SubletPostStore";
import { useSearchDateStore } from "@core/Header/store/SearchDateStore";
import { useSearchLocationStore } from "@core/Header/store/SearchLocationStore";
import { useSearchPriceStore } from "@core/Header/store/SearchPriceStore";


const SearchButton = () => {
  const { searchDate } = useSearchDateStore();
  const { searchLocation } = useSearchLocationStore();
  const { priceRange } = useSearchPriceStore();
  const { setPosts } = SubletPostStore((state) => ({
    setPosts: state.setPosts,
  }));
  const doSearch = () => {
    FetchSearchedPost(searchDate, searchLocation, priceRange, setPosts).then(() => {
      if (location.pathname === "/SearchSubletInfo") {
        window.location.reload();
      } else {
        window.location.href = "/SearchSubletInfo";
      }
    });
  };

  return (
    <hs.SearchIconStyle>
      <SearchIcon onClick={doSearch} />
    </hs.SearchIconStyle>
  );
}

export default SearchButton;