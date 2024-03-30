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
    <div style={{ fontFamily: "Pretendard" }} className="items-center">
      <div className="my-5">
        <UserBaseComponent user={userInfo} />
        <Horizon className="my-5" />
      </div>

      <div className="my-5">
        <ReservationInfo />
        <Horizon className="my-5" />
      </div>
      <div className="">
        <UserPrivateComponent user={userInfo} />
        <Horizon className="my-5 md-2" />
      </div>
      <div className="my-5">
        <PostListComponent userId={userInfo.user_id} />
        {/* <PostUploadDialog /> */}
        <Horizon className="my-5" />
      </div>
      <div className="my-5">
        <RequestListComponent />
      </div>
    </div>
  );
}

export default GuestInfo;
