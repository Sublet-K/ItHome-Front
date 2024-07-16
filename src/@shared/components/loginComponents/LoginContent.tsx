import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useState,
  KeyboardEventHandler,
} from "react";
import { DialogContent } from "@mui/material";
import {
  InputText,
  Label,
  NormalButton,
  PolicyText,
  SecondHead,
  UploadButton,
} from "@shared/styles/Public.styles";
import Link from "next/link";
import { InputPassword } from "../Input/TextInputTag";
import { guestInfoPopUpStore } from "@store/GuestInfoStore";
import { useUserInfoStore } from "@store/UserInfoStore";
import { FetchLogin } from "../FetchList/FetchList";
import { useUserLikeStore } from "@store/UserLikeStore";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleButton } from "./Google";

export const LoginContent = ({
  setPopUpState,
}: {
  setPopUpState: Dispatch<SetStateAction<boolean>> | undefined;
}) => {
  const { setSignUpPopUpState } = guestInfoPopUpStore((state) => ({
    setSignUpPopUpState: state.setSignUpPopUpState,
  }));
  const { setUserInfo } = useUserInfoStore();
  const { initFetchLikePostId } = useUserLikeStore();

  const [inputs, setInputs] = useState({
    idState: "",
    passwordState: "",
  });
  const { idState, passwordState } = inputs;
  const idList = {
    google: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
  };

  const inputHandle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const loginHandled = () => {
    FetchLogin({
      id: idState,
      password: passwordState,
      setUserInfo,
      initFetchLikePostId,
    });
    if (setPopUpState) setPopUpState(false);
  };

  const signUpHandled = () => {
    if (setPopUpState) setPopUpState(false);
    setSignUpPopUpState();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter") {
      loginHandled();
    }
  };

  return (
    <>
      <DialogContent sx={{ width: 512 }}>
        <div className="float-left">
          <SecondHead>로그인</SecondHead>
          <p className="text-base text-gray">
            합리적인 가격의 다양한 집을 확인하세요.
          </p>
        </div>
        <div>
          <button className="mt-4 w-full">
            <GoogleOAuthProvider clientId={idList.google}>
              <GoogleButton purpose="login" />
            </GoogleOAuthProvider>
          </button>
        </div>

        <UploadButton
          className="flex w-full justify-center mt-4"
          onClick={signUpHandled}
        >
          회원가입
        </UploadButton>
      </DialogContent>
    </>
  );
};
