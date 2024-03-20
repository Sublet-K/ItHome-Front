import { create } from 'zustand';

export const guestInfoPopUpStore = create(set => ({
  imagePopUpState: false,
  phonePopUpState: false,
  emailPopUpState: false,
  verifyEmailPopUpState: false,
  postPopUpState: false,
  signUpPopUpState: false,
  setVerifyEmailPopUpState: () =>
    set(state => ({
      verifyEmailPopUpState: !state.verifyEmailPopUpState,
    })),
  setImagePopUpState: () =>
    set(state => ({
      imagePopUpState: !state.imagePopUpState,
    })),
  setEmailPopUpState: () =>
    set(state => ({
      emailPopUpState: !state.emailPopUpState,
    })),
  setPhonePopUpState: () =>
    set(state => ({
      phonePopUpState: !state.phonePopUpState,
    })),
  setPostPopUpState: () =>
    set(state => ({
      postPopUpState: !state.postPopUpState,
    })),
  setSignUpPopUpState: () =>
    set(state => ({
      signUpPopUpState: !state.signUpPopUpState,
    })),
}));

export const verifyEmailStore = create(set => ({
  verifyNumberState: '',
  setVerifyNumberState: () =>
    set(state => ({
      verifyNumberState: state.number,
    })),
}));
