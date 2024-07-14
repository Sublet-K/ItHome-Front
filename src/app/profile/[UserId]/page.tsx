"use client";
import { useState } from "react";
import { useTitle } from "@shared/components/hook/HookCollect";
import { usePathname } from "next/navigation";
import { UserBaseComponent } from "./Components/UserImageProfile";
import { Horizon, Wrapper } from "@shared/styles/Public.styles";
import { FetchGetOneUser } from "@shared/components/FetchList/FetchList";
import { UserForm } from "@app/UserType";
import { PostListComponent } from "../me/components/UserProfile/PostListComponent";

function HostInfo() {
  const params = usePathname();
  const userId = params.split("/")[2];
  if (typeof userId === "string") {
    const [userInfo, setUserInfo] = useState<UserForm>({} as UserForm);
    FetchGetOneUser(userId, setUserInfo);
    return (
      <Wrapper>
        <div
          style={{ fontFamily: "Pretendard" }}
          className="flex grid grid-cols-7"
        >
          <div
            style={{
              margin: "20px 0px 20px 0px",
            }}
          >
            <UserBaseComponent user={userInfo} />
          </div>

          <div
            style={{
              margin: "20px 0px 20px 0px",
            }}
          >
            <PostListComponent userId={userInfo.user_id} guestMode={false} />
            <Horizon />
          </div>
        </div>
      </Wrapper>
    );
  } else {
    return <></>;
  }
  // useTitle(title);
}

export default HostInfo;
