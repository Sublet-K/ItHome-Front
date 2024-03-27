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
      <ImageUploadButton
        onClick={setImagePopUpState}
        className="object-cover w-46 h-26"
      >
        <img
          src={imageLink}
          className="hover:opacity-60 object-scale-down rounded-lg rounded-lg"
          alt="my profile"
        />
      </ImageUploadButton>
      <ImageDialog />

      <SecondHead className="mt-3">{user.username}</SecondHead>
      <NormalText className="underline">{user.school}</NormalText>
      {Object.keys(frame).map((k, index) => {
        return (
          <VerifyList key={index} k={k} v={frame[k as keyof typeof frame]} />
        );
      })}
      <NormalButton className="float-left" onClick={onClick}>
        강력한 사용자 인증하기
      </NormalButton>
      <StrongVerifyUserDialog popupState={popupState} onClick={onClick} />
    </div>
  );
}
