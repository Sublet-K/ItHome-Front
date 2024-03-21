import { NormalText, SecondHead } from "@shared/styles/Public.styles";
import { verifyFrame } from "@app/GuestInfo/button-frames/UserImageFrame";
import { VerifyList } from "@app/GuestInfo/components/Info/VerifyList";
import { UserForm } from "@app/UserType";

export const UserBaseComponent = ({ user }: { user: UserForm }) => {
  const frame = verifyFrame(user);
  const imageLink = `${process.env.REACT_APP_BACKEND_URL}/public_user/${user.image_id}.jpg`;

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
