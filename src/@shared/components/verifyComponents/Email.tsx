import { ChangeEvent, useState } from "react";
import { Alert, FailAlert } from "../StaticComponents/StaticComponents";
import {
  FetchResetPassword,
  FetchVerifyEmail,
  FetchVerifyUser,
} from "../FetchList/FetchList";
import { verifyStore } from "@store/ResetPasswordStore";
import {
  DisableButton,
  InputText,
  NormalButton,
} from "@shared/styles/Public.styles";

export function VerifyEmailComponents({
  email,
  userId,
  purpose = "verifyemail",
}: {
  email: string;
  userId: string;
  purpose?: string;
}) {
  const { setVerifyPasswordEmail, verifyPasswordEmail } = verifyStore(
    (state) => ({
      setVerifyPasswordEmail: state.setVerifyPasswordEmail,
      verifyPasswordEmail: state.verifyPasswordEmail,
    })
  );
  const [numberState, setNumberState] = useState(0);
  const [successState, setSuccessState] = useState(false);
  const [failState, setFailState] = useState(false);
  const [activeVerify, setActiveVerify] = useState(false);
  const numberChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) > 6) {
      e.target.value = e.target.value.substr(0, 6);
    }
    setNumberState(Number(e.target.value));
  };
  const verifyEmailHandle = () => {
    FetchVerifyEmail(email);
    setActiveVerify(true);
  };
  const verifyEmailHandleAgain = () => {
    FetchVerifyEmail(email);
  };

  const numberHandled = () => {
    if (purpose === "verifyemail") {
      FetchVerifyUser({
        method: "email",
        tokenKey: email,
        verifyToken: numberState,
      })
        .then((response) => {
          if (!response.ok) {
            // create error object and reject if not a 2xx response code
            const err = new Error("HTTP status code: " + response.status);
            // err.response = response;
            // err.status = response.status;
            setFailState(true);
            setTimeout(() => {
              setFailState(false);
            }, 5000);
          } else {
            setSuccessState(true);
            setTimeout(() => {
              setSuccessState(false);
            }, 5000);
          }
        })
        .catch((err) => {
          setFailState(true);
          setTimeout(() => {
            setFailState(false);
          }, 5000);
          console.log("Err", err);
        });
    } else if (purpose === "resetpassword") {
      FetchResetPassword(userId, email, numberState)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            // create error object and reject if not a 2xx response code
            const err = new Error("HTTP status code: " + response.status);
            // err.response = response;
            // err.status = response.status;
            setFailState(true);
            setTimeout(() => {
              setFailState(false);
            }, 5000);
          } else {
            setSuccessState(true);
            setTimeout(() => {
              setSuccessState(false);
            }, 5000);
            setVerifyPasswordEmail();
            console.log(verifyPasswordEmail);
          }
        })
        .catch((err) => {
          setFailState(true);
          setTimeout(() => {
            setFailState(false);
          }, 5000);

          console.log("Err", err);
        });
    }
  };
  return (
    <>
      {activeVerify ? (
        <div>
          <form>
            <InputText
              maxLength={6}
              type="tel"
              onChange={numberChange}
              value={numberState}
              placeholder="인증번호 6자리를 입력하세요"
              required
            />
          </form>

          <div className="mt-4">
            {numberState.toString().length < 6 ? (
              <DisableButton disabled>인증하기</DisableButton>
            ) : (
              <NormalButton onClick={numberHandled}>인증하기</NormalButton>
            )}

            <NormalButton onClick={verifyEmailHandleAgain}>
              다시 발송하기
            </NormalButton>
          </div>
        </div>
      ) : (
        <NormalButton onClick={verifyEmailHandle}>
          인증번호 발송하기
        </NormalButton>
      )}
      <div className="clear-both">
        {successState && <Alert />}
        {failState && <FailAlert />}
      </div>
    </>
  );
}
