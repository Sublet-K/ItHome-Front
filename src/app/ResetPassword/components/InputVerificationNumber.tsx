import { NormalText } from "@shared/styles/Public.styles";
import { VerifyEmailComponents } from "@shared/components/verifyComponents/Email";

export const InputVerificationNumber = ({
  email,
  idState,
}: {
  email: string;
  idState: string;
}) => {
  return (
    <div className="animate__animated animate__backInRight">
      <NormalText>인증번호 6자리를 입력하세요</NormalText>
      <VerifyEmailComponents
        email={email}
        userId={idState}
        purpose={"resetpassword"}
      />
    </div>
  );
};
