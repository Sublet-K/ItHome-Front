"use client";
import { UserForm } from "@app/UserType";
import { FetchGetOneUser } from "@shared/components/FetchList/FetchList";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PostListComponent } from "../me/components/UserProfile/PostListComponent";
import { UserBaseComponent } from "./Components/UserImageProfile";

function HostInfo() {
  const params = usePathname();
  const userId = params.split("/")[2];
  if (typeof userId === "string") {
    const [userInfo, setUserInfo] = useState<UserForm>({} as UserForm);
    FetchGetOneUser(userId, setUserInfo);
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
          <PostListComponent userId={userInfo.user_id} />
        </div>

        {/* <PostUploadDialog /> */}

        {/* <RequestListComponent /> */}
      </div>
    );
  } else {
    return <></>;
  }
  // useTitle(title);
}

export default HostInfo;
