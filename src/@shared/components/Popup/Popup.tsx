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
  FetchLikePostsId,
} from "../FetchList/FetchList";

import {
  Alert,
  Information,
  StyleComponent,
  FailAlert,
  checkEmailFormat,
  notFoundError,
  raiseError,
  formatDate,
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

import { SingleSlideInput } from "../Input/SingleSlideInput";
import { SingleValueViewer, ValueRangeViewer } from "../Input/ValueViewer";
import { DoubleDatePicker } from "../Input/DoubleDatePicker";
import { priceToString } from "../StaticComponents/StaticComponents";
import { ImageUploadComponent } from "../Input/ImageInput";
import { guestInfoPopUpStore } from "@store/GuestInfoStore";
import { CustomWindow, RequestRoom, Room } from "@app/RoomType";
import Link from "next/link";
import { Post, RequestForm } from "@type/Type";
import { LoginContent } from "../loginComponents/LoginContent";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleButton } from "../loginComponents/Google";
import { DoubleSlideInput } from "../Input/DoubleSlideInput";

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
      <DialogContent sx={{ width: 512 }} className="font-black text-center">
        <div className="mb-8">
          {imgFile !== "" ? (
            <>{<img src={imgFile} alt="프로필 이미지" />}</>
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
            <button
              className="w-full mt-4 border p-2.5 bg-gray-800 border-black rounded-lg hover:bg-black"
              onClick={onClick}
            >
              <p className="text-base text-white font-light">
                {" "}
                프로필 수정하기
              </p>
            </button>
          ) : (
            <button className="w-full mt-4 border p-2.5 bg-gray-500 border-black rounded-lg">
              <p className="text-base text-white font-light">
                {" "}
                바로 업로드하기
              </p>
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
        >
          이메일 인증
        </label>
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
          ></label>
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
  const signUpHandled = () => {
    const birth = birthState.toDate();
    FetchSignUp({
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
      <DialogContent sx={{ width: 512 }}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <div className="mt-2 flex items-center justify-between">
              <s.Label htmlFor="username">별명</s.Label>
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
              )}{" "}
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <button
          className="w-full mt-4 border p-2.5 bg-gray-800 border-black rounded-lg hover:bg-black"
          type="submit"
          onClick={signUpHandled}
        >
          <p className="text-base text-white font-light">회원가입</p>
        </button>
      </DialogActions>
    </Dialog>
  );
}

export function LoginDialog() {
  const [popUpState, setPopUpState] = useState(false);

  const togglePopUpState = () => {
    setPopUpState(!popUpState);
  };

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
        <LoginContent setPopUpState={setPopUpState} />
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
  const image: File[] = [];

  post.image_id.map((id) => {
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

  const onClick = async () => {
    const formData = makeFormData();
    FetchEditPost(setEditRoomDialogShow, post.key, formData);
    setEditRoomDialogShow();
  };
  const handleStartEndDay = (date: [Date, Date]) => {
    setInputs({ ...inputs, startEndDay: date });
  };
  const handleDuration = (event: Event, newValue: number[]) => {
    // postState
    setInputs({
      ...inputs,
      duration: newValue,
      tempDuration: [newValue[0] + "일", newValue[1] + "일"],
    });
  };
  const makeFormData = () => {
    const formData = new FormData();

    // 모든 데이터가 적절히 입력되었는지 확인하고 아니라면 alert 띄워주기.

    formData.append("title", title);
    formData.append("price", price.replace(/,/gi, ""));
    formData.append("basic_info", basicInfo);
    formData.append("benefit", benefit);
    formData.append("end_day", formatDate(startEndDay[1]));
    formData.append("min_duration", duration[0].toString());
    formData.append("max_duration", duration[1].toString());
    // formData.append('position', fullAddress);
    // formData.append('refund_policy', refundPolicy);
    // formData.append('rule', rule);
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
            <h3 style={psd.gridStyle.infoType}>정보 수정하기</h3>

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

            <p className="mt-4 font-semibold text-lg text-left">제목</p>

            <TextInputTag
              id="title"
              label=""
              placeholder="제목을 입력해주세요."
              name="title"
              onChange={onChange}
              required={true}
              value={title}
            />
            <p className="mt-4 font-semibold text-lg text-left">정보</p>

            <InputTextArea
              id="basic_info"
              label=""
              placeholder="기본정보을 입력해주세요."
              name="basicInfo"
              onChange={onChange}
              required={true}
              value={basicInfo}
            />
            <p className="mt-8 font-semibold text-lg text-left">게시 날짜</p>
            <DoubleDatePicker
              dateData={startEndDay}
              setDateData={handleStartEndDay}
            />
            <p className="mt-4 font-semibold text-lg text-left">가격</p>

            <InputInteger
              id="price"
              label=""
              placeholder="가격을 입력해주세요."
              name="price"
              value={priceToString(price.replace(/,/gi, ""))} // 숫자에 ,를 넣어주는 함수 필요
              handleState={onChange}
              required={true}
            />

            <p className="mt-8 font-semibold text-lg text-left">
              최소-최대 계약 가능 기간 :
              <ValueRangeViewer
                arr={inputs["tempDuration"] as [string, string]}
              />
            </p>
            <DoubleSlideInput
              name="duration"
              value={inputs["duration"] as [number, number]}
              onChange={handleDuration}
              minMax={[1, 730]}
            />

            <p className="mt-8 font-semibold text-lg text-left">방 사진 변경</p>
            {imageFiles.length > 0 && (
              <>이미지를 변경하려면 이미지를 클릭해주세요.</>
            )}
            <ImageUploadComponent imgIndex={1} setImage={handleSetImages} />
          </p>
        </div>
      </DialogContent>
      <div className="m-8">
        <button
          className="w-full mt-4 border p-2.5 bg-gray-800 border-black rounded-lg hover:bg-black"
          onClick={onClick}
        >
          <p className="text-base text-white font-light"> 방 수정하기</p>
        </button>
      </div>
    </>
  );
};
