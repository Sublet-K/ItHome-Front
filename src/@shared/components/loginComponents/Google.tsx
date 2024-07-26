import { GoogleLogin } from "@react-oauth/google";
import { guestInfoPopUpStore } from "@store/GuestInfoStore";
import { useUserInfoStore } from "@store/UserInfoStore";
import { Dispatch, SetStateAction } from "react";
import { FetchLogin } from "../FetchList/FetchList";

function decodeJwtResponse(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export function GoogleButton({
  purpose,
  setEmailState,
  setErrorMessage,
}: {
  purpose: string;
  setEmailState?: Dispatch<SetStateAction<string>>;
  setErrorMessage?: Dispatch<SetStateAction<string>>;
}) {
  const { setUserInfo } = useUserInfoStore();
  const { setSignUpPopUpState } = guestInfoPopUpStore((state) => ({
    setSignUpPopUpState: state.setSignUpPopUpState,
  }));

  return (
    <>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const decodeding = decodeJwtResponse(
            credentialResponse.credential as string
          );
          const email = decodeding.email;
          if (purpose === "signup") {
            if (!setEmailState) return;
            setEmailState(email);
          } else if (purpose === "login") {
            try {
              FetchLogin({
                id: email,
                password: "googleLogin!2#1",
                setUserInfo,
              });
            } catch (e) {
              if (e) {
                setErrorMessage("이 이메일로 가입된 계정이 없습니다.");
              }
            }
          }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
      />
    </>
  );
}
