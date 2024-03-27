"use client";
import { useState } from "react";
import { useTitle } from "@shared/components/hook/HookCollect.js";
import { PostUploadDialog } from '@shared/components/Popup/Popup';

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
        style={{ fontFamily: "Pretendard" }}
        className="flex grid grid-cols-7"
      >
        <div className="ml-3 mt-5">
          <UserBaseComponent user={userInfo} />
        </div>

        <div className="mb-2 ml-7 col-span-6 mt-5 w-5/6">
          <ReservationInfo />
          <Horizon className="my-y" />

          <UserPrivateComponent user={userInfo} />
          <Horizon className="mt-4 md-2" />

          <PostListComponent userId={userInfo.user_id} />
          <PostUploadDialog />
          <Horizon className="my-2" />

          <RequestListComponent />
        </div>
      </div>
    </Wrapper>
  );
}

export default GuestInfo;
