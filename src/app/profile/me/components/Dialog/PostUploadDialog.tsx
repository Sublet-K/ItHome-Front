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
import { StyleComponent } from "@shared/components/StaticComponents/StaticComponents";

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
    formData.append("city", "city");
    formData.append("gu", "gu");
    formData.append("dong", "dong");
    formData.append("street_number", "37");
    formData.append("post_code", "30");
    formData.append("street", "street");
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
