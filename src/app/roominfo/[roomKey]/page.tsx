"use client";
import { Dialog, DialogContent } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { SubletPostStore } from "@store/SubletPostStore";
import Map, { KakaoMap } from "@shared/components/Map/Map";
import * as s from "@shared/styles/Public.styles";
import { ShareDialog } from "@shared/components/Popup/Popup";
import { StyleComponent } from "@shared/components/StaticComponents/StaticComponents";
import { bookingPopUpStore } from "@store/BookingPopUpStore";
import { useSearchDateStore } from "@core/Header/store/SearchDateStore";
import {
  RoomHost,
  RoomReservation,
  RoomDetail,
  RoomPrice,
  ImageCarousel,
} from "@shared/components/RoomInfo";
import { RoomTitle } from "@shared/styles/RoomInfo.styles";
import {
  FetchGetMyUser,
  FetchLogin,
  FetchReportPost,
} from "@shared/components/FetchList/FetchList";
import DropBoxSelect from "@shared/components/Input/DropBoxSelect";
import { Post } from "@app/PostType";
import { SelectChangeEvent } from "@mui/material/Select";
import { useUserInfoStore } from "@store/UserInfoStore";
import { DialogForm } from "@shared/components/Popup/Popup";

export default function RoomInfo() {
  // 새 창에서 열릴 때 props를 못 받아와서, zustand의 전역 저장소를 사용한다.
  const { roomKey } = useParams<{ roomKey: string }>();
  const nowRoomNum = Number(roomKey);

  const [nowRoomPost, setNowRoomPost] = useState<Post | undefined>(undefined);
  const [sharePopUpState, setSharePopUpState] = useState(false);
  const [reportPopUpState, setReportPopUpState] = useState(false);
  const [reportType, setReportType] = useState("");
  const { post, postExist, postAll } = SubletPostStore();
  const { page, asyncGetPost, asyncGetPostAll } = SubletPostStore();

  useEffect(() => {
    if (!postExist) {
      asyncGetPostAll();
    }
    setNowRoomPost(postAll.find((post) => post.key === nowRoomNum));
  }, [postExist]);

  //페이지 이동 부분
  // const navigate = useNavigate();
  const { setStartDay, setEndDay, setDayPay, setTotalPay, setPostKey } =
    bookingPopUpStore((state) => ({
      setStartDay: state.setTempStartDayState,
      setEndDay: state.setTempEndDayState,
      setDayPay: state.setDayPayState,
      setTotalPay: state.setTotalPayState,
      setPostKey: state.setPostKey,
    }));
  const { searchDate } = useSearchDateStore();
  const { userInfo } = useUserInfoStore();
  // const IsLogin = async () => {
  //   const json = FetchIsLogin(setUserInfo);

  //   if (json.statusCode === 403) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };
  const moveToBooking = () => {
    //로그인 되어 있으면 booking.js로 넘기고, 로그인이 안 되어 있으면 로그인 모달 창 띄우기
    //console.log(IsLogin()); //몰루겟다
    // console.log(
    //   IsLogin().then((result) => {
    //     return result;
    //   })
    // );
    // if (IsLogin().then((result) => { return result; })) {
    //   setStartDay(searchDate[0]);
    //   setEndDay(searchDate[1]);
    //   setDayPay(nowRoomPost.price);
    //   setTotalPay(nowRoomPost.price * getDateDiff(searchDate[0], searchDate[1]));
    //   setPostKey(nowRoomNum);
    //   navigate(`/booking`);
    // } else {
    //   alert('로그인이 필요합니다.');
    // }
  };

  const handleReportTypeState = (event: SelectChangeEvent<string>) => {
    setReportType(event.target.value);
  };

  const handleReportPopUpState = () => {
    setReportPopUpState(false);
  };

  return (
    <>
      <ImageCarousel>
        {postExist &&
          postAll
            .find((post) => post.key == nowRoomNum)
            ?.image_id.map((image_id, index) => (
              <img
                key={index}
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/public/${image_id}.jpg`}
                alt={`image ${index}`}
                className="h-full object-cover m-auto"
              />
            ))}
      </ImageCarousel>

      {postExist && nowRoomPost && (
        <>
          <div>
            <span>
              <s.NormalButton
                onClick={() => {
                  setSharePopUpState(true);
                }}
              >
                공유하기
              </s.NormalButton>
              <s.RedNormalButton
                onClick={() => {
                  setReportPopUpState(true);
                }}
              >
                신고하기
              </s.RedNormalButton>
            </span>
            <Dialog
              open={sharePopUpState}
              className="border border-gray-300 shadow-xl rounded-lg"
            >
              <DialogContent sx={{ height: 224 }} className="text-left">
                <form className="flot-right">
                  <s.NormalButton
                    type="button"
                    name="sharePopUpState"
                    onClick={() => {
                      setSharePopUpState(false);
                    }}
                  >
                    <StyleComponent content="CloseButton" />
                  </s.NormalButton>
                </form>

                <ShareDialog
                  description={nowRoomPost.description}
                  title={nowRoomPost.title}
                  image_id={nowRoomPost.image_id}
                  // className="clear-both"
                />
              </DialogContent>
            </Dialog>
            <DialogForm
              openState={reportPopUpState}
              handleClose={handleReportPopUpState}
              render={() => (
                <label
                  htmlFor="report_type"
                  className="block mb-2 text-sm font-medium text-gray-900 float-left"
                >
                  신고 사유
                </label>
              )}
            >
              <DialogContent
                sx={{ width: 512, height: 512 }}
                className="font-black text-center"
              >
                <div className="mt-1.5">
                  <DropBoxSelect
                    name="report_type"
                    state={reportType}
                    onChange={handleReportTypeState}
                    labelName="신고 사유"
                    labelId="report_type"
                    id="report_type"
                    menuItems={[
                      "불법 콘텐츠",
                      "차별적 행위",
                      "부정확하거나 틀린 정보",
                      "실제 숙소가 아님",
                      "사기",
                      "불쾌함",
                      "기타",
                    ]}
                  />
                </div>
                <s.RedNormalButton
                  onClick={() => {
                    if (reportType === "") {
                      alert("신고 사유를 선택해주세요.");
                      return;
                    }
                    if (userInfo.id === "") {
                      alert("로그인이 필요합니다.");
                      return;
                    }
                    FetchReportPost(userInfo.id, nowRoomNum, reportType).then(
                      () => {
                        alert("신고가 접수되었습니다.");
                      }
                    );
                    setReportPopUpState(false);
                    setReportType("");
                  }}
                >
                  신고 접수하기
                </s.RedNormalButton>
              </DialogContent>
            </DialogForm>
          </div>
          {/* {console.log(nowRoomPost)} */}

          <RoomTitle>
            {nowRoomPost.title} {`(숙소번호 : ${nowRoomNum})`}
          </RoomTitle>
          <RoomPrice nowRoomPost={nowRoomPost} />
          <RoomDetail nowRoomPost={nowRoomPost} />
          <RoomHost user={nowRoomPost.postuser} title={nowRoomPost.title} />

          <section className="mx-3 mb-6">
            <div className="text-xl font-bold">지도</div>
            <div className="items-center">
              {postExist && (
                <KakaoMap
                  x={nowRoomPost.x_coordinate}
                  y={nowRoomPost.y_coordinate}
                />
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}
