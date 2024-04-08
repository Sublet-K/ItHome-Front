import { verifyFrame } from "@app/profile/me/button-frames/UserImageFrame";
import { VerifyList } from "@app/profile/me/components/Info/VerifyList";
import { UserForm } from "@app/UserType";
import { NormalImage } from "@shared/components/Image/Image";
import { NormalText, SecondHead } from "@shared/styles/Public.styles";
import Image from "next/image";
// import { verifyFrame } from 'pages/GuestInfo/button-frames/UserImageFrame';

export const UserBaseComponent = ({ user }: { user: UserForm }) => {
  const frame = verifyFrame(user);
  const imageLink = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public_user/${user.image_id}.jpg`;
  return (
    <>
      <NormalImage imageLink={imageLink} altContent={"my profile"} />

      <SecondHead className="mt-3">{user.username}</SecondHead>
      <NormalText className="underline">{user.school}</NormalText>
      {Object.keys(frame).map((k, index) => {
        return (
          <VerifyList key={index} k={k} v={frame[k as keyof typeof frame]} />
        );
      })}
    </>
  );
};
