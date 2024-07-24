import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserLikeStore = create<{
  likePostId: { [key: number]: number };
  setLikePostId: Dispatch<SetStateAction<{ [key: number]: number }>>;
  initFetchLikePostId: (newLikes: { [key: number]: number }) => void;
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
      initFetchLikePostId: (newLikes) => set({ likePostId: newLikes }),
      resetLikePostId: () => set({ likePostId: {} }),
    }),
    {
      name: "userLikeStore-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
