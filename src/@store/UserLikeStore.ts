import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Dispatch, SetStateAction } from "react";

export const useUserLikeStore = create<{
  likePostId: { [key: number]: number };
  setLikePostId: Dispatch<SetStateAction<{ [key: number]: number }>>;
  resetLikePostId: () => void;
}>()(
  persist(
    (set) => ({
      likePostId: {},
      setLikePostId: (
        newLikePostId:
          | { [key: number]: number }
          | ((prevState: { [key: number]: number }) => {
              [key: number]: number;
            })
      ) =>
        set((state) => ({
          likePostId:
            typeof newLikePostId === "function"
              ? newLikePostId(state.likePostId)
              : newLikePostId,
        })),
      resetLikePostId: () => set({ likePostId: {} }),
    }),
    {
      name: "userLikeStore-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
