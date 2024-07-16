import { verifyFrame } from "@app/profile/me/button-frames/UserImageFrame";
import { VerifyList } from "@app/profile/me/components/Info/VerifyList";
import { UserForm } from "@app/UserType";
import { NormalImage, ProfileImage } from "@shared/components/Image/Image";
import { NormalText, SecondHead } from "@shared/styles/Public.styles";
import Image from "next/image";
// import { verifyFrame } from 'pages/GuestInfo/button-frames/UserImageFrame';

export const UserBaseComponent = ({ user }: { user: UserForm }) => {
  const frame = verifyFrame(user);
  const imageLink = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public_user/${user.image_id}.jpg`;
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="max-w-lg mx-auto my-10 bg-white rounded-lg p-5">
          <div className="flex justify-center items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <ProfileImage imageLink={imageLink} altContent={"user profile"} />
            </div>
          </div>
          <SecondHead className="text-center text-2xl font-semibold mt-3">
            {user.username}
          </SecondHead>
        </div>
      </div>
    </>
  );
};
