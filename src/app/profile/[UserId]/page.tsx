"use client";
import { useState } from "react";
import { useTitle } from "@shared/components/hook/HookCollect";
import { usePathname } from "next/navigation";
import { UserBaseComponent } from "./Components/UserImageProfile";
import { Wrapper } from "@shared/styles/Public.styles";
import { FetchGetOneUser } from "@shared/components/FetchList/FetchList";
import { UserForm } from "@app/UserType";
import { PostListComponent } from "../me/components/UserProfile/PostListComponent";

function HostInfo() {
  const params = usePathname();
  const userId = params.split("/")[2];
  if (typeof userId === "string") {
    const [userInfo, setUserInfo] = useState<UserForm>({} as UserForm);
    FetchGetOneUser(userId, setUserInfo);
    const title = userInfo.username + "님의 프로필 | ItHome";
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
            <PostListComponent userId={userInfo.user_id} guestMode={false} />
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
