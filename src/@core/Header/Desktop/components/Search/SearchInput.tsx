import DashboardItem from "./components/DashboardItem";
import SearchButton from "./components/SearchButton";
import SearchDate from "./components/SearchDate";
import SearchLocation from "./components/SearchLocation";
import SearchPriceRange from "./components/SearchPriceRange";

const SearchInput = () => {
  return (
    <div className="flex-1 flex justify-center items-center h-16 sm:h-auto">
      <div className="hidden sm:ml-6 sm:block">
        <div className="flex space-x-12 font-semibold leading-6">
          <div className="border-1 border-black	shadow-black bg-white shadow-2xl h-14 rounded-full flex justify-center font-sans text-xs">
            <DashboardItem>
              <SearchLocation />
            </DashboardItem>
            <DashboardItem>
              <SearchDate />
            </DashboardItem>
            <DashboardItem>
              <SearchPriceRange />
            </DashboardItem>
          </div>
          <SearchButton />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
// border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm
