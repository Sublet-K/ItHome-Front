import {
  ChangeEventHandler,
  HtmlHTMLAttributes,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import * as s from "@/@shared/styles/Public.styles";
import {
  InputEmail,
  InputTelePhone,
  InputText,
  InputPassword,
  InputStudentId,
  TextInputTag,
  InputTextArea,
  InputInteger,
} from "../Input/TextInputTag";
import * as psd from "@/@shared/styles/PostUploadDialog.styles";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import {
  FetchChangeEmail,
  FetchChangePhone,
  FetchEditPost,
  FetchImage,
  FetchLogin,
  FetchSignUp,
  FetchUploadPost,
} from "../FetchList/FetchList";

import {
  Alert,
  Information,
  StyleComponent,
  FailAlert,
  checkEmailFormat,
  notFoundError,
  raiseError,
} from "../StaticComponents/StaticComponents";
import {
  DialogTitle,
  DialogActions,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { GoogleButton } from "../loginComponents/Google";
// import NaverLogin from "../loginComponents/Naver";
import { VerifyEmailComponents } from "../verifyComponents/Email";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import DropBoxSelect from "../Input/DropBoxSelect";
import { DoubleSlideInput } from "../Input/DoubleSlideInput";
import { SingleSlideInput } from "../Input/SingleSlideInput";
import { SingleValueViewer, ValueRangeViewer } from "../Input/ValueViewer";

import { LocationInput } from "../Input/LocationInput";
import { DoubleDatePicker } from "../Input/DoubleDatePicker";
import { priceToString } from "../StaticComponents/StaticComponents";
import { ImageUploadComponent } from "../Input/ImageInput";
import { useUserInfoStore } from "@store/UserInfoStore";
import { guestInfoPopUpStore } from "@store/GuestInfoStore";
import { CustomWindow, RequestRoom, Room } from "@app/RoomType";
import Link from "next/link";
import { Post, RequestForm } from "@/@type/Type";

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
      className="border border-gray-300 shadow-xl rounded-lg"
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
  const [imgFile, setImgFile] = useState<string | ArrayBuffer>("");
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const [successState, setSuccessState] = useState(false);
  const [failState, setFailState] = useState(false);
  const formData = new FormData();

  // 이미지 업로드 input의 onChange
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
  };

  const handleClose = () => {
    setImagePopUpState();
    setImgFile("");
  };
  if (imageUpload) formData.append("file", imageUpload);
  const onClick = () => {
    FetchImage(formData)
      .then((res) => notFoundError(res, true, setSuccessState))
      .catch(raiseError("ImageDialog", true, setFailState));
  };
  return (
    <DialogForm
      openState={imagePopUpState}
      handleClose={handleClose}
      render={() => (
        <label
          htmlFor="test"
          className="block mb-2 text-sm font-medium text-gray-900 float-left"
        >
          test
        </label>
      )}
    >
      <DialogContent
        sx={{ height: 512, width: 512 }}
        className="font-black text-center"
      >
        <div className="clear-both h-56 w-75 flex items-center justify-center">
          {imgFile !== "" ? (
            <>
              {
                "a"
                //<img src={imgFile} alt="프로필 이미지" />
              }
            </>
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
        <div className="mt-8">
          {imgFile !== "" ? (
            <s.NormalButton onClick={onClick}>업로드하기</s.NormalButton>
          ) : (
            <s.DisableButton disabled>업로드하기</s.DisableButton>
          )}

          <div>
            {successState && <Alert />}
            {failState && <FailAlert />}
          </div>
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
        >
          이메일 인증
        </label>
      )}
    >
      <DialogContent sx={{ height: 300, width: 300 }} className="text-center">
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
          >
            Email address
          </label>
        )}
      >
        <DialogContent className="text-center" sx={{ height: 120, width: 312 }}>
          <InputEmail
            emailFormatState={emailFormatState}
            onChange={inputHandle}
            value={emailState}
          />
          <div className="mt-4">
            <s.NormalButton onClick={onClick}>수정하기</s.NormalButton>
            <div>
              {successState && <Alert />}
              {failState && <FailAlert />}
            </div>
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
            Phone number
          </label>
        )}
      >
        <DialogContent sx={{ height: 120, width: 312 }} className="text-center">
          <form>
            <InputTelePhone onChange={onChange} value={phoneState} />
          </form>
          <div className="mt-4">
            <s.NormalButton onClick={onClick}>수정하기</s.NormalButton>
            <div>
              {successState && <Alert />}
              {failState && <FailAlert />}
            </div>
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
    <div className="z-10 inline-block mr-6">
      <div className="">
        <s.SecondHead>숙소를 공유하세요!</s.SecondHead>
        <s.NormalText> 복사하여 편하게 보내세요</s.NormalText>
      </div>
      <div className="mt-2">
        {/* input 용도가 아니라서 컴포넌트화 하지 않았습니다. */}
        <s.InputText
          type="text"
          className="inline-block ring-1 ring-inset ring-gray-300 border border-slate-300 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          ref={copyLinkRef}
          value={resultUrl}
        />
        <s.NormalButton className="ml-2" onClick={copyTextUrl}>
          복사하기
        </s.NormalButton>
      </div>
      <div className="mt-2">
        <s.NormalButton
          className="ml-2"
          onClick={() => {
            shareKakao();
          }}
        >
          카카오 공유하기
        </s.NormalButton>
      </div>
      <div className="mt-4 center">{successState && <Alert />}</div>
    </div>
  );

  // 선택 후 복사
}

export function RequestSummaryDetailDialog({
  request,
  address,
  price,
  startDate,
  endDate,
}: {
  request: RequestForm;
  address: string;
  price: string;
  startDate: string;
  endDate: string;
}) {
  const info_list = {
    "숙소 유형": request.accomodation_type,
    요금: price,
    체크인: startDate,
    체크아웃: endDate,
    요청사항: request.request_text,
  };
  return (
    <>
      <s.SecondHead>{address} </s.SecondHead>

      <s.Horizon />
      {request.contract ? (
        <p>계약된 매물만 확인</p>
      ) : (
        <p>계약 안된 매물도 확인</p>
      )}
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
      <div className="inline-block">
        <s.SecondHead className="float-start mr-4">{room.title} </s.SecondHead>
        {room.contract ? (
          <StyleComponent content="VerifyRoom" />
        ) : (
          <StyleComponent content="UnverifyRoom" />
        )}
      </div>
      {room.private ? (
        <p className="font-sm text-black font-bold">공개</p>
      ) : (
        <p className="font-sm text-gray-600 font-bold">비공개</p>
      )}
      {/* 공개 변경 버튼 추가 */}
      <hr className="h-px bg-gray-200 border-0" />
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
    passwordState: "",
    userNameState: "",
    emailState: "",
    phoneState: "",
    schoolState: "고려대학교",
    genderState: "여",
    studentIdState: "24",
    jobState: "학생",
  });
  const [birthState, setBirthState] = useState(dayjs(new Date()));
  const {
    idState,
    passwordState,
    userNameState,
    emailState,
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

  const signUpHandled = () => {
    const birth = birthState.toDate();
    if (checkEmailFormat(emailState, schoolState)) {
      setEmailFormatState(true);
      FetchSignUp({
        userId: idState,
        password: passwordState,
        username: userNameState,
        email: emailState,
        phone: phoneState.replace(/-/gi, "").replace("010", "+8210"),
        school: schoolState,
        gender: genderState,
        jobState: jobState,
        birth: birth.toISOString(),
        studentId: Number(studentIdState),
      });
      setSignUpPopUpState();
    } else {
      console.log("잘못된 이메일 양식입니다.", emailFormatState);
      setEmailFormatState(false);
    }

    FetchSignUp({
      userId: idState,
      password: passwordState,
      username: userNameState,
      email: emailState,
      phone: phoneState.replace(/-/gi, "").replace("010", "+8210"),
      school: schoolState,
      gender: genderState,
      birth: birth.toISOString(),
      studentId: Number(studentIdState),
      jobState: "",
    });
    setSignUpPopUpState();
  };

  return (
    <Dialog
      open={signUpPopUpState}
      className="border border-gray-300 shadow-xl rounded-lg"
    >
      <DialogTitle>
        <s.SvgHoverButton type="button" onClick={setSignUpPopUpState}>
          <StyleComponent content="CloseButton" />
        </s.SvgHoverButton>
        <div className="float-left">
          <s.SecondHead>회원가입</s.SecondHead>
        </div>
      </DialogTitle>
      <DialogContent>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <s.JustifyBlock>
            <div>
              <s.Label htmlFor="id">아이디</s.Label>
              <div className="mt-2">
                <InputText
                  name="idState"
                  placeholder="아이디"
                  onChange={inputHandle}
                  value={idState}
                />
              </div>
            </div>

            <div className="ml-2">
              <s.Label htmlFor="password">패스워드</s.Label>
              <div className="mt-2">
                <InputPassword onChange={inputHandle} value={passwordState} />
              </div>
            </div>
          </s.JustifyBlock>

          <div>
            <div className="mt-2 flex items-center justify-between">
              <s.Label htmlFor="username">별명</s.Label>
            </div>
            <div className="mt-2">
              <InputText
                name="userNameState"
                placeholder="별명"
                onChange={inputHandle}
                value={userNameState}
              />
            </div>
          </div>
          <div>
            <div className="mt-2 flex items-center justify-between">
              <s.Label htmlFor="password">생년월일</s.Label>
            </div>
            <div className="mt-2">
              <LocalizationProvider dateAdapter={AdapterDayjs} /*required*/>
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
            <div className="mt-2 flex items-center justify-between">
              <s.Label htmlFor="phone">전화번호</s.Label>
            </div>
            <div className="mt-2">
              <InputTelePhone onChange={inputHandle} value={phoneState} />
            </div>
          </div>

          <s.Horizon className="mt-2" />

          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              defaultValue="학생"
              name="jobState"
              value={jobState}
              onChange={inputHandle}
              // required
            >
              <FormControlLabel value="학생" control={<Radio />} label="학생" />
              <FormControlLabel
                value="사업자"
                control={<Radio />}
                label="사업자"
              />
            </RadioGroup>
          </FormControl>
          {jobState === "학생" ? (
            <>
              <div>
                <div className="mt-2 flex items-center justify-between">
                  <s.Label htmlFor="university">대학교</s.Label>
                </div>
                <div className="mt-2">
                  {/* <s.InputText type="text" name="schoolState" placeholder="대학교" onChange={inputHandle} value={schoolState} required /> */}
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    value={schoolState}
                    label="대학교 *"
                    // onChange={inputHandle}
                  >
                    <MenuItem value="고려대학교">고려대학교</MenuItem>
                  </Select>
                </div>
              </div>
              <div>
                <div className="mt-2 flex items-center justify-between">
                  <s.Label htmlFor="studentId">학번</s.Label>
                </div>
                <div className="mt-2">
                  <InputStudentId
                    onChange={inputHandle}
                    value={studentIdState}
                  />
                </div>
              </div>
              <div>
                <div className="mt-2 flex items-center justify-between">
                  <s.Label htmlFor="email">대학교 이메일</s.Label>
                </div>
                <div className="mt-2">
                  <InputEmail
                    emailFormatState={emailFormatState}
                    onChange={inputHandle}
                    value={emailState}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="mt-2 flex items-center justify-between">
                  <s.Label htmlFor="university">업체명</s.Label>
                </div>
                <div className="mt-2">
                  {/* <s.InputText type="text" name="schoolState" placeholder="대학교" onChange={inputHandle} value={schoolState} required /> */}
                  {/*<InputText name="schoolState" placeholder="업체명" />*/}
                </div>
              </div>
              <div>
                <div className="mt-2 flex items-center justify-between">
                  <s.Label htmlFor="email">이메일</s.Label>
                </div>
                <div className="mt-2">
                  <InputEmail
                    emailFormatState={emailFormatState}
                    onChange={inputHandle}
                    value={emailState}
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <div className="mt-2 flex items-center justify-between">
              <s.Label htmlFor="gender">성별</s.Label>
            </div>
            <div className="mt-2">
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  defaultValue="여"
                  name="genderState"
                  value={genderState}
                  onChange={inputHandle}
                  /*required*/
                >
                  <FormControlLabel value="여" control={<Radio />} label="여" />
                  <FormControlLabel value="남" control={<Radio />} label="남" />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <s.NormalButton
          type="submit"
          onClick={signUpHandled}
          className="flex w-full justify-center my-2"
        >
          회원가입
        </s.NormalButton>
      </DialogActions>
    </Dialog>
  );
}

export function LoginDialog() {
  const { setSignUpPopUpState } = guestInfoPopUpStore((state) => ({
    setSignUpPopUpState: state.setSignUpPopUpState,
  }));
  const { setUserInfo } = useUserInfoStore();

  const [inputs, setInputs] = useState({
    idState: "",
    passwordState: "",
  });
  const { idState, passwordState } = inputs;
  const [popUpState, setPopUpState] = useState(false);

  const togglePopUpState = () => {
    setPopUpState(!popUpState);
  };

  const inputHandle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs({
      ...inputs,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const loginHandled = () => {
    FetchLogin({ id: idState, password: passwordState, setUserInfo });
    setPopUpState(false);
  };

  const signUpHandled = () => {
    setPopUpState(false);
    setSignUpPopUpState(/*true*/);
  };

  const idList = {
    google: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
  };

  const PasswordInput = ({
    inputHandle,
    passwordState,
  }: {
    inputHandle: ChangeEventHandler<HTMLInputElement>;
    passwordState: string;
  }) => {
    // 이중 intent 되어서 입력 도중 렌더링 되는 것 같습니다. 이것을 컴포넌트 해제하고 직접 쓰면 정상 작동 합니다.
    return (
      <div>
        <div className="mt-2 flex items-center justify-between">
          <s.Label htmlFor="password">Password</s.Label>
          <div className="text-sm">
            {/*<s.PolicyText href="/resetpassword">Forgot password?</s.PolicyText>*/}
          </div>
        </div>
        <div className="mt-2">
          <InputPassword onChange={inputHandle} value={passwordState} />
        </div>
      </div>
    );
  };

  const IdInput = ({
    inputHandle,
    idState,
  }: {
    inputHandle: ChangeEventHandler<HTMLInputElement>;
    idState: string;
  }) => {
    // 이중 intent 되어서 입력 도중 렌더링 되는 것 같습니다. 이것을 컴포넌트 해제하고 직접 쓰면 정상 작동 합니다.
    return (
      <div>
        <s.Label htmlFor="id">Id</s.Label>
        <div className="mt-2">
          <InputText
            name="idState"
            placeholder="아이디"
            onChange={inputHandle}
            value={idState}
          />
        </div>
      </div>
    );
  };

  // const OAuthLogin = () => {
  //   return (
  //     <DialogActions>
  //       <div className="w-4/5 h-4/5">
  //         <div>
  //           <GoogleOAuthProvider clientId={idList.google}>
  //             <GoogleButton />
  //           </GoogleOAuthProvider>
  //         </div>
  //         <div className="my-4 w-40">
  //           <NaverLogin />
  //         </div>
  //       </div>
  //     </DialogActions>
  //   );
  // };

  return (
    <div>
      <button onClick={togglePopUpState}>Login</button>
      <Dialog
        open={popUpState}
        className="border border-gray-300 shadow-xl rounded-lg"
      >
        <DialogTitle>
          <s.SvgHoverButton type="button" onClick={togglePopUpState}>
            <StyleComponent content="CloseButton" />
          </s.SvgHoverButton>
        </DialogTitle>
        <DialogContent>
          <div className="float-left">
            <s.SecondHead>로그인</s.SecondHead>
            <p className="text-base text-gray">
              합리적인 가격의 다양한 집을 확인하세요.
            </p>
          </div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <s.Label htmlFor="id">Id</s.Label>
              <div className="mt-2">
                <InputText
                  name="idState"
                  placeholder="아이디"
                  onChange={inputHandle}
                  value={idState}
                />
              </div>
            </div>{" "}
            {/*// 이중 intent 되어서 입력 도중 렌더링 되는 것 같습니다. 위 컴포넌트 해제하고 여기에 직접 쓰면 정상 작동 합니다.*/}
            <div>
              <div className="mt-2 flex items-center justify-between">
                <s.Label htmlFor="password">Password</s.Label>
                <div className="text-sm">
                  <Link href="/resetpassword">
                    <s.PolicyText>Forgot password?</s.PolicyText>
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <InputPassword onChange={inputHandle} value={passwordState} />
              </div>
            </div>{" "}
            {/*// 이중 intent 되어서 입력 도중 렌더링 되는 것 같습니다. 위 컴포넌트 해제하고 여기에 직접 쓰면 정상 작동 합니다.*/}
          </div>
          <div>
            <s.NormalButton
              type="submit"
              onClick={loginHandled}
              className="flex w-full justify-center mt-5"
            >
              로그인 하기
            </s.NormalButton>
          </div>
          <div className="text-sm">
            <Link href="#">
              <s.PolicyText
                className="mt-2 ml-1 text-m font-bold"
                onClick={signUpHandled}
              >
                회원가입
              </s.PolicyText>
            </Link>
          </div>
        </DialogContent>
        <s.Horizon />
        {/* <DialogActions>
          <div className="w-4/5 h-4/5">
            <div>
              <GoogleOAuthProvider clientId={idList.google}>
                <GoogleButton />
              </GoogleOAuthProvider>
            </div>
            <div className="my-4 w-40">
              <NaverLogin />
            </div>
          </div>
        </DialogActions>{" "} */}
      </Dialog>
      <SignUpDialog />
    </div>
  );
}

export const PostUploadDialog = () => {
  const { setPostPopUpState, postPopUpState } = guestInfoPopUpStore(
    (state) => ({
      setPostPopUpState: state.setPostPopUpState,
      postPopUpState: state.postPopUpState,
    })
  );
  const { userInfo } = useUserInfoStore();

  const [postState, setPostState] = useState({
    accomodationType: "",
    limitPeople: 1,
    buildingType: "",
    numberBathroom: 1,
    numberRoom: 1,
    numberBedroom: 1,
    title: "",
    basicInfo: "",
    duration: [1, 730],
    tempDuration: ["1일", "170일"],
    pos: [37.574583, 126.994143], // xCoordinate, yCoordinate // 추후 위치 기반으로 초기화.,
    fullAddress: "테스트",
    city: "서울", // 테스트 데이터,
    gu: "은평구", // 테스트 데이터,
    dong: "갈현동", // 테스트 데이터,
    street: "갈현로", // 테스트 데이터,
    streetNumber: "39가길", // 테스트 데이터,
    postCode: "123123", // 테스트 데이터,
    startEndDay: [
      new Date(),
      new Date().setFullYear(new Date().getFullYear() + 1),
    ], // new Date().setFullYear(new Date().getFullYear() + 1) // 2024년 2월 29일에 누르면, 2025년 2월 30일이 나오지는 않는지 확인 필요.
    price: "10,000",
    imageFiles: [] as File[],
    rule: "규칙",
    benefit: "혜택",
    refundPolicy: "환불정책",
    contract: "계약", // ?
  });

  const onChange = (e: any) => {
    // 너무 다양해서 any로 일단 해놓음.
    setPostState({ ...postState, [e.target.name]: e.target.value });
  };

  // const updatePostState = (key, value) => {
  //   setFormState(prev => ({ ...prev, [key]: value }));
  // };

  const handleClose = () => confirmAction();

  const confirmAction = async () => {
    // if (windows.confirm('임시저장 하시겠습니까?')) {
    //   const formData = makeFormData();
    //   formData.append('local_save', true); // 임시저장 유무
    //   FetchUploadPost(formData);
    // }
    setPostPopUpState();
  };

  const makeFormData = () => {
    const formData = new FormData();

    // 뭔가 개선이 가능해 보이긴하나..
    formData.append("title", postState["title"]);
    formData.append("price", postState["price"].replace(/,/gi, ""));
    formData.append("basic_info", postState["basicInfo"]);
    formData.append("benefit", postState["benefit"]);
    formData.append("start_day", String(postState["startEndDay"][0]));
    formData.append("end_day", String(postState["startEndDay"][1]));
    formData.append("min_duration", String(postState["duration"][0]));
    formData.append("max_duration", String(postState["duration"][1]));
    formData.append("position", postState["fullAddress"]);
    formData.append("refund_policy", postState["refundPolicy"]);
    formData.append("rule", postState["rule"]);
    formData.append("limit_people", String(postState["limitPeople"]));
    formData.append("number_room", String(postState["numberRoom"]));
    formData.append("number_bathroom", String(postState["numberBathroom"]));
    formData.append("number_bedroom", String(postState["numberBedroom"]));
    formData.append("accomodation_type", postState["accomodationType"]);
    formData.append("building_type", postState["buildingType"]);
    formData.append("x_coordinate", String(postState["pos"][0]));
    formData.append("y_coordinate", String(postState["pos"][1]));
    formData.append("city", "city");
    formData.append("gu", "gu");
    formData.append("dong", "dong");
    formData.append("street", "street");
    formData.append("street_number", "streetNumber");
    formData.append("post_code", "postCode");
    formData.append("school", userInfo.school); // 사용자 정보에 따라서 해야함.
    formData.append("postuser_id", userInfo.user_id); // 사용자 정보에 따라서 해야함.
    formData.append("contract", String(true)); // 계약 관련
    formData.append("description", "description"); // basic_info와 중복?
    formData.append("extra_info", "extra_info"); // basic_info와 중복?
    // formData.append("content", "content"); // ?
    // formData.append("category", "category"); // ?
    // formData.append("post_date", (new Date()).toISOString());

    postState["imageFiles"].forEach((file, index) => {
      formData.append("images", file);
    });

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
      if (
        value === "" ||
        value === null ||
        value === undefined ||
        postState["imageFiles"].length === 0
      ) {
        return null;
      }
    });
    return formData;
  };

  const uploadPost = async () => {
    const formData = makeFormData();
    if (formData === null) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    formData.append("local_save", String(false));
    FetchUploadPost(formData, setPostPopUpState); // .catch(raiseError("PostUploadDialog", true, alert("게시물 업로드에 실패했습니다.")));
  };

  const handleSetImages = (newImage: File, index: number) => {
    let newImages: File[] = postState["imageFiles"];
    if (index >= newImages.length) {
      newImages.push(newImage);
    } else {
      newImages[index] = newImage;
    }
    setPostState({ ...postState, imageFiles: newImages });
  };

  const hadnleStartEndDay = (date1: Date, date2: Date) => {
    setPostState({ ...postState, startEndDay: [date1, date2] });
  };

  const handleDuration = (event: Event, newValue: number[]) => {
    // postState
    setPostState({
      ...postState,
      duration: newValue,
      tempDuration: [newValue[0] + "일", newValue[1] + "일"],
    });
  };

  const handleLocation = (newValue: [number, number]) => {
    setPostState({ ...postState, pos: newValue });
  };

  return (
    <>
      <Dialog
        open={postPopUpState}
        className="border border-gray-300 shadow-xl rounded-lg"
      >
        <DialogContent sx={{ width: "500px" }} className="text-center">
          <s.SvgHoverButton
            type="button"
            className="float-right"
            onClick={handleClose}
          >
            <StyleComponent content="CloseButton" />
          </s.SvgHoverButton>
          {/* <p>
            --------------추후 슬라이더로 변경 (현재는 스크롤)---------------
          </p> */}
          <div style={psd.gridStyle.mainContainer}>
            <p style={psd.gridStyle.inputContainer}>
              <h3 style={psd.gridStyle.infoType}>숙소 기본정보를 작성하세요</h3>
              <DropBoxSelect
                name="accomodationType"
                state={postState["accomodationType"]}
                onChange={onChange}
                labelName="계약 형태"
                labelId="accomodation_type"
                id="accomodation_type"
                menuItems={[
                  "전대(sublet)",
                  "전대(sublease)",
                  "임대(lease)",
                  "룸메이트",
                ]}
              />

              <div>
                <div>
                  <SingleValueViewer
                    value={"최대인원: " + postState["limitPeople"] + "명"}
                  />
                  <SingleSlideInput
                    name="limitPeople"
                    value={postState["limitPeople"]}
                    onChange={onChange}
                    minMax={[1, 10]}
                  />
                </div>
                <DropBoxSelect
                  name="buildingType"
                  state={postState["buildingType"]}
                  onChange={onChange}
                  labelName="건물 유형"
                  labelId="building_type"
                  id="building_type"
                  menuItems={["오피스텔", "원룸", "아파트", "빌라", "기타"]}
                />
              </div>
              <div>
                <div>
                  <SingleValueViewer
                    value={"욕실 개수: " + postState["numberBathroom"]}
                  />
                  <SingleSlideInput
                    name="numberBathroom"
                    value={postState["numberBathroom"]}
                    onChange={onChange}
                    minMax={[1, 10]}
                  />
                </div>
                <div>
                  <SingleValueViewer
                    value={"침실 개수: " + postState["numberBedroom"]}
                  />
                  <SingleSlideInput
                    name="numberBedroom"
                    value={postState["numberBedroom"]}
                    onChange={onChange}
                    minMax={[1, 10]}
                  />
                </div>
              </div>
            </p>
            <p style={psd.gridStyle.inputContainer}>
              <h3 style={psd.gridStyle.infoType}>숙소의 매력을 작성하세요</h3>
              <TextInputTag
                id="title"
                label="제목"
                placeholder="제목을 입력해주세요."
                value={postState["title"]}
                name="title"
                onChange={onChange}
                required={true}
              />
              <InputTextArea
                id="basic_info"
                label="기본정보"
                placeholder="기본정보을 입력해주세요."
                value={postState["basicInfo"]}
                name="basicInfo"
                onChange={onChange}
                required={true}
              />
            </p>

            <p style={psd.gridStyle.inputContainer}>
              <h3 style={psd.gridStyle.infoType}>숙소 위치 입력하기</h3>
              {/* <TextInputTag
                  id="full_address"
                  label="주소"
                  placeholder="주소를 입력해주세요."
                  handleState={handleFullAddress}
                  required={true}
                /> */}
              {/* <TextInputTag
                  id="city"
                  label="시"
                  placeholder="시를 입력해주세요."
                  handleState={handleCity}
                  required={true}
                />
                <TextInputTag
                  id="gu"
                  label="구"
                  placeholder="구를 입력해주세요."
                  handleState={handleGu}
                  required={true}
                />
                <TextInputTag
                  id="dong"
                  label="동"
                  placeholder="동을 입력해주세요."
                  handleState={handleDong}
                  required={true}
                />
                <TextInputTag
                  id="street"
                  label="길"
                  placeholder="길을 입력해주세요."
                  handleState={handleStreet}
                  required={true}
                />
                <TextInputTag
                  id="street_number"
                  label="번지"
                  placeholder="번지를 입력해주세요."
                  handleState={handleStreetNumber}
                  required={true}
                />
                <TextInputTag
                  id="post_code"
                  label="우편번호"
                  placeholder="우편번호를 입력해주세요."
                  handleState={handlePostCode}
                  required={true}
                />
                <Map
                  type="searchByMarker"
                  currentPos={pos}
                  setPos={setPos}
                />   */}
              <LocationInput
                pos={postState["pos"] as [number, number]}
                currentPos={postState["pos"] as [number, number]} // Fix: Cast 'pos' as [number, number]
                name="pos"
                onChange={handleLocation}
              />{" "}
              {/* 이렇게만 하면 안되고, 직접 친 후에 맵을 띄울 수도 있어야함. 위 주석 참고. */}
            </p>

            <p style={psd.gridStyle.inputContainer}>
              <h3 style={psd.gridStyle.infoType}>기간 및 금액</h3>
              <p>게시 날짜</p>
              <DoubleDatePicker
                dateData={postState["startEndDay"]}
                setDateData={hadnleStartEndDay}
              />

              <InputInteger
                id="price"
                label="가격"
                name="price"
                placeholder="가격을 입력해주세요."
                value={priceToString(postState["price"].replace(/,/gi, ""))} // 숫자에 ,를 넣어주는 함수 필요
                handleState={onChange}
                required={true}
              />

              <p>
                최소-최대 계약 가능 기간 :{" "}
                <ValueRangeViewer
                  arr={postState["tempDuration"] as [string, string]}
                />
              </p>
              <DoubleSlideInput
                name="duration"
                value={postState["duration"] as [number, number]}
                onChange={handleDuration}
                minMax={[1, 730]}
              />
              {/* <DoubleSlideInput
                value={postState['duration']}
                name="duration"
                onChange={handleDuration}
                minMax={[1, 730]}
              /> */}
            </p>

            <p style={psd.gridStyle.inputContainer}>
              <h3 style={psd.gridStyle.infoType}>숙소 사진을 올려주세요.</h3>
              {postState["imageFiles"].length > 0 && (
                <>이미지를 변경하려면 이미지를 클릭해주세요.</>
              )}
              {Array.from({ length: postState["imageFiles"].length + 1 }).map(
                (_, index) => (
                  <ImageUploadComponent
                    key={index}
                    imgIndex={index}
                    setImage={handleSetImages}
                  />
                )
              )}
            </p>
          </div>
        </DialogContent>

        <s.NormalButton className="ml-2" onClick={uploadPost}>
          방 올리기
        </s.NormalButton>
      </Dialog>
    </>
  );
};

export const PostEditDialog = (post: { post: Post }) => {
  const image: File[] = [];

  post.post.image_id.map((id) => {
    // const i = FetchConverURLtoFile(id);
    // image.push(i.results);
  });

  const [imageFiles, setImageFiles] = useState<File[]>(image);
  //image객체가 생성되어 속성들을 추가할수 있음    })]
  const { setPostPopUpState, postPopUpState } = guestInfoPopUpStore(
    (state) => ({
      setPostPopUpState: state.setPostPopUpState,
      postPopUpState: state.postPopUpState,
    })
  );

  const [inputs, setInputs] = useState({
    limitPeople: post.post.limit_people,
    buildingType: post.post.building_type,
    numberBathroom: post.post.number_bathroom,
    numberRoom: post.post.number_room,
    numberBedroom: post.post.number_bedroom,
    title: post.post.title,
    basicInfo: post.post.basic_info,
    startEndDay: [post.post.start_day, post.post.end_day],
    // duration: [post.post.du]
    // tempDuration:
    price: String(post.post.price),
    rule: post.post.rule,
    benefit: post.post.benefit,
    refundPolicy: post.post.refund_policy,
    contract: post.post.contract,
  });
  const {
    limitPeople,
    numberBathroom,
    numberRoom,
    numberBedroom,
    title,
    basicInfo,
    startEndDay,
    price,
    benefit,
  } = inputs;

  const onChange: (event: Event, value: number | number[]) => void = (e) => {
    if (!e.currentTarget) return;

    setInputs({
      ...inputs,
      [(e.currentTarget as HTMLInputElement).name]: (
        e.currentTarget as HTMLInputElement
      ).value,
    });
  };
  const onClick = async () => {
    const formData = makeFormData();
    FetchEditPost(post.post.key, formData);
  };
  const makeFormData = () => {
    const formData = new FormData();

    // 모든 데이터가 적절히 입력되었는지 확인하고 아니라면 alert 띄워주기.

    formData.append("title", title);
    formData.append("price", price.replace(/,/gi, ""));
    formData.append("basic_info", basicInfo);
    formData.append("benefit", benefit);
    formData.append("end_day", new Date().toISOString());
    // formData.append('min_duration', duration[0]);
    // formData.append('max_duration', duration[1]);
    // formData.append('position', fullAddress);
    // formData.append('refund_policy', refundPolicy);
    // formData.append('rule', rule);
    // formData.append('start_day', (new Date()).toISOString());
    formData.append("limit_people", limitPeople.toString());
    formData.append("number_room", numberRoom.toString());
    formData.append("number_bathroom", numberBathroom.toString());
    formData.append("number_bedroom", numberBedroom.toString());

    imageFiles.forEach((file, index) => {
      formData.append("images", file);
    });

    return formData;
  };

  const handleSetImages: (file: any, idx: number) => void = (
    newImage,
    index: number
  ) => {
    const newImages = [...imageFiles];
    if (index >= imageFiles.length) {
      newImages.push(newImage);
    } else {
      newImages[index] = newImage;
    }
    setImageFiles(newImages);
  };

  return (
    <>
      <DialogContent sx={{ width: "500px" }} className="text-center">
        {/* <p>
            --------------추후 슬라이더로 변경 (현재는 스크롤)---------------
          </p> */}
        <div style={psd.gridStyle.mainContainer}>
          <p style={psd.gridStyle.inputContainer}>
            <h3 style={psd.gridStyle.infoType}>숙소 기본정보를 작성하세요</h3>

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
            <h3 style={psd.gridStyle.infoType}>숙소의 매력을 작성하세요</h3>
            <TextInputTag
              id="title"
              label="제목"
              placeholder="제목을 입력해주세요."
              name="title"
              // onChange={onChange}
              required={true}
              value={title}
            />
            <InputTextArea
              id="basic_info"
              label="기본정보"
              placeholder="기본정보을 입력해주세요."
              name="basicInfo"
              // handleState={onChange}
              required={true}
              value={basicInfo}
            />
          </p>

          <p style={psd.gridStyle.inputContainer}>
            <h3 style={psd.gridStyle.infoType}>기간 및 금액</h3>
            <p>게시 날짜</p>
            <DoubleDatePicker
              // name="startEndDay"
              dateData={startEndDay}
              setDateData={onChange}
            />

            <InputInteger
              id="price"
              label="가격"
              placeholder="가격을 입력해주세요."
              name="price"
              value={priceToString(price.replace(/,/gi, ""))} // 숫자에 ,를 넣어주는 함수 필요
              // handleState={onChange}
              required={true}
            />
            {/*             
            <p>
              최소-최대 계약 가능 기간 : <ValueRangeViewer arr={tempDuration} />
            </p> */}
            {/* <DoubleSlideInput
              value={duration}
              onChange={handleDuration}
              minMax={[1, 730]}
            /> */}
          </p>

          <p style={psd.gridStyle.inputContainer}>
            <h3 style={psd.gridStyle.infoType}>숙소 사진을 올려주세요.</h3>
            {imageFiles.length > 0 && (
              <>이미지를 변경하려면 이미지를 클릭해주세요.</>
            )}
            {Array.from({ length: imageFiles.length + 1 }).map((_, index) => (
              <ImageUploadComponent
                key={index}
                imgIndex={index}
                setImage={handleSetImages}
              />
            ))}
          </p>
        </div>
      </DialogContent>

      <s.NormalButton className="ml-2" onClick={onClick}>
        방 올리기
      </s.NormalButton>
    </>
  );
};
