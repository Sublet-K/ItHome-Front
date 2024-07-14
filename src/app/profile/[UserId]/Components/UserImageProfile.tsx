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
      <div className="flex justify-center items-center">
        <NormalImage imageLink={imageLink} altContent={"my profile"} />
      </div>

      <SecondHead className="mt-3">{user.username}</SecondHead>
    </>
  );
};
