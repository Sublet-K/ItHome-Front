"use client";
import { useState } from "react";
import { useTitle } from "@shared/components/hook/HookCollect.js";
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
    <div
      style={{
        fontFamily: "Pretendard",
      }}
      className="container mx-auto px-4"
    >
      <UserBaseComponent user={userInfo} />
      <hr className="my-4" />

      <UserPrivateComponent user={userInfo} />
      <hr className="my-4" />

      <PostListComponent userId={userInfo.user_id} />

      {/* <PostUploadDialog /> */}

      {/* <RequestListComponent /> */}
    </div>
  );
}

export default GuestInfo;
