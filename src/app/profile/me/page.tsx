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
    <div
      style={{
        fontFamily: "Pretendard",
        maxWidth: "900px", // Increase the width
        margin: "0 auto",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
      }}
      className="my-10 p-5"
    >
      <div style={{ marginBottom: "20px" }}>
        <UserBaseComponent user={userInfo} />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <UserPrivateComponent user={userInfo} />
      </div>

      <div>
        <PostListComponent userId={userInfo.user_id} />
      </div>

      {/* <PostUploadDialog /> */}

      {/* <RequestListComponent /> */}
    </div>
  );
}

export default GuestInfo;
