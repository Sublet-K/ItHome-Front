import { Reservation } from "@app/ReservationType";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const defaultUserInfo = {
  id: "",
  version: 0,
  user_id: "",
  image_id: "",
  password: "",
  username: "",
  email: "",
  phone: "",
  reservation_post: [] as Reservation[],
  delete: false,
  school: "",
  id_card: false,
  chat_id: [],
  // like_post_id: [],
  verify_school: false,
  verify_email: false,
  verify_phone: false,
  birth: new Date(),
  student_id: 0,
  gender: "",
  smoking: false,
};

export const useUserInfoStore = create<{
  userInfo: {
    id: string;
    version: number;
    user_id: string;
    image_id: string;
    password: string;
    username: string;
    email: string;
    phone: string;
    reservation_post: Reservation[];
    delete: boolean;
    school: string;
    id_card: boolean;
    chat_id: string[];
    // like_post_id: string[];
    verify_school: boolean;
    verify_email: boolean;
    verify_phone: boolean;
    birth: Date;
    student_id: number;
    gender: string;
    smoking: false;
  };
  setUserInfo: (newUserInfo: typeof defaultUserInfo) => void;
  resetUserInfo: () => void;
}>()(
  persist(
    (set) => ({
      userInfo: defaultUserInfo,
      setUserInfo: (newUserInfo) =>
        set({
          userInfo: newUserInfo,
        }),
      resetUserInfo: () => set({ userInfo: defaultUserInfo }),
    }),
    {
      name: "userInfoStore-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
