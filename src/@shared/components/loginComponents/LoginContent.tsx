import { DialogContent } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SecondHead } from "@shared/styles/Public.styles";
import { guestInfoPopUpStore } from "@store/GuestInfoStore";
import { useUserInfoStore } from "@store/UserInfoStore";
import { useUserLikeStore } from "@store/UserLikeStore";
import {
  ChangeEventHandler,
  Dispatch,
  KeyboardEventHandler,
  SetStateAction,
  useState,
} from "react";
import { FetchLogin } from "../FetchList/FetchList";
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

  const [errorMessage, setErrorMessage] = useState<string>("");

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
    <DialogContent sx={{ width: { xs: "90%", sm: 512 }, maxWidth: "100%" }}>
      <div className=" mb-4">
        <SecondHead>로그인</SecondHead>
        <p className="text-base text-gray-600 sm:text-sm">
          합리적인 가격의 다양한 집을 확인하세요.
        </p>
      </div>
      <div className="w-full mt-4">
        <GoogleOAuthProvider clientId={idList.google}>
          <GoogleButton purpose="login" setErrorMessage={setErrorMessage} />
        </GoogleOAuthProvider>
      </div>
      {errorMessage && (
        <div className="w-full mt-4 text-red-500 text-center">
          {errorMessage}
        </div>
      )}
      <button
        className="w-full mt-4 border p-2.5 bg-gray-800 border-black rounded-lg hover:bg-black"
        onClick={signUpHandled}
      >
        <p className="text-base text-white font-light">회원가입</p>
      </button>
    </DialogContent>
  );
};
