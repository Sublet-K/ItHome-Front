import { create } from "zustand";

export const loginPopUpStore = create<{
  loginPopUpState: boolean;
  setLoginPopUpState: () => void;
}>()((set) => ({
  loginPopUpState: false,
  setLoginPopUpState: () =>
    set((state) => ({
      loginPopUpState: !state.loginPopUpState,
    })),
}));
