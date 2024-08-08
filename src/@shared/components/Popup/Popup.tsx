import * as psd from "@/@shared/styles/PostUploadDialog.styles";
import * as s from "@/@shared/styles/Public.styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FetchChangeEmail,
  FetchChangePhone,
  FetchEditPost,
  FetchGetMyUser,
  FetchImage,
  FetchSignUp,
} from "../FetchList/FetchList";
import {
  InputEmail,
  InputInteger,
  InputTelePhone,
  InputText,
  InputTextArea,
  TextInputTag,
} from "../Input/TextInputTag";

import { DialogActions, DialogTitle } from "@mui/material";
import {
  Information,
  StyleComponent,
  checkEmailFormat,
  formatDate,
  notFoundError,
  raiseError,
} from "../StaticComponents/StaticComponents";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { GoogleButton } from "../loginComponents/Google";
// import NaverLogin from "../loginComponents/Naver";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { VerifyEmailComponents } from "../verifyComponents/Email";

import { CustomWindow } from "@app/RoomType";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { guestInfoPopUpStore } from "@store/GuestInfoStore";
import { loginPopUpStore } from "@store/LoginPopUpStore";
import { useUserInfoStore } from "@store/UserInfoStore";
import { Post } from "@type/Type";
import { DoubleDatePicker } from "../Input/DoubleDatePicker";
import { DoubleSlideInput } from "../Input/DoubleSlideInput";
import { ImageUploadComponent } from "../Input/ImageInput";
import { SingleSlideInput } from "../Input/SingleSlideInput";
import { SingleValueViewer, ValueRangeViewer } from "../Input/ValueViewer";
import { GoogleButton } from "../loginComponents/Google";
import { LoginContent } from "../loginComponents/LoginContent";
import { priceToString } from "../StaticComponents/StaticComponents";

export function DialogForm({
  name = "",
  openState,
  handleClose,
  children,
  render,
}: {
  name?: string;
  openState: boolean;
  handleClose: MouseEventHandler<HTMLButtonElement>;
  children: JSX.Element[] | JSX.Element;
  render: () => JSX.Element;
}) {
  return (
    <Dialog
      open={openState}
      onClose={handleClose} // Ensure the dialog closes on Esc key
      className="border border-gray-300 shadow-xl rounded-lg"
      style={{
        fontFamily: "Pretendard",
      }}
    >
      <DialogTitle>
        {render()}
        <s.SvgHoverButton name={name} type="button" onClick={handleClose}>
          <StyleComponent content="CloseButton" />
        </s.SvgHoverButton>
      </DialogTitle>
      {children}
    </Dialog>
  );
}

export function ImageDialog() {
  const { setImagePopUpState, imagePopUpState } = guestInfoPopUpStore(
    (state) => ({
      setImagePopUpState: state.setImagePopUpState,
      imagePopUpState: state.imagePopUpState,
    })
  );
  const { setUserInfo } = useUserInfoStore();

  const [imgFile, setImgFile] = useState<string | ArrayBuffer>("");
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const [successState, setSuccessState] = useState<boolean | null>(null); // 성공 상태
  const [failState, setFailState] = useState<boolean | null>(null); // 실패 상태
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태

  const formData = new FormData();

  // 이미지 업로드 input의 onChange
  const saveImgFile = () => {
    if (!imgRef.current?.files) return;
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (!reader.result) return;
      setImgFile(reader.result);
    };
    setImageUpload(file);
    FetchGetMyUser(setUserInfo);
  };

  const handleClose = () => {
    setImagePopUpState();
    setImgFile("");
    setSuccessState(null);
    setFailState(null);
  };

  if (imageUpload) formData.append("file", imageUpload);

  const onClick = async () => {
    if (!imageUpload) return;

    setLoading(true); // 로딩 상태 활성화

    try {
      const res = await FetchImage(formData);
      if (res.ok) {
        setSuccessState(true); // 성공 상태 설정
        setTimeout(() => {
          setImagePopUpState();
          window.location.reload(); // 페이지 새로고침
        }, 2000);
      } else {
        setFailState(true); // 실패 상태 설정
      }
    } catch (error) {
      setFailState(true); // 실패 상태 설정
      raiseError("ImageDialog"); // 오류 처리
    } finally {
      setLoading(false); // 로딩 상태 비활성화
    }
  };

  return (
    <DialogForm
      openState={imagePopUpState}
      handleClose={handleClose}
      render={() => (
        <label
          htmlFor=""
          className="block mb-2 text-sm font-medium text-gray-900 float-left"
        ></label>
      )}
    >
      <DialogContent
        sx={{
          width: "100%",
          maxWidth: "512px", // PC에서는 최대 512px
          mx: "auto", // 가운데 정렬
        }}
        className="font-black text-center"
      >
        <div className="mb-4">
          {imgFile !== "" ? (
            <>{<img src={imgFile as string} alt="프로필 이미지" />}</>
          ) : (
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100"
            >
              <StyleComponent content="ImageDrop" />

              <input
                accept="image/jpg, image/jpeg, image/png"
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={saveImgFile}
                ref={imgRef}
              />
            </label>
          )}
        </div>

        {loading && (
          <div className="text-center text-blue-500">업로드 중...</div>
        )}
        {successState && (
          <div className="text-center text-green-500">
            프로필 이미지가 성공적으로 변경되었습니다!
          </div>
        )}
        {failState && (
          <div className="text-center text-red-500">
            이미지 업로드에 실패했습니다. 다시 시도해 주세요.
          </div>
        )}

        <p className="text-sm font-light">
          해상도가 256 x 256픽셀 이상인 사진을 사용하세요. <br />
          이미지 사이즈가 큰 사진일수록 더 선명합니다.
        </p>

        <div className="mt-4">
          {imgFile !== "" ? (
            <button
              className="w-full mt-4 border p-2.5 bg-gray-800 border-black rounded-lg hover:bg-black"
              onClick={onClick}
              disabled={loading} // 로딩 중에는 버튼 비활성화
            >
              <p className="text-base text-white font-light">프로필 수정하기</p>
            </button>
          ) : (
            <button
              className="w-full mt-4 border p-2.5 bg-gray-500 border-gray-500 rounded-lg cursor-not-allowed"
              disabled
            >
              <p className="text-base text-white font-light">바로 업로드하기</p>
            </button>
          )}
        </div>
      </DialogContent>
    </DialogForm>
  );
}

export function VerifyEmailDialog({
  email,
  userId,
}: {
  email: string;
  userId: string;
}) {
  const { setVerifyEmailPopUpState, verifyEmailPopUpState } =
    guestInfoPopUpStore((state) => ({
      setVerifyEmailPopUpState: state.setVerifyEmailPopUpState,
      verifyEmailPopUpState: state.verifyEmailPopUpState,
    }));

  const handleClose = () => setVerifyEmailPopUpState();

  return (
    <DialogForm
      openState={verifyEmailPopUpState}
      handleClose={handleClose}
      render={() => (
        <label
          htmlFor="VerifyEmail"
          className="block mb-2 text-sm font-medium text-gray-900 float-left"
        ></label>
      )}
    >
      <DialogContent sx={{}} className="text-center">
        <VerifyEmailComponents userId={userId} email={email} />
      </DialogContent>
    </DialogForm>
  );
}

// .then(res=>notFoundError(res, true, setSuccessState))
// .catch(raiseError('ImageDialog', true,setFailState));
export function EmailDialog({
  originalEmail,
  schoolState,
}: {
  originalEmail: string;
  schoolState: string;
}) {
  const { setEmailPopUpState, emailPopUpState } = guestInfoPopUpStore(
    (state) => ({
      setEmailPopUpState: state.setEmailPopUpState,
      emailPopUpState: state.emailPopUpState,
    })
  );
  const [successState, setSuccessState] = useState(false);
  const [failState, setFailState] = useState(false);
  const [emailState, setEmailState] = useState(originalEmail);
  const [emailFormatState, setEmailFormatState] = useState(true);

  const handleClose = () => setEmailPopUpState(/*false*/);

  const onClick = async () => {
    FetchChangeEmail(emailState)
      .then((res) => notFoundError(res, true, setSuccessState))
      .catch(raiseError("EmailDialog", true, setFailState));
  };

  const inputHandle: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.name === "emailState") {
      setEmailFormatState(checkEmailFormat(e.currentTarget.value, schoolState));
    }
    setEmailState(e.currentTarget.value);
  };

  return (
    <>
      <DialogForm
        openState={emailPopUpState}
        handleClose={handleClose}
        render={() => (
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 float-left"
          ></label>
        )}
      >
        <DialogContent className="text-center" sx={{ height: 120, width: 312 }}>
          <InputEmail
            emailFormatState={emailFormatState}
            onChange={inputHandle}
            value={emailState}
          />
          <div className="mt-4">
            <button
              className="w-full border p-2 bg-gray-800 border-black rounded-lg hover:bg-black"
              onClick={onClick}
            >
              <p className="text-sm text-white font-light">수정하기</p>
            </button>
          </div>
        </DialogContent>
      </DialogForm>
    </>
  );
}

export function PhoneDialog({ originalPhone }: { originalPhone: string }) {
  const { setPhonePopUpState, phonePopUpState } = guestInfoPopUpStore(
    (state) => ({
      setPhonePopUpState: state.setPhonePopUpState,
      phonePopUpState: state.phonePopUpState,
    })
  );
  const [successState, setSuccessState] = useState(false);
  const [failState, setFailState] = useState(false);
  const [phoneState, setPhoneState] = useState(originalPhone);

  const handleClose = () => setPhonePopUpState();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhoneState(e.currentTarget.value);
  };

  const onClick = () => {
    FetchChangePhone(phoneState.replace(/-/gi, "").replace("010", "+8210"))
      .then((res) => notFoundError(res, true, setSuccessState))
      .then((res) => {
        if (res.ok) {
          window.location.reload();
        }
      })
      .catch(raiseError("PhoneDialog", true, setFailState));
  };
  return (
    <>
      <DialogForm
        openState={phonePopUpState}
        handleClose={handleClose}
        render={() => (
          <label
            htmlFor="tel"
            className="block mb-2 text-sm font-medium text-gray-900 float-left"
          >
            전화번호 수정하기
          </label>
        )}
      >
        <DialogContent sx={{ height: 120, width: 312 }} className="text-center">
          <form>
            <InputTelePhone onChange={onChange} value={phoneState} />
          </form>
          <div className="mt-4">
            <button
              className="w-full border p-2 bg-gray-800 border-black rounded-lg hover:bg-black"
              onClick={onClick}
            >
              <p className="text-sm text-white font-light">수정하기</p>
            </button>
          </div>
        </DialogContent>
      </DialogForm>
    </>
  );
}

export function ShareDialog({
  description,
  title,
  image_id,
}: {
  description: string;
  title: string;
  image_id: string[];
}) {
  const copyLinkRef = useRef<HTMLInputElement>(null);
  const [successState, setSuccessState] = useState(false);

  // 로컬 주소 (localhost 3000 같은거)
  const resultUrl = window.location.href;
  const { Kakao } = window as CustomWindow;
  const imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/${image_id[0]}.jpg`;
  // 재랜더링시에 실행되게 해준다.
  useEffect(() => {
    // init 해주기 전에 clean up 을 해준다.
    Kakao.cleanup();
    // 자신의 js 키를 넣어준다.
    Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS);
  }, []);

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: description,
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: resultUrl,
        },
      },
      buttons: [
        {
          title: title,
          link: {
            mobileWebUrl: resultUrl,
          },
        },
      ],
    });
  };

  const copyTextUrl = () => {
    if (!copyLinkRef.current) return;
    copyLinkRef.current.focus();
    setSuccessState(true);
    navigator.clipboard.writeText(copyLinkRef.current.value);
    setTimeout(() => {
      setSuccessState(false);
    }, 5000);
  };
  return (
    <div className="z-10 inline-block mr-12">
      <div className="">
        <s.SecondHead>숙소를 공유하세요!</s.SecondHead>
        <s.NormalText> 복사하여 편하게 보내세요</s.NormalText>
      </div>
      <div className="mt-4">
        {/* input 용도가 아니라서 컴포넌트화 하지 않았습니다. */}
        <s.InputText
          type="text"
          className="inline-block ring-1 ring-inset ring-gray-300 border border-slate-300 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          ref={copyLinkRef}
          value={resultUrl}
        />
        <button
          className="border p-2 mt-4 bg-gray-800 border-black rounded-lg hover:bg-black"
          onClick={copyTextUrl}
        >
          <p className="text-sm text-white font-light">복사하기</p>
        </button>
      </div>
    </div>
  );

  // 선택 후 복사
}

// export function RequestSummaryDetailDialog({
//   request,
//   address,
//   price,
//   startDate,
//   endDate,
// }: {
//   request: RequestForm;
//   address: string;
//   price: string;
//   startDate: string;
//   endDate: string;
// }) {
//   const info_list = {
//     요금: price,
//     체크인: startDate,
//     체크아웃: endDate,
//     요청사항: request.request_text,
//   };
//   return (
//     <>
//       <s.SecondHead>{address} </s.SecondHead>

//       <s.Horizon />
//       {request.contract ? (
//         <p>계약된 매물만 확인</p>
//       ) : (
//         <p>계약 안된 매물도 확인</p>
//       )}
//       {Object.keys(info_list).map((k, index) => (
//         <Information
//           key={index}
//           title={k}
//           info={info_list[k as keyof typeof info_list]}
//         />
//       ))}
//     </>
//   );
// }

export function PostSummaryDetailDialog({
  room,
  postDate,
  price,
  address,
}: {
  room: Post;
  postDate: string;
  price: string;
  address: string;
}) {
  const info_list = {
    "숙소 유형": room.accomodation_type,
    게시일: postDate,
    요금: price,
    주소: address,
  };
  return (
    <>
      {Object.keys(info_list).map((k, index) => (
        <Information
          key={index}
          title={k}
          info={info_list[k as keyof typeof info_list]}
        />
      ))}
    </>
  );
}

export function SignUpDialog() {
  const { signUpPopUpState, setSignUpPopUpState } = guestInfoPopUpStore(
    (state) => ({
      setSignUpPopUpState: state.setSignUpPopUpState,
      signUpPopUpState: state.signUpPopUpState,
    })
  );
  const [emailFormatState, setEmailFormatState] = useState(true);

  const [inputs, setInputs] = useState({
    idState: "",
    passwordState: "googleLogin!2#1",
    userNameState: "",
    emailState: "",
    phoneState: "",
    schoolState: "temp",
    genderState: "temp",
    studentIdState: "24",
    jobState: "temp",
    smoking: false,
  });
  const [birthState, setBirthState] = useState(dayjs(new Date()));
  const [emailState, setEmailState] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false); // 회원가입 성공 상태
  const [signUpError, setSignUpError] = useState<string | null>(null); // 회원가입 오류 메시지

  const {
    idState,
    passwordState,
    userNameState,
    phoneState,
    schoolState,
    genderState,
    studentIdState,
    jobState,
  } = inputs;

  const inputHandle: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.name === "emailState") {
      setEmailFormatState(checkEmailFormat(e.currentTarget.value, schoolState));
    }
    setInputs({
      ...inputs,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const idList = {
    google: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
  };

  const signUpHandled = async () => {
    const birth = birthState.toDate();
    await FetchSignUp(
      {
        userId: emailState,
        password: passwordState,
        username: userNameState,
        email: emailState,
        phone: phoneState.replace(/-/gi, "").replace("010", "+8210"),
        school: schoolState,
        gender: genderState,
        birth: birth.toISOString(),
        studentId: Number(studentIdState),
        jobState: "",
      },
      setSignUpSuccess,
      setSignUpPopUpState,
      setSignUpError
    );
  };

  return (
    <Dialog
      open={signUpPopUpState}
      onClose={setSignUpPopUpState} // Ensure the dialog closes on Esc key
      className="border border-gray-300 shadow-xl rounded-lg"
      style={{
        fontFamily: "Pretendard",
      }}
    >
      <DialogTitle>
        <s.SvgHoverButton type="button" onClick={setSignUpPopUpState}>
          <StyleComponent content="CloseButton" />
        </s.SvgHoverButton>
        <div className="float-left">
          <s.SecondHead>회원가입</s.SecondHead>
        </div>
      </DialogTitle>
      <DialogContent
        sx={{
          width: "100%",
          maxWidth: {
            xs: "100%",
            sm: "100%",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
          },
        }}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <div className="mt-2 flex items-center justify-between">
              <s.Label htmlFor="username">닉네임</s.Label>
            </div>
            <div className="mt-2">
              <InputText
                name="userNameState"
                placeholder=""
                onChange={inputHandle}
                value={userNameState}
              />
            </div>
          </div>
          <div>
            <div className="mt-4 flex items-center justify-between">
              <s.Label htmlFor="password">생년월일</s.Label>
            </div>
            <div className="mt-2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="birthState"
                  onChange={(newDate) => {
                    if (!newDate) return;
                    setBirthState(newDate);
                  }}
                  value={dayjs(birthState)}
                />
              </LocalizationProvider>
            </div>
          </div>

          <div>
            <div className="mt-4 flex items-center justify-between">
              <s.Label htmlFor="phone">전화번호</s.Label>
            </div>
            <div className="mt-2">
              <InputTelePhone onChange={inputHandle} value={phoneState} />
            </div>
          </div>
          <div>
            <div className="mt-4 flex items-center justify-between">
              <s.Label htmlFor="phone">이메일</s.Label>
            </div>

            <div className="mt-2 w-full">
              {emailState == "" ? (
                <GoogleOAuthProvider clientId={idList.google}>
                  <GoogleButton
                    data-text="signup_with"
                    purpose="signup"
                    setEmailState={setEmailState}
                  />
                </GoogleOAuthProvider>
              ) : (
                <s.PolicyText>{emailState}</s.PolicyText>
              )}
            </div>
          </div>
        </div>

        {/* 회원가입 성공 메시지 */}
        {signUpSuccess && (
          <div className="mt-4 text-center text-green-600">
            회원가입이 완료되었습니다!
          </div>
        )}

        {/* 회원가입 오류 메시지 */}
        {signUpError && (
          <div className="mt-4 text-center text-red-600">{signUpError}</div>
        )}
      </DialogContent>
      <DialogActions>
        <button
          className={`w-full mt-4 border p-2.5 rounded-lg ${
            emailState === "" || phoneState === "" || userNameState === ""
              ? "bg-gray-400 cursor-not-allowed" // 비활성화 상태
              : "bg-gray-800 hover:bg-black"
          }`}
          type="submit"
          onClick={signUpHandled}
          disabled={
            emailState === "" || phoneState === "" || userNameState === "" // 하나라도 비어 있으면 비활성화
          }
        >
          <p className="text-base text-white font-light">회원가입</p>
        </button>
      </DialogActions>
    </Dialog>
  );
}

export function LoginDialog() {
  const { loginPopUpState, setLoginPopUpState } = loginPopUpStore();
  const [loginError, setLoginError] = useState<string | null>(null); // 로그인 오류 상태

  return (
    <div>
      <Dialog
        open={loginPopUpState}
        onClose={setLoginPopUpState} // Ensure the dialog closes on Esc key
        className="border border-gray-300 shadow-xl rounded-lg"
        style={{
          fontFamily: "Pretendard",
        }}
      >
        <DialogTitle>
          <s.SvgHoverButton type="button" onClick={setLoginPopUpState}>
            <StyleComponent content="CloseButton" />
          </s.SvgHoverButton>
        </DialogTitle>
        <LoginContent setPopUpState={setLoginPopUpState} />
        {/* 로그인 오류 메시지 */}
        {loginError && (
          <div className="mt-4 text-center text-red-600">{loginError}</div>
        )}
      </Dialog>
      <SignUpDialog />
    </div>
  );
}

export const PostEditDialog = ({
  setEditRoomDialogShow,
  post,
}: {
  setEditRoomDialogShow: () => void;
  post: Post;
}) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [editSuccess, setEditSuccess] = useState<boolean | null>(null); // 수정 성공 상태
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // 오류 메시지 상태
  // 이미지 제거 함수
  const removeImage = (index: number) => {
    // 이미지 파일 목록에서 해당 인덱스의 이미지를 제거
    const updatedFiles = [...imageFiles];
    updatedFiles.splice(index, 1);
    setImageFiles(updatedFiles);

    // 프리뷰 목록에서도 해당 인덱스의 이미지를 제거
    const updatedPreviews = [...previews];
    updatedPreviews.splice(index, 1);
    setPreviews(updatedPreviews);
  };
  useEffect(() => {
    const fetchImageFiles = async () => {
      const images = await Promise.all(
        post.image_id.map(async (id) => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/${id}.jpg`
          );
          const blob = await response.blob();
          const file = new File([blob], `image_${id}.jpg`, { type: blob.type });
          return file;
        })
      );
      setImageFiles(images);
      setPreviews(images.map((file) => URL.createObjectURL(file)));
    };

    fetchImageFiles();
  }, [post.image_id]);

  const [inputs, setInputs] = useState({
    limitPeople: post.limit_people,
    buildingType: post.building_type,
    numberBathroom: post.number_bathroom,
    numberRoom: post.number_room,
    numberBedroom: post.number_bedroom,
    title: post.title,
    basicInfo: post.basic_info,
    startEndDay: [new Date(post.start_day), new Date(post.end_day)],
    duration: [post.min_duration, post.max_duration],
    tempDuration: ["1일", "170일"],
    price: String(post.price),
    rule: post.rule,
    benefit: post.benefit,
    refundPolicy: post.refund_policy,
    contract: post.contract,
  });

  const {
    limitPeople,
    numberBathroom,
    numberRoom,
    numberBedroom,
    duration,
    tempDuration,
    title,
    basicInfo,
    startEndDay,
    price,
    benefit,
  } = inputs;

  const onChange = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const [requiredForm, setRequiredForm] = useState(false);

  const onClick = async () => {
    const formData = makeFormData();
    let count = 0;
    formData.forEach((value, key) => {
      if (
        [
          "accomodation_type",
          "building_type",
          "title",
          "basic_info",
          "street",
        ].includes(key) &&
        value == ""
      ) {
        setRequiredForm(true);
      } else if (
        [
          "accomodation_type",
          "building_type",
          "title",
          "basic_info",
          "street",
        ].includes(key)
      ) {
        count += 1;
        if (count == 8) {
          setRequiredForm(false);
        }
      }
    });

    if (requiredForm) {
      return; // 필수 입력 항목이 누락된 경우 함수를 종료합니다.
    }

    try {
      const response = await FetchEditPost(
        setEditRoomDialogShow,
        post.key,
        formData
      );
      if (response.ok) {
        setEditSuccess(true); // 성공 상태 설정
        setTimeout(() => {
          setEditRoomDialogShow();
          window.location.reload();
        }, 2000);
      } else {
        setEditSuccess(false);
        setErrorMessage("방 수정에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      setEditSuccess(false);
      setErrorMessage("방 수정 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handleStartEndDay = (date: [Date, Date]) => {
    setInputs({ ...inputs, startEndDay: date });
  };

  const handleDuration = (event: Event, newValue: number[]) => {
    setInputs({
      ...inputs,
      duration: newValue,
      tempDuration: [newValue[0] + "일", newValue[1] + "일"],
    });
  };

  const makeFormData = () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("price", price.replace(/,/gi, ""));
    formData.append("basic_info", basicInfo);
    formData.append("benefit", benefit);
    formData.append("end_day", formatDate(startEndDay[1]));
    formData.append("min_duration", duration[0].toString());
    formData.append("max_duration", duration[1].toString());
    formData.append("start_day", formatDate(startEndDay[0]));
    formData.append("limit_people", limitPeople.toString());
    formData.append("number_room", numberRoom.toString());
    formData.append("number_bathroom", numberBathroom.toString());
    formData.append("number_bedroom", numberBedroom.toString());

    imageFiles.forEach((file, index) => {
      formData.append("images", file);
    });

    return formData;
  };

  const handleSetImages = (newImages: File[], index: number) => {
    let updatedImages: File[] = [...imageFiles];
    newImages.forEach((newImage, idx) => {
      if (index + idx >= updatedImages.length) {
        updatedImages.push(newImage);
      } else {
        updatedImages[index + idx] = newImage;
      }
    });
    setImageFiles(updatedImages);
    setPreviews(updatedImages.map((file) => URL.createObjectURL(file))); // 프리뷰 업데이트
  };

  return (
    <>
      <DialogContent
        sx={{
          width: "100%",
          maxWidth: "100%",
          padding: 0,
          margin: 0,
        }}
        className="w-full flex-wrap pt-4"
      >
        <p style={psd.gridStyle.inputContainer}>
          <h3 style={psd.gridStyle.infoType}>호스팅 정보 작성</h3>
          <div>
            <div>
              <SingleValueViewer value={"최대인원: " + limitPeople + "명"} />
              <SingleSlideInput
                name="limitPeople"
                value={limitPeople}
                onChange={onChange}
                minMax={[1, 10]}
              />
            </div>
          </div>
          <div>
            <div>
              <SingleValueViewer value={"욕실 개수: " + numberBathroom} />
              <SingleSlideInput
                name="numberBathroom"
                value={numberBathroom}
                onChange={onChange}
                minMax={[1, 10]}
              />
            </div>
            <div>
              <SingleValueViewer value={"침실 개수: " + numberBedroom} />
              <SingleSlideInput
                name="numberBedroom"
                value={numberBedroom}
                onChange={onChange}
                minMax={[1, 10]}
              />
            </div>
          </div>
        </p>
        <p style={psd.gridStyle.inputContainer}>
          <h3 style={psd.gridStyle.infoType}>호스팅 방 설명</h3>

          <TextInputTag
            id="title"
            label="제목"
            placeholder="제목을 입력해주세요."
            name="title"
            onChange={onChange}
            required={true}
            value={title}
          />
          <p className="mt-4 block mb-2 text-lg font-light text-gray-900 float-left">
            정보
          </p>
          <InputTextArea
            id="basic_info"
            label=""
            placeholder="기본정보을 입력해주세요."
            name="basicInfo"
            onChange={onChange}
            required={true}
            value={basicInfo}
          />
        </p>
        <p style={psd.gridStyle.inputContainer}>
          <h3 style={psd.gridStyle.infoType}>호스팅 날짜</h3>
          <div className="mb-8">
            <DoubleDatePicker
              dateData={startEndDay}
              setDateData={handleStartEndDay}
            />
          </div>
          <div className="clear-both mb-4">
            <InputInteger
              id="price"
              label="가격(일)"
              placeholder="가격을 입력해주세요."
              name="price"
              value={priceToString(price.replace(/,/gi, ""))}
              handleState={onChange}
              required={true}
            />
            ₩{priceToString(Number(price.replace(/,/gi, "")) * 30)}/ 월
          </div>
          <p className="mt-4 block mb-2 text-lg font-light text-gray-900 float-left">
            최소-최대 입주일 :
            <ValueRangeViewer
              arr={inputs["tempDuration"] as [string, string]}
            />
          </p>
          <DoubleSlideInput
            name="duration"
            value={inputs["duration"] as [number, number]}
            onChange={handleDuration}
            minMax={[1, 730]}
            step={1}
          />
        </p>
        <p style={psd.gridStyle.inputContainer}>
          <h3 style={psd.gridStyle.infoType}>
            사진을 올려주세요.
            <p className="text-sm font-light">
              해상도가 1024 x 683픽셀 이상인 사진을 사용하세요. <br />
              이미지 사이즈가 큰 사진일수록 더 선명합니다.
            </p>
          </h3>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Image preview ${index}`}
                  className="w-full h-auto object-cover"
                />
                {/* 이미지 제거 버튼 */}
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 mt-2 mr-2 bg-red-600 text-white rounded-full p-1"
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <ImageUploadComponent imgIndex={1} setImage={handleSetImages} />
        </p>
        <p style={psd.gridStyle.inputContainer}>
          <h3 style={psd.gridStyle.infoType}>정보 확인해주세요!</h3>
        </p>
        <div className="ml-10">
          <s.SecondHead>{title == "" ? "제목 작성 안됨" : title}</s.SecondHead>
          <s.NormalText className="mt-2 w-full">
            {basicInfo.split(/\r\n|\r|\n/).map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </s.NormalText>
          <br />
          <s.NormalText className="mt-2">최대 인원: {limitPeople}</s.NormalText>
          <s.NormalText className="mt-2">
            방: 욕실 {numberBathroom} 침실 {numberBedroom}
          </s.NormalText>

          <s.NormalText className="mt-2">
            최대 거주 기간: {duration[0]} - {duration[1]}일
          </s.NormalText>
          <s.NormalText className="mt-2">일일 가격: {price}</s.NormalText>
        </div>
      </DialogContent>

      {/* 수정 성공 메시지 */}
      {editSuccess && (
        <div className="text-center text-green-600">
          방 수정이 완료되었습니다!
        </div>
      )}

      {/* 오류 메시지 */}
      {errorMessage && (
        <div className="text-center text-red-600">{errorMessage}</div>
      )}

      <div className="m-8">
        {requiredForm && (
          <div className="text-center">
            <p className="text-xl font-bold">정보를 다 입력해주세요</p>
            <hr />
          </div>
        )}
        <button
          className={`w-full mt-4 border p-2.5 rounded-lg ${
            imageFiles.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-800 hover:bg-black"
          }`}
          onClick={onClick}
          disabled={imageFiles.length === 0}
        >
          <p className="text-base text-white font-light">방 수정하기</p>
        </button>
      </div>
    </>
  );
};
