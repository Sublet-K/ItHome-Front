import { UserForm } from "@app/UserType";
import { FetchGetOneUser } from "@shared/components/FetchList/FetchList";
import { InputText, NormalButton } from "@shared/styles/Public.styles";
import { ChangeEventHandler, Dispatch, SetStateAction } from "react";

export function InputId({
  idVeriftyState,
  inputHandle,
  idState,
  setUserInfo,
  setCheckingEmail,
  setIdVerifyState,
}: {
  idVeriftyState: boolean;
  inputHandle: ChangeEventHandler<HTMLInputElement>;
  idState: string;
  setUserInfo: Dispatch<SetStateAction<UserForm | undefined>>;
  setCheckingEmail: Dispatch<SetStateAction<boolean>>;
  setIdVerifyState: Dispatch<SetStateAction<boolean>>;
}) {
  const onClick = () => {
    FetchGetOneUser(idState, setUserInfo).then((response) => {
      if (response) {
        setCheckingEmail(true);
      } else {
        setIdVerifyState(false);
      }
    });
  };
  return (
    <>
      {idVeriftyState ? (
        <div className="mt-2">
          <InputText
            name="idState"
            placeholder="아이디"
            onChange={inputHandle}
            value={idState}
          />
        </div>
      ) : (
        <>
          <div className="mt-2">
            <InputText
              name="idState"
              placeholder="아이디"
              onChange={inputHandle}
              value={idState}
            />
          </div>
          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
            아이디가 틀렸습니다.
          </span>
        </>
      )}

      <NormalButton onClick={onClick}>다음</NormalButton>
    </>
  );
}
