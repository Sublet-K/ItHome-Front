import { ContactDialog } from "@app/roominfo/[roomKey]/Components/Contact";
import { UserForm } from "@app/UserType";
import * as RS from "@shared/styles/RoomInfo.styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";

export function RoomHost({ user, title }: { user: UserForm; title: string }) {
  //추후 Host 정보 fetch로 받아오는 것으로 수정 필요
  const [popupState, setPopUpState] = useState(false);

  const clickHandler = () => {
    setPopUpState(!popupState);
  };
  const imageLink = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public_user/${user.image_id}.jpg`;
  const router = useRouter();
  const MoveToProfileInfo = () => {
    // 일단 방 정보 넘김과 동시에 방 정보 페이지로 이동.

    router.push(`/profile/${user.user_id}`);

    //   room: room.Post,
    // });
  };
  return (
    <RS.RoomInfoSection>
      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md">
        <div className="flex-shrink-0">
          <div
            style={{ width: "130px", height: "130px", position: "relative" }}
          >
            <Image
              loader={() => imageLink}
              src={imageLink}
              className="rounded-full"
              layout="fill"
              objectFit="contain stroke-gray-50	"
              alt="호스트 프로필"
            />
          </div>
        </div>

        <div>
          <div className="text-2xl font-bold">
            <a
              href=""
              onClick={() => {
                MoveToProfileInfo();
              }}
            >
              {user.username}
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={clickHandler}
        name="contactPopUpState"
        className="w-full rounded-lg bg-gray-300 text-black p-1"
      >
        문의하기
      </button>
      <ContactDialog
        setPopUpState={setPopUpState}
        clickHandler={clickHandler}
        popUpState={popupState}
        user_contact={user.email}
        title={title}
      />
    </RS.RoomInfoSection>
  );
}
