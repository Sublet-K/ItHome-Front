import { create } from 'zustand';

export const verifyStore = create(set => ({
  verifyPasswordEmail: false,
  setVerifyPasswordEmail: () =>
    set(state => ({
      verifyPasswordEmail: !state.verifyPasswordEmail,
    })),
}));
