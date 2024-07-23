const SearchInput = () => {
  return (
    <div className="flex-1 flex justify-center items-center h-16 sm:h-auto">
      <div className="relative w-full max-w-xs">
        <input
          type="text"
          name="search"
          className="block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Search for anything..."
        />
      </div>
    </div>
  );
};

export default SearchInput;
