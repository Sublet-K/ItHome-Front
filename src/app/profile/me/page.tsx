"use client";
import { useTitle } from "@shared/components/hook/HookCollect.js";
import { LoginContent } from "@shared/components/loginComponents/LoginContent";
import { useUserInfoStore } from "@store/UserInfoStore";
import { UserBaseComponent } from "./components/UserImageProfile";
import { PostListComponent } from "./components/UserProfile/PostListComponent";
import { UserPrivateComponent } from "./components/UserProfile/UserPrivateComponent";

function GuestInfo() {
  const { userInfo, userExist } = useUserInfoStore();

  useTitle("내 프로필");
  return (
    <>
      {userExist ? (
        <div
          style={{
            fontFamily: "Pretendard",
          }}
        >
          {" "}
          <UserBaseComponent user={userInfo} />
          <hr className="my-4" />
          <UserPrivateComponent user={userInfo} />
          <hr className="my-4" />
          <PostListComponent userId={userInfo.user_id} />
          {/* <PostUploadDialog /> */}
          {/* <RequestListComponent /> */}
        </div>
      ) : (
        <div className="flex mt-4 items-center justify-end sm:static sm:inset-auto sm:ml-6">
          <LoginContent setPopUpState={undefined} />
        </div>
      )}
    </>
  );
}

export default GuestInfo;
