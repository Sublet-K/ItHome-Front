import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUserInfoStore = create<{
  userInfo: {
    id: string;
    user_id: string;
    image_id: string;
    username: string;
    email: string;
    phone: string;
    school: string;
    id_card: boolean;
    verify_school: boolean;
    verify_email: boolean;
    verify_phone: boolean;
    birth: string;
    student_id: number;
    gender: string;
  };
  setUserInfo: (newUserInfo: {
    id: string;
    user_id: string;
    image_id: string;
    username: string;
    email: string;
    phone: string;
    school: string;
    id_card: boolean;
    verify_school: boolean;
    verify_email: boolean;
    verify_phone: boolean;
    birth: string;
    student_id: number;
    gender: string;
  }) => void;
}>()(
  persist(
    (set) => ({
      userInfo: {
        id: "",
        user_id: "",
        image_id: "",
        username: "",
        email: "",
        phone: "",
        school: "",
        id_card: false,
        verify_school: false,
        verify_email: false,
        verify_phone: false,
        birth: "",
        student_id: 0,
        gender: "",
      },
      setUserInfo: (newUserInfo) =>
        set({
          userInfo: newUserInfo,
        }),
    }),
    {
      name: "userInfoStore-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
