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
  NormalText,
  PolicyText,
  SecondHead,
  UploadButton,
} from "@shared/styles/Public.styles";
import Link from "next/link";
import { guestInfoPopUpStore } from "@store/GuestInfoStore";
import { useUserInfoStore } from "@store/UserInfoStore";
import { useUserLikeStore } from "@store/UserLikeStore";
import { FetchContact } from "@shared/components/FetchList/FetchList";
import { DialogForm } from "@shared/components/Popup/Popup";

export const ContactDialog = ({
  setPopUpState,
  popUpState,
  user_contact,
  title,
  clickHandler,
}: {
  setPopUpState: Dispatch<SetStateAction<boolean>> | undefined;
  popUpState: boolean;
  user_contact: string;
  title: string;
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const [inputs, setInputs] = useState({
    contactState: "",
  });
  const { contactState } = inputs;

  const inputHandle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const contactHandled = () => {
    FetchContact({
      contact: contactState,
      user_contact: user_contact,
      title: title,
    });
    if (setPopUpState) setPopUpState(false);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter") {
      contactHandled();
    }
  };

  return (
    <DialogForm
      openState={popUpState}
      handleClose={clickHandler}
      render={() => (
        <label
          htmlFor="test"
          className="block mb-2 text-sm font-medium text-gray-900 float-left"
        ></label>
      )}
    >
      <DialogContent>
        <div className="float-left">
          <SecondHead>연락처 입력</SecondHead>
          <NormalText>상담 받으실 연락처를 입력해주세요.</NormalText>
        </div>
        <div
          className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm"
          onKeyDown={handleKeyDown}
        >
          <div>
            <div className="mt-2">
              <InputText
                name="contactState"
                placeholder="연락처를 입력해주세요"
                onChange={inputHandle}
                value={contactState}
              />
            </div>
          </div>
          <PolicyText className="mt-4 md-4">
            개인정보 수집 이용 및 제3자 제공에 동의합니다.
          </PolicyText>
        </div>
        <div>
          <NormalButton
            type="submit"
            onClick={contactHandled}
            className="flex w-full justify-center mt-4"
          >
            확인
          </NormalButton>
        </div>
      </DialogContent>
    </DialogForm>
  );
};
