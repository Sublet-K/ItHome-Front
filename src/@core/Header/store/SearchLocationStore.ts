import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSearchLocationStore = create<{
  searchLocation: {
    city: string;
    gu: string;
  };
  setSearchLocation: (city: string, gu: string) => void;
}>()(
  persist(
    (set, get) => ({
      searchLocation: {
        city: "",
        gu: "",
      },
      // dong: string,
      setSearchLocation: (city, gu) =>
        set({
          searchLocation: { city: city, gu: gu },
        }),
    }),
    {
      name: "searchLocation-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

/* 지도로 검색 하던 부분
export const useSearchLocationStore = create<{
  searchLocation: [number, number];
  setSearchLocation: (posx: number, posy: number) => void;
}>()(
  persist(
    (set, get) => ({
      searchLocation: [37.574583, 126.994143],
      setSearchLocation: (posx, posy) =>
        set({
          searchLocation: [posx, posy],
        }),
    }),
    {
      name: "searchLocation-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
*/
