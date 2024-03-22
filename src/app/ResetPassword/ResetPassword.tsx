import { ChangeEventHandler, useState } from "react";
import { verifyStore } from "@store/ResetPasswordStore";
import { FetchChangePassword } from "@shared/components/FetchList/FetchList";
import {
  Alert,
  FailAlert,
  notFoundError,
  raiseError,
} from "@shared/components/StaticComponents/StaticComponents";
// import { useNavigate } from "react-router-dom";
import { InputVerificationNumber } from "./components/InputVerificationNumber";
import { InputResetPassword } from "./components/InputResetPassword";
import { Label, NormalText, SecondHead } from "@shared/styles/Public.styles";
import { InputId } from "./components/InputId";
import { User, UserForm } from "@app/UserType";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [inputs, setInputs] = useState<{
    idState: string;
    passwordState: string;
  }>({
    idState: "",
    passwordState: "",
  });
  const [successState, setSuccessState] = useState(false);
  const [failState, setFailState] = useState(false);
  const [idVeriftyState, setIdVerifyState] = useState(true);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const { idState, passwordState } = inputs;
  const [userInfo, setUserInfo] = useState<UserForm>({} as UserForm);
  const { verifyPasswordEmail, setVerifyPasswordEmail } = verifyStore(
    (state) => ({
      verifyPasswordEmail: state.verifyPasswordEmail,
      setVerifyPasswordEmail: state.setVerifyPasswordEmail,
    })
  );
  // const navigate = useNavigate();
  const router = useRouter();

  const inputHandle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  console.log(userInfo);
  const onChangePassword = () => {
    if (!userInfo) return;
    FetchChangePassword(userInfo.user_id, passwordState)
      .then((res) => notFoundError(res, true, setSuccessState))
      .then(() => {
        setVerifyPasswordEmail();
        router.push(`/`);
      })
      .catch(raiseError("FetchChangePassword", true, setFailState));
  };
  return (
    <>
      <SecondHead>비밀번호 초기화</SecondHead>

      {userInfo && checkingEmail ? (
        <>
          {verifyPasswordEmail ? (
            <InputResetPassword
              inputHandle={inputHandle}
              passwordState={passwordState}
              onChangePassword={onChangePassword}
            />
          ) : (
            <InputVerificationNumber email={userInfo.email} idState={idState} />
          )}
        </>
      ) : (
        <>
          <NormalText>아이디를 입력하세요</NormalText>
          <Label htmlFor="id">Id </Label>

          <InputId
            idVeriftyState={idVeriftyState}
            inputHandle={inputHandle}
            idState={idState}
            setUserInfo={setUserInfo}
            setCheckingEmail={setCheckingEmail}
            setIdVerifyState={setIdVerifyState}
          />
        </>
      )}
      <div className="clear-both">
        {successState && <Alert />}
        {failState && <FailAlert />}
      </div>
    </>
  );
}
