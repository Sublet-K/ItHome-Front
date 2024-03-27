import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  notFoundError,
  raiseError,
} from "../StaticComponents/StaticComponents";
import { Reservation } from "../../../app/ReservationType";
import { Room, RequestRoom } from "../../../app/RoomType";
import { User, SignUpInfo, UserForm } from "../../../app/UserType";
import { Post } from "@app/PostType";
import { RequestForm } from "@app/RequestType";

const headerOptions: (method: string, contentType?: string) => RequestInit = (
  method: string,
  contentType = "application/json"
) => ({
  credentials: "include",
  method: method,
  headers: {
    "Content-Type": contentType,
  },
});

const bodyData = (data: any) => ({
  data: JSON.stringify({
    data,
  }),
});

async function FetchChangeEmail(emailState: string) {
  const UpdateURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update`;
  const ChangeVerifyURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/verifyupdate`;
  return await fetch(UpdateURL, {
    ...headerOptions("PUT"),
    body: JSON.stringify({
      email: emailState,
    }),
  }).then(async () =>
    fetch(ChangeVerifyURL, {
      ...headerOptions("PUT"),
      body: JSON.stringify({
        verify_email: "false",
      }),
    })
  );
}

async function FetchChangePhone(phoneState: string) {
  const UpdateURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update`;
  const ChangeVerifyURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/verifyupdate`;
  return await fetch(UpdateURL, {
    ...headerOptions("PUT"),
    body: JSON.stringify({
      phone: phoneState,
    }),
  }).then((_) =>
    fetch(ChangeVerifyURL, {
      ...headerOptions("PUT"),
      body: JSON.stringify({
        verify_phone: "false",
      }),
    })
  );
}

// useEffect 삭제해봄, 바깥에서 한 번만 부르도록 감싸든가 하는 작업이 필요해 보임
// 하나만 시범적으로 없애봤고, 나머지는 그대로 둠
// 문제 생겨서 다시 임시적으로 useEffect 넣음 by ussr1285
async function FetchGetPost(
  userId: string,
  setPostInfo: Dispatch<SetStateAction<Post[]>>
) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/post/${userId}`;
  const getPostInfo = async () => {
    const json: Post[] = await fetch(URL, headerOptions("GET"))
      .then(notFoundError)
      .catch(raiseError("FetchGetPost"));
    setPostInfo(json);
  };
  useEffect(() => {
    getPostInfo();
  }, [userId]);
}

async function FetchUploadPost(formData: FormData, setPostPopUpState: () => void) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/post`;
  await fetch(URL, {
    ...headerOptions("POST"),
    ...formData,
  })
    .then(notFoundError)
    .then((res) => {
      if (res.ok) {
        alert("게시물이 성공적으로 등록되었습니다.");
        setPostPopUpState();
      }
    })
    .catch(raiseError("FetchUploadPost"));
}

async function FetchEditPost(postKey: number, formData: FormData) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${postKey}`;
  await fetch(URL, {
    ...headerOptions("PUT"),
    ...formData,
  })
    .then(notFoundError)
    .catch(raiseError("FetchEditPost"));
}

async function FetchReservation(
  setReservationInfo: Dispatch<SetStateAction<Reservation[]>>
) {
  const getReservationInfo = async () => {
    const json: Reservation[] = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation`,
      headerOptions("GET")
    )
      .then(notFoundError)
      .catch(raiseError("FetchReservation"));

    setReservationInfo(json);
  };

  useEffect(() => {
    getReservationInfo();
  }, []);
}

async function FetchReservationByPostKey(
  setReservationInfo: Dispatch<SetStateAction<Reservation[]>>,
  reservationInfo: Reservation[],
  postKey: string
) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation/post?key=${postKey}`;

  const json: Reservation[] = await fetch(URL, headerOptions("GET"))
    .then(notFoundError)
    .catch(raiseError("FetchReservationByPostKey"));
  setReservationInfo(json);

  const reservation = Array.from(reservationInfo);
  return reservation;
}

async function FetchDeleteReservation(keyNum: number) {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation`, {
    ...headerOptions("DELETE"),
    body: JSON.stringify({
      key: keyNum,
    }),
  })
    .then(notFoundError)
    .catch(raiseError("FetchDeleteReservation"));
}

async function FetchReservationPost(
  userID: string,
  postKey: string,
  startDay: string,
  endDay: string,
  pay: number
) {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation`, {
    ...headerOptions("POST"),
    body: JSON.stringify({
      user_id: userID,
      post_key: postKey,
      r_start_day: startDay,
      r_end_day: endDay,
      pay: pay,
    }),
  })
    .then(notFoundError)
    .catch(raiseError("FetchReservationPost"));
}

async function FetchDeletePost(key: number) {
  const link = `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${key}`;
  fetch(link, headerOptions("DELETE"))
    .then(notFoundError)
    .catch(raiseError("FetchDeletePost"));
}

async function FetchLogin({
  id,
  password,
  setUserInfo,
}: {
  id: string;
  password: string;
  setUserInfo: (newUserInfo: any) => void;
}) {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
    ...headerOptions("POST"),
    body: JSON.stringify({
      id: id,
      password: password,
    }),
  })
    .then(notFoundError)
    .then((res) => {
      if (res.ok) {
        FetchGetMyUser(setUserInfo);
      }
    })
    .catch(raiseError("FetchLogin"));
}

async function FetchLogout(resetUserInfo: () => void) {
  await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
    headerOptions("POST")
  )
    .then(notFoundError)
    .then((res) => {
      if (res.ok) {
        resetUserInfo();
      }
    })
    .catch(raiseError("FetchLogout"));
}

async function FetchImage(formData: FormData) {
  console.log("x", formData);
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/image`, {
    ...headerOptions("PUT", "image/jpeg"),
    body: formData,
  });
}

async function FetchGetMyUser(setUserInfo: Dispatch<SetStateAction<UserForm>>) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`;

  const json: UserForm = await fetch(URL, headerOptions("GET"))
    .then(notFoundError)
    .catch(raiseError("FetchGetMyUser"));
  setUserInfo(json);
}

async function FetchGetOneUser(
  userId: string,
  setUserInfo: Dispatch<SetStateAction<UserForm>>
) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`;

  const getUserInfo = async () => {
    const json: UserForm = await fetch(URL, headerOptions("GET"))
      .then(notFoundError)
      .catch(raiseError("FetchGetOneUser"));
    setUserInfo(json);
  };
  getUserInfo();
  return true;
}

async function FetchGetRequest(
  setRequestInfo: Dispatch<SetStateAction<RequestForm[]>>
) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/request`;

  const getRequestInfo = async () => {
    const json: RequestForm[] = await fetch(URL, headerOptions("GET"))
      .then(notFoundError)
      .catch(raiseError("FetchGetRequest"));
    setRequestInfo(json);
  };

  useEffect(() => {
    getRequestInfo();
  }, []);
}

function FetchSignUp({
  userId,
  password,
  username,
  email,
  phone,
  school,
  gender,
  birth,
  studentId,
}: SignUpInfo) {
  const requestOptions = {
    ...headerOptions("POST"),
    body: JSON.stringify({
      user_id: userId,
      password: password,
      username: username,
      email: email,
      phone: phone,
      school: school,
      gender: gender,
      birth: birth,
      student_id: studentId,
    }),

    path: "/",
  };

  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/`, requestOptions)
    .then(notFoundError)
    .catch(raiseError("FetchSignUp"));
}

async function FetchGetRequestByRequestId(
  idList: string[],
  setRequestInfo: Dispatch<SetStateAction<RequestForm[]>>
) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/request/requestId`;

  const getRequestInfo = async () => {
    const json = await fetch(URL, {
      ...headerOptions("POST"),
      body: JSON.stringify({
        id: idList,
      }),
    })
      .then(notFoundError)
      .catch(raiseError("FetchGetRequestByRequestId"));

    setRequestInfo(json);
  };
  useEffect(() => {
    getRequestInfo();
  }, []);
}
async function FetchVerifyEmail(email: string) {
  const link = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/email`;
  return await fetch(link, {
    ...headerOptions("POST"),
    body: JSON.stringify({
      email: email,
    }),
  })
    .then(notFoundError)
    .catch(raiseError("VerifyEmail"));
}

async function FetchVerifyUser({
  method,
  tokenKey,
  verifyToken,
}: {
  method: string;
  tokenKey: string;
  verifyToken: number;
}) {
  // 학교 인증은 우리가 확인(김과외처럼)
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/verifyUser`;
  const json = {
    verify_email: method === "email" ? "true" : "false",
    verify_phone: method === "phone" ? "true" : "false",
    tokenKey: tokenKey,
    verifyToken: Number(verifyToken),
  };
  console.log(tokenKey, verifyToken);
  return await fetch(URL, {
    ...headerOptions("POST"),
    body: JSON.stringify(json),
  });
}

async function FetchResetPassword(
  userId: string,
  tokenKey: string,
  verifyToken: number
) {
  // 학교 인증은 우리가 확인(김과외처럼)
  const link = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/resetpassword`;
  console.log(tokenKey, verifyToken);

  const requestOptions = {
    // sendEmail 라우터로 보내버리기
    ...headerOptions("POST"),
    body: JSON.stringify({
      user_id: userId,
      tokenKey: tokenKey,
      verifyToken: verifyToken,
    }),
  };

  return await fetch(link, requestOptions);
}

async function FetchChangePassword(userId: string, newPassword: string) {
  // 학교 인증은 우리가 확인(김과외처럼)
  const link = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/changepassword`;
  console;

  return await fetch(link, {
    ...headerOptions("PUT"),
    body: JSON.stringify({
      id: userId,
      password: newPassword,
    }),
  });
}

async function FetchDeleteRequest(keyNum: string) {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/request`, {
    ...headerOptions("DELETE"),
    body: JSON.stringify({
      key: keyNum,
    }),
  });
}

function FetchConnectRequestPost(requestKey: number, postKey: number) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/request/post/${postKey}`;

  fetch(URL, {
    ...headerOptions("POST"),
    body: JSON.stringify({
      key: requestKey,
    }),
  })
    .then(notFoundError)
    .catch(raiseError("ConnectRequestPost"));
}

async function FetchConverURLtoFile(id: string) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/${id}.jpg`;
  const response = await fetch(URL, headerOptions("GET"));
  const data = await response.blob();
  const ext = URL.split(".").pop(); // url 구조에 맞게 수정할 것
  if (!ext) throw Error();
  const metadata = { type: `image/${ext}` };
  return new File([data], id + ".jpg", metadata);
}

const toggleLikes =
  (
    item: Room,
    likes: { [key: number]: Room },
    setLikes: Dispatch<SetStateAction<{ [key: number]: Room }>>
  ) =>
    () => {
      if (!(item.key in likes)) {
        setLikes({ ...likes, [item.key]: item });
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/post/like", {
          ...headerOptions("POST"),
          body: JSON.stringify({
            post_key: item.key,
          }),
        }); // .then(response => response.json()).then(data => console.log(data));
      } else {
        let newLikes: typeof likes = {};
        Object.keys(likes).map((newItem) => {
          const numNewItem = Number(newItem);
          if (likes[numNewItem].key !== item.key) {
            newLikes[numNewItem] = likes[numNewItem];
          }
        });
        setLikes(newLikes);
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/post/like", {
          ...headerOptions("DELETE"),
          body: JSON.stringify({
            post_key: item.key,
          }),
        }); // .then(response => response.json()).then(data => console.log(data));
      }
    };

export {
  FetchVerifyUser,
  FetchResetPassword,
  FetchChangePassword,
  FetchSignUp,
  FetchVerifyEmail,
  FetchGetMyUser,
  FetchGetOneUser,
  FetchLogin,
  FetchDeleteRequest,
  FetchGetRequest,
  FetchLogout,
  FetchDeleteReservation,
  FetchGetRequestByRequestId,
  FetchReservation,
  FetchGetPost,
  FetchReservationByPostKey,
  FetchDeletePost,
  FetchImage,
  FetchReservationPost,
  FetchConnectRequestPost,
  FetchChangeEmail,
  FetchChangePhone,
  FetchUploadPost,
  FetchEditPost,
  FetchConverURLtoFile,
  toggleLikes,
};
