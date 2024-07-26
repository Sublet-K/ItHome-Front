import { create } from "zustand";

export const guestInfoPopUpStore = create<{
  imagePopUpState: boolean;
  phonePopUpState: boolean;
  emailPopUpState: boolean;
  verifyEmailPopUpState: boolean;
  postPopUpState: boolean;
  signUpPopUpState: boolean;
  deleteUserPopUpState: boolean;
  setVerifyEmailPopUpState: () => void;
  setImagePopUpState: () => void;
  setEmailPopUpState: () => void;
  setPhonePopUpState: () => void;
  setPostPopUpState: () => void;
  setSignUpPopUpState: () => void;
  setDeleteUserPopUpState: () => void;
}>()((set) => ({
  imagePopUpState: false,
  phonePopUpState: false,
  emailPopUpState: false,
  verifyEmailPopUpState: false,
  postPopUpState: false,
  signUpPopUpState: false,
  deleteUserPopUpState: false,
  setVerifyEmailPopUpState: () =>
    set((state) => ({
      verifyEmailPopUpState: !state.verifyEmailPopUpState,
    })),
  setImagePopUpState: () =>
    set((state) => ({
      imagePopUpState: !state.imagePopUpState,
    })),
  setEmailPopUpState: () =>
    set((state) => ({
      emailPopUpState: !state.emailPopUpState,
    })),
  setPhonePopUpState: () =>
    set((state) => ({
      phonePopUpState: !state.phonePopUpState,
    })),
  setPostPopUpState: () =>
    set((state) => ({
      postPopUpState: !state.postPopUpState,
    })),
  setSignUpPopUpState: () =>
    set((state) => ({
      signUpPopUpState: !state.signUpPopUpState,
    })),
  setDeleteUserPopUpState: () =>
    set((state) => ({
      deleteUserPopUpState: !state.deleteUserPopUpState,
    })),
}));

// export const verifyEmailStore = create<{
//   verifyNumberState: string;
//   setVerifyNumberState: () => void;
// }>()((set) => ({
//   verifyNumberState: "",
//   setVerifyNumberState: () =>
//     set((state) => ({
//       verifyNumberState: state.number,
//     })),
// }));
