import { useState } from "react";
import { useTitle } from "@shared/components/hook/HookCollect.js";
import { useParams } from "next/navigation";
import { UserBaseComponent } from "./Components/UserImageProfile.js";
import { Wrapper } from "@shared/styles/Public.styles.js";
import { FetchGetOneUser } from "@shared/components/FetchList/FetchList.js";
import { UserForm } from "@app/UserType.js";
import { PostListComponent } from "../Me/components/UserProfile/PostListComponent.jsx";

function HostInfo({ user }: { user: UserForm }) {
  const { userId }: { userId: string } = useParams();

  const title = user.username + "님의 프로필 | ItHome";
  // useTitle(title);
  const [userInfo, setUserInfo] = useState<UserForm>({} as UserForm);
  FetchGetOneUser(userId, setUserInfo);
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
}

export default HostInfo;
