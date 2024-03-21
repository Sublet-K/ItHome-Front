import {
  EmailDialog,
  PhoneDialog,
  VerifyEmailDialog,
} from '@shared/components/Popup/Popup';
import { StyleComponent } from '@shared/components/StaticComponents/StaticComponents';
import { guestInfoPopUpStore } from '@shared/components/Popup/store/guestInfoStore';
import {
  Label,
  NormalButton,
  NormalText,
  SecondHead,
  SvgHoverButton,
} from '@shared/components/styles/Public.styles';

export const UserPrivateComponent = ({ user }) => {
  const { setEmailPopUpState, setPhonePopUpState, setVerifyEmailPopUpState } =
    guestInfoPopUpStore(state => ({
      setEmailPopUpState: state.setEmailPopUpState,
      setPhonePopUpState: state.setPhonePopUpState,
      setVerifyEmailPopUpState: state.setVerifyEmailPopUpState,
    }));

  if (user.phone !== undefined) {
    const phoneNumber = user.phone
      .replace('+8210', '010')
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
      .replace(/(\-{1,2})$/g, '');
    return (
      <div>
        <SecondHead>사용자 정보</SecondHead>

        <div className="ml-4 mt-4">
          <div className="w-2/6">
            <Label>이메일</Label>
            <div>
              <div className="inline-block">
                <NormalText className="justify-start">{user.email}</NormalText>
              </div>
              <SvgHoverButton
                onClick={setEmailPopUpState}
                className="justify-end">
                <StyleComponent content="FixInfo" />
              </SvgHoverButton>
              {!user.verify_email && (
                <div>
                  <NormalButton
                    className="float-left"
                    onClick={setVerifyEmailPopUpState}>
                    인증하기
                  </NormalButton>
                </div>
              )}
            </div>
            <hr className="h-px bg-gray-600 border-0 clear-both" />
            <EmailDialog originalEmail={user.email} schoolState={user.school} />
          </div>

          <VerifyEmailDialog email={user.email} />
          <div className="mt-4 w-2/6">
            <Label>전화번호</Label>
            <div>
              <div className="inline-block">
                <NormalText className="justify-start">{phoneNumber}</NormalText>
              </div>
              <SvgHoverButton onClick={setPhonePopUpState}>
                <StyleComponent content="FixInfo" />
              </SvgHoverButton>
            </div>
            <hr className="h-px bg-gray-600 border-0 clear-both" />

            <PhoneDialog originalPhone={phoneNumber} />
          </div>
        </div>
      </div>
    );
  } else {
    return;
  }
  console.log(phoneNumber, user.phone);
};
