import { useState } from "react";
import { useTitle } from "@shared/components/hook/HookCollect";
// import { useParams } from "react-router-dom";
import { useParams } from "next/navigation";
import { UserBaseComponent } from "../Components/UserImageProfile";
import { PostListComponent } from "@app/GuestInfo/components/UserProfile/PostListComponent";
import { Wrapper } from "@shared/styles/Public.styles";
import { FetchGetOneUser } from "@shared/components/FetchList/FetchList";
import { UserForm } from "@app/UserType";

function HostInfo({ user }: { user: UserForm }) {
  const { userId } = useParams<{ userId: string }>();

  const title = user.username + "님의 프로필 | ItHome";
  // useTitle(title);
  const [userInfo, setUserInfo] = useState<UserForm | undefined>(undefined);
  FetchGetOneUser(userId, setUserInfo);
  return (
    <Wrapper>
      <div
        style={{ fontFamily: "Pretendard" }}
        className="flex grid grid-cols-7"
      >
        <div className="ml-3 mt-5">
          {userInfo && <UserBaseComponent user={userInfo} />}
        </div>

        <div className="mb-2 ml-7 col-span-6 mt-5 w-5/6">
          {userInfo && (
            <PostListComponent userId={userInfo.user_id} guestMode={false} />
          )}
        </div>
      </div>
    </Wrapper>
  );
}

export default HostInfo;
