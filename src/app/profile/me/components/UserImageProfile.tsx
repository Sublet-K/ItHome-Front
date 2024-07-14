import { ImageDialog } from "@shared/components/Popup/Popup";
import {
  ImageUploadButton,
  NormalButton,
  NormalText,
  SecondHead,
} from "@shared/styles/Public.styles";
import { verifyFrame } from "../button-frames/UserImageFrame";
import { VerifyList } from "./Info/VerifyList";
import { UserForm } from "@/app/UserType";
import { guestInfoPopUpStore } from "@store/GuestInfoStore";
import { useState } from "react";
import { StrongVerifyUserDialog } from "./Dialog/StrongVerfifyUserDialog";
import Image from "next/image";
import { NormalImage } from "@shared/components/Image/Image";

export function UserBaseComponent({ user }: { user: UserForm }) {
  const frame = verifyFrame(user);
  const imageLink = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public_user/${user.image_id}.jpg`;
  const { setImagePopUpState } = guestInfoPopUpStore((state) => ({
    setImagePopUpState: state.setImagePopUpState,
  }));
  const [popupState, setPopupState] = useState(false);
  const onClick = () => {
    setPopupState(!popupState);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-lg mx-auto my-10 bg-white rounded-lg p-5">
        <div className="flex justify-center items-center">
          <ImageUploadButton onClick={setImagePopUpState}>
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <NormalImage imageLink={imageLink} altContent={"user profile"} />
            </div>
          </ImageUploadButton>
        </div>
        <ImageDialog />
        <SecondHead className="text-center text-2xl font-semibold mt-3">
          {user.username}
        </SecondHead>
      </div>
    </div>
  );
}
