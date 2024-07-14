import {
  EmailDialog,
  PhoneDialog,
  VerifyEmailDialog,
} from "@shared/components/Popup/Popup";
import { StyleComponent } from "@shared/components/StaticComponents/StaticComponents";
import {
  Label,
  NormalButton,
  NormalText,
  SecondHead,
  SvgHoverButton,
  UploadButton,
} from "@shared/styles/Public.styles";
import { UserForm } from "@app/UserType";
import { guestInfoPopUpStore } from "@store/GuestInfoStore";

export const UserPrivateComponent = ({ user }: { user: UserForm }) => {
  const { setEmailPopUpState, setPhonePopUpState, setVerifyEmailPopUpState } =
    guestInfoPopUpStore((state) => ({
      setEmailPopUpState: state.setEmailPopUpState,
      setPhonePopUpState: state.setPhonePopUpState,
      setVerifyEmailPopUpState: state.setVerifyEmailPopUpState,
    }));

  if (user.phone !== undefined) {
    const phoneNumber = user.phone
      .replace("+8210", "010")
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");

    return (
      <div className="mt-6">
        <div className="ml-4 mt-4">
          <Label>이메일</Label>
          <div className="flex items-center justify-between">
            <button
              className="border-b border-gray-300"
              onClick={setEmailPopUpState}
            >
              <NormalText className="text-lg">{user.email}</NormalText>
            </button>
            {!user.verify_email && (
              <UploadButton className="ml-4" onClick={setVerifyEmailPopUpState}>
                인증하기
              </UploadButton>
            )}
          </div>
          <EmailDialog originalEmail={user.email} schoolState={user.school} />

          <div className="">
            <Label>전화번호</Label>
            <button
              onClick={setPhonePopUpState}
              className="border-b border-gray-300"
            >
              <NormalText className="text-lg">{phoneNumber}</NormalText>
            </button>
            <PhoneDialog originalPhone={phoneNumber} />
          </div>
        </div>
        <VerifyEmailDialog email={user.email} userId={user.user_id} />
      </div>
    );
  } else {
    return null;
  }
};
