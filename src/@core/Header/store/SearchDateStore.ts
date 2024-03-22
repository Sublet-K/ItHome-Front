import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSearchDateStore = create<{
  searchDate: [Date, Date];
  setSearchDate: (startDate: Date, endDate: Date) => void;
}>()(
  persist(
    (set, get) => ({
      searchDate: [
        new Date(),
        new Date(new Date().setMonth((new Date().getMonth() + 1) % 13)), // 1월 30일에 실행하면 2월 30일이 나와버리지 않는지 확인 필요.
      ],
      setSearchDate: (startDate: Date, endDate: Date) =>
        set({
          searchDate: [startDate, endDate],
        }),
    }),
    {
      name: "useSearchDateStore-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
