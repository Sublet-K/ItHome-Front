"use client";
import { useTitle } from "@shared/components/hook/HookCollect.js";
import { useUserInfoStore } from "@store/UserInfoStore";
import { UserBaseComponent } from "./components/UserImageProfile";
import { PostListComponent } from "./components/UserProfile/PostListComponent";
import { UserPrivateComponent } from "./components/UserProfile/UserPrivateComponent";

function GuestInfo() {
  const { userInfo } = useUserInfoStore();

  useTitle("프로필");
  return (
    <div
      style={{
        fontFamily: "Pretendard",
      }}
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
