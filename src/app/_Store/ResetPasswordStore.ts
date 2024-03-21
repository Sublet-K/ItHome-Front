import { create } from "zustand";

export const verifyStore = create<{
  verifyPasswordEmail: boolean;
  setVerifyPasswordEmail: () => void;
}>()((set) => ({
  verifyPasswordEmail: false,
  setVerifyPasswordEmail: () =>
    set((state) => ({
      verifyPasswordEmail: !state.verifyPasswordEmail,
    })),
}));
