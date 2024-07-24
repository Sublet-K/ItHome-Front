import { InputPassword } from "@shared/components/Input/TextInputTag";
import { NormalButton, NormalText } from "@shared/styles/Public.styles";
import { ChangeEventHandler, MouseEventHandler } from "react";

export const InputResetPassword = ({
  inputHandle,
  passwordState,
  onChangePassword,
}: {
  inputHandle: ChangeEventHandler<HTMLInputElement>;
  passwordState: string;
  onChangePassword: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="animate__animated animate__backInRight">
      <NormalText>초기화할 비밀번호를 입력하세요.</NormalText>
      <div className="mt-2">
        <InputPassword onChange={inputHandle} value={passwordState} />
      </div>
      <NormalButton onClick={onChangePassword}>다음</NormalButton>
    </div>
  );
};
