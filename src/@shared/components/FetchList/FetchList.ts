import { Post, RequestForm, Reservation } from "@type/Type";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect } from "react";
import { SignUpInfo, UserForm } from "../../../app/UserType";
import {
  notFoundError,
  raiseError,
} from "../StaticComponents/StaticComponents";

const headerOptions = (
  method: string,
  contentType: string = "application/json"
): RequestInit => ({
  headers: {
    "Content-Type": contentType,
    Accept: "*/*",
  },
  credentials: "include",
  method: method,
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

async function FetchMoreRoomsDefault(
  listRoomAmount: number,
  listPageAmount: number,
  roomsData: Post[],
  preRoomsData: Post[],
  setRoomsData: Dispatch<SetStateAction<Post[]>>,
  setPreRoomsData: Dispatch<SetStateAction<Post[]>>,
  setListPageAmount: Dispatch<SetStateAction<number>>
) {
  const GetURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/post?maxPost=${listRoomAmount}&page=${listPageAmount}`;
  fetch(GetURL)
    .then(notFoundError)
    .then((res) => setPreRoomsData(res))
    .catch(raiseError("FetchMoreRoomsDefault"));
  // 6개 저 보여주기 필요할 수도..?
  if (preRoomsData.length !== 0) {
    setRoomsData([...roomsData, ...preRoomsData]);
    setPreRoomsData([]);
  }
  setListPageAmount(listPageAmount + 1);
}

// useEffect 삭제해봄, 바깥에서 한 번만 부르도록 감싸든가 하는 작업이 필요해 보임
// 하나만 시범적으로 없애봤고, 나머지는 그대로 둠
// 문제 생겨서 다시 임시적으로 useEffect 넣음 by ussr1285
async function FetchGetPost(
  userId: string,
  setPostInfo: Dispatch<SetStateAction<Post[]>>
) {
  const GetURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/post/${userId}`;
  const getPostInfo = async () => {
    await fetch(GetURL, headerOptions("GET"))
      .then(notFoundError)
      .then((res) => {
        console.log(userId);
        setPostInfo(res);
      })
      .catch(raiseError("FetchGetPost"));
  };
  useEffect(() => {
    getPostInfo();
  }, [userId]);
}

async function FetchSearchPost(
  searchDate: [string, string],
  searchLocation: {
    city: string;
    gu: string;
  },
  priceRange: [number, number],
  searchKeyword: string,
  setPosts: (posts: Post[]) => void
) {
  // priceRange에 30을 나누면 한달 비용으로 바뀜. ex.  &fromPrice=${priceRange[0] / 30}&toPrice=${priceRange[1] / 30}
  let URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}` + `/post/filter?`;
  if (searchLocation.city === "모두") {
    URL =
      URL +
      `fromDate=${searchDate[0]}&toDate=${searchDate[1]}&fromPrice=${priceRange[0]}&toPrice=${priceRange[1]}`;
  } else if (searchLocation.gu === "") {
    URL =
      URL +
      `fromDate=${searchDate[0]}&toDate=${searchDate[1]}&fromPrice=${priceRange[0]}&toPrice=${priceRange[1]}
    &city=${searchLocation.city}`;
  } else {
    URL =
      URL +
      `fromDate=${searchDate[0]}&toDate=${searchDate[1]}&fromPrice=${priceRange[0]}&toPrice=${priceRange[1]}
    &city=${searchLocation.city}&gu=${searchLocation.gu}`;
  }
  if (searchKeyword !== "") {
    URL = URL + `&keyword=${searchKeyword}`;
  }
  await fetch(URL, headerOptions("GET"))
    .then(notFoundError)
    .then((res) => {
      setPosts(res);
    })
    .catch(raiseError("FetchSearchPost"));
}

async function FetchUploadPost(
  formData: FormData,
  setPostPopUpState: () => void
) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/post`;

  try {
    await axios
      .post(URL, formData, {
        headers: {
          Accept: "*/*",
        },
        withCredentials: true, // 쿠키 포함
      })
      .then((res) => {
        if (res.status == 201) {
          window.location.reload();
        }
      });
    // notFoundError 함수를 처리 (필요한 경우)
  } catch (error) {
    raiseError("FetchUploadPost");
  }
}

async function FetchEditPost(
  setEditRoomDialogShow: () => void,
  postKey: number,
  formData: FormData
): Promise<Response> {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${postKey}`;
  try {
    const response = await fetch(URL, {
      headers: {
        Accept: "*/*",
      },
      method: "PUT",
      credentials: "include",
      body: formData,
    });

    return response; // 응답 객체 반환
  } catch (error) {
    console.error("FetchEditPost error:", error);
    throw error; // 오류 발생 시 예외 던지기
  }
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
  postKey: string
) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation/post?key=${postKey}`;

  const getRequestInfo = async () => {
    const json: Reservation[] = await fetch(URL, headerOptions("GET"))
      .then(notFoundError)
      .catch(raiseError("FetchReservationByPostKey"));
    setReservationInfo(json);
  };

  useEffect(() => {
    getRequestInfo();
  }, []);
}

async function FetchPutReservation(key: number, progress: string) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation`;

  return await fetch(URL, {
    ...headerOptions("PUT"),
    body: JSON.stringify({
      key: key,
      progress: progress,
    }),
  });
}

async function FetchDeleteReservation(keyNum: number) {
  fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation`, {
    ...headerOptions("DELETE"),
    body: JSON.stringify({
      key: String(keyNum),
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
  pay: number,
  request_text: string
) {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/reservation`, {
    ...headerOptions("POST"),
    body: JSON.stringify({
      user_id: userID,
      post_key: postKey,
      r_start_day: startDay,
      r_end_day: endDay,
      pay: pay,
      request_text: request_text,
    }),
  });
}

async function FetchDeletePost(key: number) {
  const link = `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${key}`;
  fetch(link, headerOptions("DELETE"))
    .then(notFoundError)
    .then((res) => {
      if (res.ok) {
        window.location.reload();
      }
    })
    .catch(raiseError("FetchDeletePost"));
}

async function FetchLogin({
  id,
  password,
  setUserInfo,
  initFetchLikePostId,
}: {
  id: string;
  password: string;
  setUserInfo: (newUserInfo: any) => void;
  initFetchLikePostId: (newLikes: { [key: number]: number }) => void;
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
      {
        ...headerOptions("POST"),
        body: JSON.stringify({
          id: id,
          password: password,
        }),
      }
    );

    if (response.ok) {
      FetchGetMyUser(setUserInfo);
      FetchLikePostsId(initFetchLikePostId);
    }
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return { ok: false }; // 오류 발생 시 실패 객체 반환
  }
}

async function FetchLogout(
  resetUserInfo: () => void,
  resetLikePostId: () => void
) {
  await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
    headerOptions("POST")
  )
    .then(notFoundError)
    .then((res) => {
      if (res.ok) {
        resetUserInfo();
        resetLikePostId();
      }
    })
    .catch(raiseError("FetchLogout"));
}

async function FetchImage(formData: FormData) {
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/image`, {
    credentials: "include",
    method: "PUT",
    body: formData,
  });
}

async function FetchGetMyUser(setUserInfo: (newUserInfo: any) => void) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/profile`;

  const json: UserForm = await fetch(URL, headerOptions("GET"))
    .then(notFoundError)
    .catch(raiseError("FetchGetMyUser"));
  setUserInfo(json);
}

async function FetchGetOneUser(
  userId: string,
  setUserInfo: Dispatch<SetStateAction<UserForm>>
): Promise<UserForm | null> {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`;

  try {
    const json: UserForm = await fetch(URL, headerOptions("GET"))
      .then(notFoundError)
      .catch(raiseError("FetchGetOneUser"));
    setUserInfo(json);
    return json;
  } catch (error) {
    console.error("User not found or error occurred:", error);
    return null;
  }
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

async function FetchDeleteUser({
  userId,
  resetUserInfo,
  resetLikePostId,
}: {
  resetUserInfo: () => void;
  resetLikePostId: () => void;
  userId: string;
}) {
  const requestOptions = {
    ...headerOptions("DELETE"),
    path: "/",
  };

  await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/${userId}`,
    requestOptions
  )
    .then(notFoundError)
    .then((res) => {
      if (res.ok) {
        resetUserInfo();
        resetLikePostId();
      }
    })
    .catch(raiseError("FetchDeleteUser"));
}

async function FetchSignUp(
  {
    userId,
    password,
    username,
    email,
    phone,
    school,
    gender,
    birth,
    studentId,
  }: SignUpInfo,
  setSignUpSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  setSignUpPopUpState: () => void,
  setSignUpError: (value: React.SetStateAction<string | null>) => void
) {
  const requestOptions = {
    ...headerOptions("POST"),
    body: JSON.stringify({
      user_id: email,
      password: password,
      username: username,
      email: email,
      phone: phone,
      school: school,
      gender: gender,
      birth: birth,
      student_id: studentId,
      smoking: "true",
    }),
    path: "/",
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/`,
      requestOptions
    );

    if (response.ok) {
      setSignUpSuccess(true); // 회원가입 성공
      setSignUpPopUpState(); // 팝업 닫기
    } else {
      // If response is not ok, set error state
      const errorData = await response.json(); // Extract error details from response if available
      setSignUpError(
        errorData.message || "회원가입에 실패했습니다. 다시 시도해주세요."
      ); // 회원가입 실패 메시지
    }
  } catch (error) {
    // Handle network or unexpected errors
    console.error("FetchSignUp error:", error);
    setSignUpError("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요."); // More informative error message
  }
}

async function FetchGetRequestByRequestId(
  idList: string[],
  setRequestInfo: Dispatch<SetStateAction<RequestForm[]>>
) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/request/requestId`;
  console.log("x", idList, setRequestInfo);
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
    item: Post,
    likes: { [key: number]: number },
    setLikes: Dispatch<SetStateAction<{ [key: number]: number }>>
  ) =>
  () => {
    if (!(item.key in likes)) {
      setLikes({ ...likes, [item.key]: item.key });
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
        if (likes[numNewItem] !== item.key) {
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

async function FetchGetLikePosts(setLikePosts: (posts: Post[]) => void) {
  // 좋아요 누른 포스트 "방 정보(Post 타입)" 가져오기.
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/like`;
  await useEffect(() => {
    fetch(URL, headerOptions("GET"))
      .then(notFoundError)
      .then((res) => setLikePosts(res))
      .catch(raiseError("FetchGetLikePosts"));
  }, []);
}

async function FetchLikePostsId(
  initFetchLikePostId: (newLikes: { [key: number]: number }) => void
): Promise<void> {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/like`;
  await fetch(URL, headerOptions("GET"))
    .then(notFoundError)
    .then((res) => {
      let newLikes: { [key: number]: number } = {};
      res.forEach((item: { key: number }) => {
        newLikes[item.key] = item.key;
      });
      initFetchLikePostId(newLikes);
    })
    .catch(raiseError("FetchLikePosts"));
}

async function FetchReportPost(
  reporterId: string,
  postKey: number,
  reason: string
) {
  const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/report`;
  await fetch(URL, {
    ...headerOptions("POST"),
    body: JSON.stringify({
      reporter_id: reporterId,
      post_key: postKey,
      reason: reason,
    }),
  })
    .then(notFoundError)
    .catch(raiseError("FetchReportPost"));
}
async function FetchContact({
  contact,
  user_contact,
  title,
}: {
  contact: string;
  user_contact: string;
  title: string;
}) {
  const link = `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/contactemail`;
  return await fetch(link, {
    ...headerOptions("POST"),
    body: JSON.stringify({
      user_contact: user_contact,
      contact: contact,
      title: title,
    }),
  })
    .then(notFoundError)
    .catch(raiseError("Send Contact"));
}
export {
  FetchChangeEmail,
  FetchChangePassword,
  FetchChangePhone,
  FetchConnectRequestPost,
  FetchContact,
  FetchConverURLtoFile,
  FetchDeletePost,
  FetchDeleteRequest,
  FetchDeleteReservation,
  FetchDeleteUser,
  FetchEditPost,
  FetchGetLikePosts,
  FetchGetMyUser,
  FetchGetOneUser,
  FetchGetPost,
  FetchGetRequest,
  FetchGetRequestByRequestId,
  FetchImage,
  FetchLikePostsId,
  FetchLogin,
  FetchLogout,
  FetchMoreRoomsDefault,
  FetchPutReservation,
  FetchReportPost,
  FetchReservation,
  FetchReservationByPostKey,
  FetchReservationPost,
  FetchResetPassword,
  FetchSearchPost,
  FetchSignUp,
  FetchUploadPost,
  FetchVerifyEmail,
  FetchVerifyUser,
  toggleLikes,
};
