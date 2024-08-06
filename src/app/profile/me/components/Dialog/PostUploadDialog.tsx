import { DialogContent } from "@mui/material";
import { DoubleDatePicker } from "@shared/components/Input/DoubleDatePicker";
import { DoubleSlideInput } from "@shared/components/Input/DoubleSlideInput";
import DropBoxSelect from "@shared/components/Input/DropBoxSelect";
import { ImageUploadComponent } from "@shared/components/Input/ImageInput";
import { SingleSlideInput } from "@shared/components/Input/SingleSlideInput";
import {
  InputInteger,
  InputTextArea,
  TextInputTag,
} from "@shared/components/Input/TextInputTag";
import {
  SingleValueViewer,
  ValueRangeViewer,
} from "@shared/components/Input/ValueViewer";
import { KakaoMap } from "@shared/components/Map/Map";
import { DialogForm } from "@shared/components/Popup/Popup";
import {
  formatDate,
  priceToString,
} from "@shared/components/StaticComponents/StaticComponents";
import AdministrativeDistricts from "@shared/StaticData/AdministrativeDistricts";
import * as psd from "@shared/styles/PostUploadDialog.styles";
import * as s from "@shared/styles/Public.styles";
import { guestInfoPopUpStore } from "@store/GuestInfoStore";
import { useUserInfoStore } from "@store/UserInfoStore";
import axios from "axios";
import React, { useState } from "react";
import "swiper/swiper-bundle.css";

const cities = Object.keys(AdministrativeDistricts) as string[];

export const PostUploadDialog = () => {
  const { setPostPopUpState, postPopUpState } = guestInfoPopUpStore(
    (state) => ({
      setPostPopUpState: state.setPostPopUpState,
      postPopUpState: state.postPopUpState,
    })
  );
  const { userInfo } = useUserInfoStore();
  const [posState, setPosState] = useState([37.574583, 126.994143]);
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
    fullAddress: "전체 주소.", // 테스트 데이터.
    city: "",
    gu: "",
    dong: "temp",
    street: "",
    streetNumber: "",
    postCode: "temp",
    startEndDay: [
      new Date(),
      new Date().setFullYear(new Date().getFullYear() + 1),
    ],
    price: "10,000",
    imageFiles: [] as File[],
    rule: "규칙",
    benefit: "혜택",
    refundPolicy: "환불정책",
    contract: "계약",
    genderType: "모두",
  });

  const [isUploading, setIsUploading] = useState(false); // 업로드 상태
  const [uploadError, setUploadError] = useState<string | null>(null); // 업로드 오류 메시지

  const onChange = (e: any) => {
    setPostState({ ...postState, [e.target.name]: e.target.value });
  };

  const handleClose = () => confirmAction();
  const [requiredForm, setRequiredForm] = useState(false);

  const confirmAction = async () => {
    setPostPopUpState();
  };

  const makeFormData = () => {
    const formData = new FormData();
    formData.append("basic_info", postState["basicInfo"]);
    formData.append("benefit", postState["benefit"]);
    formData.append("description", "description");
    formData.append("end_day", formatDate(postState["startEndDay"][1]));
    formData.append("extra_info", "extra_info");
    formData.append("max_duration", postState["duration"][1].toString());
    formData.append("min_duration", postState["duration"][0].toString());
    formData.append("start_day", formatDate(postState["startEndDay"][0]));
    formData.append("title", postState["title"]);
    formData.append("rule", postState["rule"]);
    formData.append("refund_policy", postState["refundPolicy"]);
    formData.append("position", postState["fullAddress"]);
    formData.append("limit_people", postState["limitPeople"].toString());
    formData.append("number_room", postState["numberRoom"].toString());
    formData.append("number_bathroom", postState["numberBathroom"].toString());
    formData.append("number_bedroom", postState["numberBedroom"].toString());
    formData.append("price", postState["price"].replace(/,/gi, ""));
    formData.append("school", userInfo.school);
    formData.append("accomodation_type", postState["accomodationType"]);
    formData.append("building_type", postState["buildingType"]);
    formData.append("contract", "true");
    formData.append("x_coordinate", posState[0].toString());
    formData.append("y_coordinate", posState[1].toString());
    formData.append("city", postState["city"]);
    formData.append("gu", postState["gu"]);
    formData.append("dong", postState["dong"]);
    formData.append("street_number", postState["streetNumber"]);
    formData.append("post_code", postState["postCode"]);
    formData.append("street", postState["street"]);
    formData.append("gender_type", postState["genderType"]);

    postState["imageFiles"].forEach((file) => {
      formData.append("images", file);
    });

    return formData;
  };

  // 업로드 요청 함수
  const fetchUploadPost = async (formData: FormData) => {
    const URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/post`;
    setIsUploading(true);
    setUploadError(null);

    try {
      const res = await axios.post(URL, formData, {
        headers: {
          Accept: "*/*",
        },
        withCredentials: true,
      });

      if (res.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      setUploadError("게시물 업로드에 실패했습니다. 다시 시도해주세요.");
      console.error("Error during upload:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const uploadPost = async () => {
    const formData = makeFormData();
    let count = 0;
    formData.forEach((value, key) => {
      if (
        [
          "accomodation_type",
          "building_type",
          "title",
          "basic_info",
          "city",
          "gu",
          "dong",
          "street",
          "street_number",
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
          "city",
          "gu",
          "dong",
          "street",
          "street_number",
        ].includes(key)
      ) {
        count += 1;
        if (count == 8) {
          setRequiredForm(false);
        }
      }
    });
    if (requiredForm == false) {
      formData.append("local_save", "false");
      await fetchUploadPost(formData);
    }
  };

  const savePost = async () => {
    const formData = makeFormData();
    formData.append("local_save", "true");
    await fetchUploadPost(formData);
  };

  const handleSetImages = (newImages: File[], index: number) => {
    setPostState({ ...postState, imageFiles: newImages });
  };

  const handleStartEndDay = (date: [Date, Date]) => {
    setPostState({ ...postState, startEndDay: date });
  };

  const handleDuration = (event: Event, newValue: number[]) => {
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
    <DialogForm
      openState={postPopUpState}
      handleClose={handleClose}
      render={() => (
        <label
          htmlFor="PostUploadDialog"
          className="block mb-2 text-sm font-medium text-gray-900 float-left"
        >
          호스팅하기
        </label>
      )}
    >
      <DialogContent
        sx={{
          width: "100%",
          maxWidth: "100%",
          padding: 0,
          margin: 0,
        }}
        className="w-full flex-wrap pt-4"
      >
        {/* 로딩 상태 표시 */}
        {isUploading && (
          <div className="flex justify-center items-center">
            <p>업로드 중입니다. 잠시만 기다려주세요...</p>
            <div className="loader"></div> {/* 로딩 스피너 컴포넌트 */}
          </div>
        )}

        {/* 업로드 오류 메시지 */}
        {uploadError && (
          <div className="text-red-500 text-center">
            <p>{uploadError}</p>
          </div>
        )}

        {/* Swiper 내의 개별 슬라이드 */}
        <p style={psd.gridStyle.inputContainer}>
          <h3 style={psd.gridStyle.infoType}>호스팅 정보</h3>
          <DropBoxSelect
            name="accomodationType"
            state={postState["accomodationType"]}
            onChange={onChange}
            labelName="계약 형태"
            labelId="accomodation_type"
            id="accomodation_type"
            menuItems={["양도/전대(sublet)", "임대", "월세", "룸메이트"]}
          />

          <div className="mt-4">
            <DropBoxSelect
              name="buildingType"
              state={postState["buildingType"]}
              onChange={onChange}
              labelName="건물 유형"
              labelId="building_type"
              id="building_type"
              menuItems={["오피스텔", "원룸", "아파트", "빌라", "기타"]}
            />
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
                minMax={[1, 4]}
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
                minMax={[1, 4]}
              />
            </div>
          </div>
        </p>
        <p style={psd.gridStyle.inputContainer}>
          <h3 style={psd.gridStyle.infoType}>호스팅 방</h3>
          <TextInputTag
            id="title"
            label="제목"
            placeholder="제목을 입력해주세요."
            value={postState["title"]}
            name="title"
            onChange={onChange}
            required={true}
          />
          <div className="mt-4">
            <InputTextArea
              id="basic_info"
              label="기본정보"
              placeholder="기본정보을 입력해주세요."
              value={postState["basicInfo"]}
              name="basicInfo"
              onChange={onChange}
              required={true}
            />
          </div>
        </p>
        <p style={psd.gridStyle.inputContainer}>
          <h3 style={psd.gridStyle.infoType}>호스팅 위치</h3>
          <DropBoxSelect
            name="city"
            state={postState["city"]}
            onChange={onChange}
            labelName="시/도"
            labelId="city"
            id="city"
            menuItems={cities}
          />
          <br />
          <DropBoxSelect
            name="gu"
            state={postState["gu"]}
            onChange={onChange}
            labelName="구/시/군/면"
            labelId="gu"
            id="gu"
            menuItems={
              postState["city"]
                ? AdministrativeDistricts[
                    postState["city"] as keyof typeof AdministrativeDistricts
                  ]
                : ["시/군을 먼저 선택해주세요"]
            }
          />
          <div className="mt-4">
            <TextInputTag
              id="street"
              label="길(로)"
              placeholder="길을 입력해주세요."
              value={postState["street"]}
              name="street"
              onChange={onChange}
              required={true}
              className="w-full sm:w-3/4 lg:w-1/2"
            />
          </div>
          <div className="mt-4">
            <TextInputTag
              id="streetNumber"
              label="번지"
              placeholder="번지를 입력해주세요."
              value={postState["streetNumber"]}
              name="streetNumber"
              onChange={onChange}
              required={true}
              className="w-full sm:w-3/4 lg:w-1/2"
            />
          </div>
        </p>
        <p style={psd.gridStyle.inputContainer}>
          <h3 style={psd.gridStyle.infoType}>호스팅 지도</h3>
          <div className="">
            {postState["street"] != "" &&
              postState["streetNumber"] != "" &&
              postState["gu"] != "" &&
              postState["city"] != "" && (
                <KakaoMap
                  name={
                    postState["city"] +
                    " " +
                    postState["gu"] +
                    " " +
                    postState["street"] +
                    " " +
                    postState["streetNumber"]
                  }
                  setPosState={setPosState}
                />
              )}
          </div>
        </p>

        <p style={psd.gridStyle.inputContainer}>
          <h3 style={psd.gridStyle.infoType}>호스팅 날짜</h3>
          <div className="mb-8">
            <p className="block text-lg font-light text-gray-900">
              입주 가능일
            </p>{" "}
            <br />
            <DoubleDatePicker
              dateData={postState["startEndDay"]}
              setDateData={handleStartEndDay}
            />
          </div>
          <div className="clear-both mb-4">
            <InputInteger
              id="price"
              label="가격(일)"
              name="price"
              placeholder="가격을 입력해주세요."
              value={priceToString(postState["price"].replace(/,/gi, ""))}
              handleState={onChange}
              required={true}
            />
            ₩{priceToString(Number(postState["price"].replace(/,/gi, "")) * 30)}
            / 월
          </div>
          <p className="mt-4 block mb-2 text-lg font-light text-gray-900 float-left">
            최소-최대 입주일 :
          </p>
          <div className="clear-both">
            <ValueRangeViewer
              arr={postState["tempDuration"] as [string, string]}
            />
          </div>
          <DoubleSlideInput
            name="duration"
            value={postState["duration"] as [number, number]}
            onChange={handleDuration}
            minMax={[1, 730]}
            step={1}
          />
        </p>
        <p style={psd.gridStyle.inputContainer}>
          <h3 style={psd.gridStyle.infoType}>입주 가능 성별</h3>
          <DropBoxSelect
            name="genderType"
            state={postState["genderType"]}
            onChange={onChange}
            labelName="성별"
            labelId="genderType"
            id="genderType"
            menuItems={["모두", "남", "여"]}
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

          {postState["imageFiles"].length > 0 && (
            <>이미지를 변경하려면 이미지를 클릭해주세요.</>
          )}
          <ImageUploadComponent imgIndex={1} setImage={handleSetImages} />
        </p>
        <p style={psd.gridStyle.inputContainer}>
          <h3 style={psd.gridStyle.infoType}></h3>
        </p>

        <div className="ml-10" style={{ width: 320 }}>
          <s.SecondHead>
            {postState.title == "" ? "제목 작성 안됨" : postState.title}
          </s.SecondHead>
          <s.NormalText className="mt-2 w-full">
            {postState.basicInfo.split(/\r\n|\r|\n/).map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </s.NormalText>
          <br />

          <s.NormalText className="mt-2">
            계약 형태:{" "}
            {postState.accomodationType == ""
              ? "선택 안됨"
              : postState.accomodationType}{" "}
          </s.NormalText>

          <s.NormalText className="mt-2">
            건물 유형:{" "}
            {postState.buildingType == ""
              ? "선택 안됨"
              : postState.buildingType}
          </s.NormalText>
          <s.NormalText className="mt-2">
            최대 인원: {postState.limitPeople}
          </s.NormalText>
          <s.NormalText className="mt-2">
            방: 욕실 {postState.numberBathroom} 침실 {postState.numberBedroom}
          </s.NormalText>
          <s.NormalText className="mt-2">
            주소:{" "}
            {postState["city"] +
              " " +
              postState["gu"] +
              " " +
              postState["street"] +
              " " +
              postState["streetNumber"]}
          </s.NormalText>
          <s.NormalText className="mt-2">
            최대 거주 기간: {postState.duration[0]} - {postState.duration[1]}일
          </s.NormalText>
          <s.NormalText className="mt-2">
            일일 가격: {postState.price}
          </s.NormalText>
          <s.NormalText className="mt-2">
            입주 가능 성별: {postState.genderType}
          </s.NormalText>
          <p className="text-sm font-light">
            {" "}
            업로드 버튼 클릭 후 잠시 기다려주세요.
          </p>
        </div>

        <div className="m-6">
          {requiredForm && (
            <div className="text-center">
              <p className="text-xl font-bold">정보 확인해주세요!</p>
              <hr />
            </div>
          )}

          {/* 바로 업로드하기 버튼 */}
          <button
            className={`w-full mt-4 border p-2.5 rounded-lg ${
              isUploading || postState.imageFiles.length === 0
                ? "bg-gray-400 cursor-not-allowed" // 비활성화일 때 회색 배경
                : "bg-gray-800 hover:bg-black"
            }`}
            onClick={uploadPost}
            disabled={isUploading || postState.imageFiles.length === 0} // 이미지가 없거나 업로드 중일 때 버튼 비활성화
          >
            <p className="text-base text-white font-light">
              {isUploading ? "업로드 중..." : "바로 업로드하기"}
            </p>
          </button>
        </div>
      </DialogContent>
    </DialogForm>
  );
};
