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
    <div>
      <div className="flex justify-center items-center">
        <ImageUploadButton onClick={setImagePopUpState}>
          <NormalImage imageLink={imageLink} altContent={"user profile"} />
        </ImageUploadButton>
      </div>
      <ImageDialog />
      <div>
        <SecondHead className="mt-3">{user.username}</SecondHead>

        <NormalButton className="float-left" onClick={onClick}>
          강력한 사용자 인증하기
        </NormalButton>
      </div>
      <NormalText className="underline">{user.school}</NormalText>

      {Object.keys(frame).map((k, index) => {
        return (
          <VerifyList key={index} k={k} v={frame[k as keyof typeof frame]} />
        );
      })}

      <StrongVerifyUserDialog popupState={popupState} onClick={onClick} />
    </div>
  );
}
