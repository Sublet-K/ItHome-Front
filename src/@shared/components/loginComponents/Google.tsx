// import { GoogleLogin } from "@react-oauth/google";

import { GoogleLogin } from "@react-oauth/google";
import { useUserInfoStore } from "@store/UserInfoStore";
import {
  FetchGetOneUser,
  FetchLogin,
  FetchSignUp,
} from "../FetchList/FetchList";
import { guestInfoPopUpStore } from "@store/GuestInfoStore";
import { Dispatch, SetStateAction } from "react";

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
}: {
  purpose: string;
  setEmailState?: Dispatch<SetStateAction<string>>;
}) {
  const { setUserInfo } = useUserInfoStore();
  const { setSignUpPopUpState } = guestInfoPopUpStore((state) => ({
    setSignUpPopUpState: state.setSignUpPopUpState,
  }));
  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse.credential);
          const decodeding = decodeJwtResponse(
            credentialResponse.credential as string
          );
          const email = decodeding.email;
          if (purpose == "signup") {
            if (!setEmailState) return;
            setEmailState(email);
          } else if (purpose == "login") {
            console.log(email, "s");
            FetchGetOneUser(email, setUserInfo).then((response) => {
              if (response) {
                FetchLogin({
                  id: email,
                  password: "googleLogin!2#1",
                  setUserInfo,
                });
              } else {
                setSignUpPopUpState();
              }
            });
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
