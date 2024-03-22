import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSearchPriceStore = create<{
  priceRange: [number, number];
  setPriceRange(minPrice: number, maxPrice: number): void;
}>()(
  persist(
    (set, get) => ({
      priceRange: [0, 5000000],
      setPriceRange: (minPrice, maxPrice) =>
        set({
          priceRange: [minPrice, maxPrice],
        }),
    }),
    {
      name: "useSearchPriceStore-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
