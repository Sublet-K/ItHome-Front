import { verifyFrame } from "@app/Profile/Me/button-frames/UserImageFrame";
import { VerifyList } from "@app/Profile/Me/components/Info/VerifyList";
import { UserForm } from "@app/UserType";
import { NormalText, SecondHead } from "@shared/styles/Public.styles";
// import { verifyFrame } from 'pages/GuestInfo/button-frames/UserImageFrame';
// import { VerifyList } from 'pages/GuestInfo/components/Info/VerifyList';

export const UserBaseComponent = ({ user }: { user: UserForm }) => {
  const frame = verifyFrame(user);
  const imageLink = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public_user/${user.image_id}.jpg`;

  return (
    <>
      <img
        src={imageLink}
        className="hover:opacity-60 object-scale-down rounded-lg rounded-lg"
        alt="my profile"
      />

      <SecondHead className="mt-3">{user.username}</SecondHead>
      <NormalText className="underline">{user.school}</NormalText>
      {Object.keys(frame).map((k, index) => {
        <VerifyList key={index} k={k} v={frame[k as keyof typeof frame]} />;
      })}
    </>
  );
};
