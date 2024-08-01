import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import dayjs from "dayjs";

export const useSearchDateStore = create<{
  searchDate: [string, string];
  setSearchDate: (startDate: string, endDate: string) => void;
}>()(
  persist(
    (set, get) => ({
      searchDate: [
        dayjs(new Date()).format("YYYY-MM-DD"),
        dayjs(new Date(new Date().setMonth(new Date().getMonth() + 1))).format(
          "YYYY-MM-DD"
        ), // 1월 30일에 실행하면 2월 30일이 나와버리지 않는지 확인 필요.
      ],
      setSearchDate: (startDate: string, endDate: string) =>
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
