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
      <div>
        <SecondHead>사용자 정보</SecondHead>

        <div className="ml-4 mt-4">
          <Label>이메일</Label>

          <button
            className="border-solid border-b border-black"
            onClick={setEmailPopUpState}
          >
            <div>
              <div className="inline-block">
                <NormalText className="justify-start">{user.email}</NormalText>
              </div>

              {!user.verify_email && (
                <div>
                  <NormalButton
                    className="float-left"
                    onClick={setVerifyEmailPopUpState}
                  >
                    인증하기
                  </NormalButton>
                </div>
              )}
            </div>
          </button>
          <EmailDialog originalEmail={user.email} schoolState={user.school} />
          <Label>전화번호</Label>
          <button
            onClick={setPhonePopUpState}
            className="border-solid border-b border-black"
          >
            <div>
              <div className="inline-block">
                <NormalText className="justify-start">{phoneNumber}</NormalText>
              </div>
            </div>

            <PhoneDialog originalPhone={phoneNumber} />
          </button>
        </div>
        <VerifyEmailDialog email={user.email} userId={user.user_id} />
      </div>
    );
  } else {
    return;
  }
};
