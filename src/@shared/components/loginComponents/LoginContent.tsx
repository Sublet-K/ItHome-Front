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
      <DialogContent>
        <div className="float-left">
          <SecondHead>로그인</SecondHead>
          <p className="text-base text-gray">
            합리적인 가격의 다양한 집을 확인하세요.
          </p>
        </div>
        <div
          className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm"
          onKeyDown={handleKeyDown}
        >
          <div>
            <Label htmlFor="id">Id</Label>
            <div className="mt-2">
              <InputText
                name="idState"
                placeholder="아이디"
                onChange={inputHandle}
                value={idState}
              />
            </div>
          </div>
          <div>
            <div className="mt-4 flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <div className="text-sm">
                <Link href="/resetpassword">
                  <PolicyText>비밀번호 찾기</PolicyText>
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <InputPassword onChange={inputHandle} value={passwordState} />
            </div>
          </div>
        </div>
        <div>
          <NormalButton
            type="submit"
            onClick={loginHandled}
            className="flex w-full justify-center mt-4"
          >
            로그인 하기
          </NormalButton>
          <UploadButton
            className="flex w-full justify-center mt-4"
            onClick={signUpHandled}
          >
            회원가입
          </UploadButton>
        </div>
      </DialogContent>
    </>
  );
};
