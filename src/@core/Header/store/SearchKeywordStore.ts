import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSearchKeyword = create<{
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: string) => void;
}>()(
  persist(
    (set, get) => ({
      searchKeyword: "",
      setSearchKeyword: (searchKeyword: string) =>
        set({
          searchKeyword: searchKeyword,
        }),
    }),
    {
      name: "useSearchKeyword-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
