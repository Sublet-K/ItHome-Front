import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUserInfoStore = create(
  persist(
    set => ({
      userInfo: {
        id: '',
        user_id: '',
        image_id: '',
        username: '',
        email: '',
        phone: '',
        school: '',
        id_card: false,
        verify_school: false,
        verify_email: false,
        verify_phone: false,
        birth: '',
        student_id: 0,
        gender: '',
      },
      setUserInfo: newUserInfo =>
        set({
          userInfo: newUserInfo,
        }),
    }),
    {
      name: 'userInfoStore-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
