"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import { guestInfoPopUpStore } from "@store/GuestInfoStore";
import { useUserInfoStore } from "@store/UserInfoStore";
import { FetchUploadPost } from "@shared/components/FetchList/FetchList";
import { LocationInput } from "@shared/components/Input/LocationInput";
import { DoubleDatePicker } from "@shared/components/Input/DoubleDatePicker";
import { DoubleSlideInput } from "@shared/components/Input/DoubleSlideInput";
import { ImageUploadComponent } from "@shared/components/Input/ImageInput";
import DropBoxSelect from "@shared/components/Input/DropBoxSelect";
import { SingleSlideInput } from "@shared/components/Input/SingleSlideInput";
import {
  TextInputTag,
  InputTextArea,
  InputInteger,
} from "@shared/components/Input/TextInputTag";
import {
  ValueRangeViewer,
  SingleValueViewer,
} from "@shared/components/Input/ValueViewer";
import * as s from "@shared/styles/Public.styles";
import * as psd from "@shared/styles/PostUploadDialog.styles";
import {
  Alert,
  FailAlert,
  formatDate,
  priceToString,
} from "@shared/components/StaticComponents/StaticComponents";
import AdministrativeDistricts from "@shared/StaticData/AdministrativeDistricts";

// 필요한 Swiper 모듈들을 임포트
// Swiper 코어와 필요한 컴포넌트 임포트
// Swiper 기본 스타일 임포트
import {
  Navigation, // 네비게이션 버튼(다음/이전) 활성화
  Pagination, // 페이지네이션 도트 활성화
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { DialogForm } from "@shared/components/Popup/Popup";
import { KakaoMap } from "@shared/components/Map/Map";

const cities = Object.keys(AdministrativeDistricts) as string[];

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
    fullAddress: "전체 주소.", // 테스트 데이터.
    city: "",
    gu: "",
    dong: "",
    street: "",
    streetNumber: "",
    postCode: "",
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
    genderType: "모두", // 성별
  });

  const onChange = (e: any) => {
    setPostState({ ...postState, [e.target.name]: e.target.value });
  };

  // const updatePostState = (key, value) => {
  //   setFormState(prev => ({ ...prev, [key]: value }));
  // };

  const handleClose = () => confirmAction();
  const [requiredForm, setRequiredForm] = useState(false);
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
    formData.append("basic_info", postState["basicInfo"]);
    formData.append("benefit", postState["benefit"]);
    formData.append("description", "description"); // basic_info와 중복?
    formData.append("end_day", formatDate(postState["startEndDay"][1]));
    formData.append("extra_info", "extra_info"); // basic_info와 중복?
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
    formData.append("contract", "true"); // 계약 관련
    formData.append("x_coordinate", postState["pos"][0].toString());
    formData.append("y_coordinate", postState["pos"][1].toString());
    formData.append("city", postState["city"]);
    formData.append("gu", postState["gu"]);
    formData.append("dong", postState["dong"]);
    formData.append("street_number", postState["streetNumber"]);
    formData.append("post_code", postState["postCode"]);
    formData.append("street", "street");
    formData.append("gender_type", postState["genderType"]);
    // 뭔가 개선이 가능해 보이긴하나..
    // formData.append("postuser_id", userInfo.user_id); // 사용자 정보에 따라서 해야함.

    // formData.append("content", "content"); // ?
    // formData.append("category", "category"); // ?
    // formData.append("post_date", (new Date()).toISOString());

    postState["imageFiles"].forEach((file, index) => {
      formData.append("images", file);
    });

    formData.forEach((value, key) => {
      // console.log(`${key}: ${value}`);
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
    var count = 0;
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
      FetchUploadPost(formData, setPostPopUpState); // .catch(raiseError("PostUploadDialog", true, alert("게시물 업로드에 실패했습니다.")));
      setPostPopUpState();
    }
  };

  const savePost = async () => {
    const formData = makeFormData();
    formData.append("local_save", "true");
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

  const handleStartEndDay = (date: [Date, Date]) => {
    setPostState({ ...postState, startEndDay: date });
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
    <DialogForm
      openState={postPopUpState}
      handleClose={handleClose}
      render={() => (
        <label
          htmlFor="PostUploadDialog"
          className="block mb-2 text-sm font-medium text-gray-900 float-left"
        >
          방 게시하기
        </label>
      )}
    >
      <DialogContent className="container mx-auto flex-wrap pt-4">
        {/* Swiper 내의 개별 슬라이드 */}
        <p style={psd.gridStyle.inputContainer}>
          <h3 style={psd.gridStyle.infoType}>숙소 기본정보를 작성하세요</h3>
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
          <h3 style={psd.gridStyle.infoType}>숙소 위치 입력하기</h3>
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
          <div className=" mt-4">
            <TextInputTag
              id="street"
              label="길(로)"
              placeholder="길을 입력해주세요."
              value={postState["street"]}
              name="street"
              onChange={onChange}
              required={true}
            />
          </div>
          <div className=" mt-4">
            <TextInputTag
              id="streetNumber"
              label="번지"
              placeholder="번지를 입력해주세요."
              value={postState["streetNumber"]}
              name="streetNumber"
              onChange={onChange}
              required={true}
            />
          </div>
        </p>
        <p style={psd.gridStyle.inputContainer}>
          <h3 style={psd.gridStyle.infoType}>위치 정보 확인</h3>
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
                />
              )}
          </div>
        </p>

        <p style={psd.gridStyle.inputContainer}>
          <h3 style={psd.gridStyle.infoType}>입주 정보</h3>
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
              value={priceToString(postState["price"].replace(/,/gi, ""))} // 숫자에 ,를 넣어주는 함수 필요
              handleState={onChange}
              required={true}
            />
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
          />
          {/* <DoubleSlideInput
                value={postState['duration']}
                name="duration"
                onChange={handleDuration}
                minMax={[1, 730]}
              /> */}
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
          <h3 style={psd.gridStyle.infoType}>사진을 올려주세요.</h3>
          {postState["imageFiles"].length > 0 && (
            <>이미지를 변경하려면 이미지를 클릭해주세요.</>
          )}
          <ImageUploadComponent imgIndex={1} setImage={handleSetImages} />
        </p>
        <p style={psd.gridStyle.inputContainer}>
          <h3 style={psd.gridStyle.infoType}>방을 업로드 하시겠습니까?</h3>
        </p>
        <div className="ml-20 text-left">
          <s.SecondHead>
            {postState.title == "" ? "제목 작성 안됨" : postState.title}
          </s.SecondHead>
          <s.NormalText className="mt-2 w-full">
            방 정보: {postState.basicInfo}
          </s.NormalText>
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
        </div>

        <div className="m-6">
          {requiredForm && (
            <div className="text-center">
              <p className="text-xl font-bold">정보를 다 입력해주세요</p>
              <hr />
            </div>
          )}
          <button
            className="w-full mt-4 border p-2.5 bg-gray-800 border-black rounded-lg hover:bg-black"
            onClick={uploadPost}
          >
            <p className="text-base text-white font-light"> 바로 업로드하기</p>
          </button>
        </div>
      </DialogContent>
    </DialogForm>
  );
};
