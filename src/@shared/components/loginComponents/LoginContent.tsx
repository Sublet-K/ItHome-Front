import {
  ChangeEventHandler,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";
import { DialogContent } from "@mui/material";
import {
  InputText,
  Label,
  NormalButton,
  PolicyText,
  SecondHead,
} from "@shared/styles/Public.styles";
import Link from "next/link";
import { InputPassword } from "../Input/TextInputTag";
import { guestInfoPopUpStore } from "@store/GuestInfoStore";
import { useUserInfoStore } from "@store/UserInfoStore";
import { FetchLogin } from "../FetchList/FetchList";

export const LoginContent = ({
  setPopUpState,
}: {
  setPopUpState: Dispatch<SetStateAction<boolean>> | undefined;
}) => {
  const { setSignUpPopUpState } = guestInfoPopUpStore((state) => ({
    setSignUpPopUpState: state.setSignUpPopUpState,
  }));
  const { setUserInfo } = useUserInfoStore();

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
    FetchLogin({ id: idState, password: passwordState, setUserInfo });
    if (setPopUpState) setPopUpState(false);
  };

  const signUpHandled = () => {
    if (setPopUpState) setPopUpState(false);
    setSignUpPopUpState();
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
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
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
          </div>{" "}
          {/*// 이중 intent 되어서 입력 도중 렌더링 되는 것 같습니다. 위 컴포넌트 해제하고 여기에 직접 쓰면 정상 작동 합니다.*/}
          <div>
            <div className="mt-2 flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <div className="text-sm">
                <Link href="/resetpassword">
                  <PolicyText>Forgot password?</PolicyText>
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <InputPassword onChange={inputHandle} value={passwordState} />
            </div>
          </div>{" "}
          {/*// 이중 intent 되어서 입력 도중 렌더링 되는 것 같습니다. 위 컴포넌트 해제하고 여기에 직접 쓰면 정상 작동 합니다.*/}
        </div>
        <div>
          <NormalButton
            type="submit"
            onClick={loginHandled}
            className="flex w-full justify-center mt-5"
          >
            로그인 하기
          </NormalButton>
        </div>
        <div className="text-sm">
          <Link href="#">
            <PolicyText
              className="mt-2 ml-1 text-m font-bold"
              onClick={signUpHandled}
            >
              회원가입
            </PolicyText>
          </Link>
        </div>
      </DialogContent>
    </>
  );
};
