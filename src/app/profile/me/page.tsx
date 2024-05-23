"use client";
import { useState } from "react";
import { useTitle } from "@shared/components/hook/HookCollect.js";
import { PostUploadDialog } from "@shared/components/Popup/Popup";

import { RequestListComponent } from "./components/UserProfile/RequsetListComponent";
import { UserPrivateComponent } from "./components/UserProfile/UserPrivateComponent";
import { Horizon, Wrapper } from "@shared/styles/Public.styles";
import { ReservationInfo } from "./components/Info/ReservationInfo";
import { PostListComponent } from "./components/UserProfile/PostListComponent";
import { UserBaseComponent } from "./components/UserImageProfile";
import { UserForm } from "@app/UserType";
import { useUserInfoStore } from "@store/UserInfoStore";
function GuestInfo() {
  const { userInfo } = useUserInfoStore();
  // useTitle('프로필 | ItHome');
  return (
    <Wrapper>
      <div
        style={{
          fontFamily: "Pretendard",
        }}
        className="flex grid grid-cols-7"
      >
        <div
          style={{
            margin: "20px 0px 20px 0px",
          }}
        >
          <UserBaseComponent user={userInfo} />
          <Horizon />
        </div>

        <div
          style={{
            margin: "20px 0px 20px 0px",
          }}
        >
          <ReservationInfo />
          <Horizon />
        </div>
        <div
          style={{
            margin: "20px 0px 20px 0px",
          }}
        >
          <UserPrivateComponent user={userInfo} />
          <Horizon />
        </div>
        <div
          style={{
            margin: "20px 0px 20px 0px",
          }}
        >
          <PostListComponent userId={userInfo.user_id} />
          {/* <PostUploadDialog /> */}
          <Horizon />
        </div>
        <div
          style={{
            margin: "20px 0px 20px 0px",
          }}
        >
          {/* <RequestListComponent /> */}
        </div>
      </div>
    </Wrapper>
  );
}

export default GuestInfo;
