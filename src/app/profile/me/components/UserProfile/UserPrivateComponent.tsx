import { UserForm } from "@app/UserType";
import {
  EmailDialog,
  PhoneDialog,
  VerifyEmailDialog,
} from "@shared/components/Popup/Popup";
import { NormalText } from "@shared/styles/Public.styles";
import { guestInfoPopUpStore } from "@store/GuestInfoStore";
import { UserDeleteDialog } from "../Dialog/UserDeleteDialog";

export const UserPrivateComponent = ({ user }: { user: UserForm }) => {
  const {
    setEmailPopUpState,
    setPhonePopUpState,
    setVerifyEmailPopUpState,
    setDeleteUserPopUpState,
  } = guestInfoPopUpStore((state) => ({
    setEmailPopUpState: state.setEmailPopUpState,
    setPhonePopUpState: state.setPhonePopUpState,
    setVerifyEmailPopUpState: state.setVerifyEmailPopUpState,
    setDeleteUserPopUpState: state.setDeleteUserPopUpState,
  }));

  if (user.phone !== undefined) {
    const phoneNumber = user.phone
      .replace("+8210", "010")
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");

    return (
      <div className="mt-6">
        <h2 className="text-3xl font-semibold">정보</h2>

        <div className="ml-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="border-b border-gray-300">
              <div className="flex justify-between">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0" />

                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />

                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
                      fill="#76767f"
                    />{" "}
                  </g>
                </svg>
                <NormalText className="text-lg">{user.email}</NormalText>
              </div>
            </div>
          </div>
          <EmailDialog originalEmail={user.email} schoolState={user.school} />

          <div className="mt-4">
            <button
              onClick={setPhonePopUpState}
              className="border-b border-gray-300"
            >
              <div className="flex justify-between">
                <svg
                  fill="#76767f"
                  width="25px"
                  height="25px"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M20.629 5h-9.257a1.6 1.6 0 0 0-1.601 1.603V25.4a1.6 1.6 0 0 0 1.601 1.601h9.257c.883 0 1.6-.718 1.6-1.601V6.603c0-.885-.717-1.603-1.6-1.603zm-6.247 1.023h3.302v.768h-3.302v-.768zm1.619 19.395a1.024 1.024 0 0 1-1.023-1.021 1.023 1.023 0 0 1 2.044 0c-.001.494-.46 1.021-1.021 1.021zm5.028-3.501H10.971V7.704h10.058v14.213z"></path>
                  </g>
                </svg>
                <NormalText className="text-lg">{phoneNumber}</NormalText>
              </div>
            </button>
            <PhoneDialog originalPhone={phoneNumber} />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={setDeleteUserPopUpState}
              className="border-b border-gray-300"
            >
              <div className="">
                <NormalText className="text-lg">탈퇴하기</NormalText>
              </div>
            </button>
            <UserDeleteDialog userId={user.user_id} />
          </div>
        </div>
        <VerifyEmailDialog email={user.email} userId={user.user_id} />
      </div>
    );
  } else {
    return null;
  }
};
