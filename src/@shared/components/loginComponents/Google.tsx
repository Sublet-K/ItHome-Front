import { GoogleLogin } from "@react-oauth/google";
import { guestInfoPopUpStore } from "@store/GuestInfoStore";
import { loginPopUpStore } from "@store/LoginPopUpStore";
import { useUserInfoStore } from "@store/UserInfoStore";
import { useUserLikeStore } from "@store/UserLikeStore";
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
  const { initFetchLikePostId } = useUserLikeStore();
  const { loginPopUpState, setLoginPopUpState } = loginPopUpStore();

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
              const response = await FetchLogin({
                id: email,
                password: "googleLogin!2#1",
                setUserInfo,
                initFetchLikePostId,
              });

              if (response.ok) {
                if (setErrorMessage) setErrorMessage(""); // 로그인 성공 시 오류 메시지 초기화
                setLoginPopUpState(); // 로그인 성공 시 팝업 닫기
              } else {
                if (setErrorMessage) {
                  setErrorMessage("이 이메일로 가입된 계정이 없습니다."); // 로그인 실패 시 오류 메시지 설정
                }
              }
            } catch (e) {
              if (setErrorMessage) {
                setErrorMessage(
                  "로그인 중 오류가 발생했습니다. 다시 시도해주세요."
                );
              }
              console.error("Login error:", e);
            }
          }
        }}
        onError={() => {
          if (setErrorMessage) {
            setErrorMessage("Google 로그인에 실패했습니다. 다시 시도해주세요."); // Google 로그인 자체가 실패했을 때 오류 메시지
          }
          console.log("Login Failed");
        }}
        useOneTap
      />
    </>
  );
}
