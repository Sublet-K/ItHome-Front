import { GoogleLogin } from "@react-oauth/google";

import { FetchLogin } from "../_PageComponents/FetchList";
import { useUserInfoStore } from "../_Store/UserInfoStore";

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
export function GoogleButton() {
  const { setUserInfo } = useUserInfoStore();

  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse.credential);
          const decodeding = decodeJwtResponse(
            credentialResponse.credential as string
          );
          const email = decodeding.email;
          FetchLogin({ id: email, password: "googleLogin!2#1", setUserInfo });
          // if (GetOneUser(email)) {
          //   FetchLogin({ id: email, password: 'googleLogin!2#1' })
          // } else {
          //   /*
          //   구글 정보 가져올 부분
          //   username=name, email=email, userId=email, verifyemail=true, passworrd: googlelogin
          //   추가 입력되어야함
          //   school, student_id, phone, gender, birth
          //   */
          //   console.log('회원가입으로 넘어가기 구현안됨')
          // }
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
      />
    </>
  );
}
