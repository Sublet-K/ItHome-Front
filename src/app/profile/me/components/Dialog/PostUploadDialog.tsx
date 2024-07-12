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
import { priceToString } from "@shared/components/StaticComponents/StaticComponents";
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

  const confirmAction = async () => {
    // if (windows.confirm('임시저장 하시겠습니까?')) {
    //   const formData = makeFormData();
    //   formData.append('local_save', true); // 임시저장 유무
    //   FetchUploadPost(formData);
    // }
    setPostPopUpState();
  };

  function formatDate(date: Date | number) {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1); // 월은 0부터 시작하므로 1을 더해줍니다.
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

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
    if (formData === null) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    formData.append("local_save", "false");
    FetchUploadPost(formData, setPostPopUpState); // .catch(raiseError("PostUploadDialog", true, alert("게시물 업로드에 실패했습니다.")));
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
      <DialogContent className="text-center">
        <Swiper
          // Swiper 인스턴스에 사용될 모듈들
          modules={[Pagination, Navigation]}
          // Swiper 초기화될 때 실행할 콜백 함수
          // onSwiper={(swiper: any) => console.log("Swiper 인스턴스:", swiper)}
          // 한 번에 보여줄 슬라이드 수
          slidesPerView={1}
          // 슬라이드 간의 간격(픽셀 단위)
          spaceBetween={50}
          // 네비게이션 컨트롤 활성화
          navigation={true}
          // 페이지네이션 설정
          pagination={{ type: "progressbar", clickable: true }} // 페이지네이션 도트 클릭 가능하게 설정
          noSwiping={true} // 스와이핑 방지 전체적용
          style={psd.gridStyle.mainContainer}
        >
          {/* Swiper 내의 개별 슬라이드 */}
          <SwiperSlide className="swiper-no-swiping">
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
          </SwiperSlide>
          <SwiperSlide className="swiper-no-swiping">
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
          </SwiperSlide>
          <SwiperSlide className="swiper-no-swiping">
            <p style={psd.gridStyle.inputContainer}>
              <h3 style={psd.gridStyle.infoType}>숙소 위치 입력하기</h3>
              <p>예시: 서울특별시 송파구 올림픽로 240</p>
              시/도
              <DropBoxSelect
                name="city"
                state={postState["city"]}
                onChange={onChange}
                labelName="시/도"
                labelId="city"
                id="city"
                menuItems={cities}
              />
              구/시/군/면
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
                        postState[
                          "city"
                        ] as keyof typeof AdministrativeDistricts
                      ]
                    : ["시/군을 먼저 선택해주세요"]
                }
              />
              <TextInputTag
                id="street"
                label="길(로)"
                placeholder="길을 입력해주세요."
                value={postState["street"]}
                name="street"
                onChange={onChange}
                required={true}
              />
              <TextInputTag
                id="streetNumber"
                label="번지"
                placeholder="번지를 입력해주세요."
                value={postState["streetNumber"]}
                name="streetNumber"
                onChange={onChange}
                required={true}
              />
            </p>
          </SwiperSlide>
          <SwiperSlide className="swiper-no-swiping">
            <p style={psd.gridStyle.inputContainer}>
              <h3 style={psd.gridStyle.infoType}>위치 정보가 정확한가요?</h3>
              <p>지도</p>
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
              정확하지 않다면 이전페이지에서 주소를 다시 수정해주세요. (여기에
              버튼 수정하기 버튼 추가해서 이전 슬라이더로 이동?)
            </p>
          </SwiperSlide>

          <SwiperSlide className="swiper-no-swiping">
            <p style={psd.gridStyle.inputContainer}>
              <h3 style={psd.gridStyle.infoType}>기간 및 금액</h3>
              <p>게시 날짜</p>
              <DoubleDatePicker
                dateData={postState["startEndDay"]}
                setDateData={handleStartEndDay}
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
                최소-최대 계약 가능 기간 :
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
          </SwiperSlide>
          <SwiperSlide className="swiper-no-swiping">
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
          </SwiperSlide>
          <SwiperSlide className="swiper-no-swiping">
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
          </SwiperSlide>
          <SwiperSlide className="swiper-no-swiping">
            <p style={psd.gridStyle.inputContainer}>
              <h3 style={psd.gridStyle.infoType}>방을 업로드 하시겠습니까?</h3>
              <div>
                <s.UploadButton className="ml-2" onClick={uploadPost}>
                  방 올리기
                </s.UploadButton>
              </div>
            </p>
          </SwiperSlide>
        </Swiper>
      </DialogContent>
    </DialogForm>
  );
};
