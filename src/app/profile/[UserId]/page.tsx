"use client";
import { useTitle } from "@app/_PageComponents/UseTitle";
import { UserForm } from "@app/UserType";
import { FetchGetOneUser } from "@shared/components/FetchList/FetchList";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PostListComponent } from "../me/components/UserProfile/PostListComponent";
import { UserBaseComponent } from "./Components/UserImageProfile";

function HostInfo() {
  const params = usePathname();
  const userId = params.split("/")[2];
  useTitle("호스트 프로필");

  const [userInfo, setUserInfo] = useState<UserForm>({} as UserForm);
  if (typeof userId === "string") {
    const json = FetchGetOneUser(userId, setUserInfo);

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

        <div>
          <PostListComponent userId={userInfo.user_id} guestMode={false} />
        </div>

        {/* <PostUploadDialog /> */}

        {/* <RequestListComponent /> */}
      </div>
    );
  } else {
    return <></>;
  }
}

export default HostInfo;
