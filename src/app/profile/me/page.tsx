"use client";
import { useState } from "react";
import { useTitle } from "@shared/components/hook/HookCollect.js";
// import { PostUploadDialog } from '@shared/components/Popup/Popup';

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
    <div style={{ fontFamily: "Pretendard" }}>
      <div className="w-20 h-20">
        <UserBaseComponent user={userInfo} />
        <Horizon className="my-2" />
      </div>

      <div className="clear-both">
        <ReservationInfo />
        <Horizon className="my-2" />
      </div>
      <div className="clear-both">
        <UserPrivateComponent user={userInfo} />
        <Horizon className="my-4 md-2" />
      </div>
      <div className="clear-both">
        <PostListComponent userId={userInfo.user_id} />
        {/* <PostUploadDialog /> */}
        <Horizon className="my-2" />
      </div>
      <div className="clear-both">
        <RequestListComponent />
      </div>
    </div>
  );
}

export default GuestInfo;
