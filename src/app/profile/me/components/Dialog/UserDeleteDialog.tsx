import { DialogActions, DialogContent } from "@mui/material";
import { FetchDeleteUser } from "@shared/components/FetchList/FetchList";
import { DialogForm } from "@shared/components/Popup/Popup";
import { DeleteButton } from "@shared/styles/Public.styles";
import { guestInfoPopUpStore } from "@store/GuestInfoStore";
import { useUserInfoStore } from "@store/UserInfoStore";
import { useUserLikeStore } from "@store/UserLikeStore";
import { useState } from "react"; // useState를 사용하기 위해 추가

export const UserDeleteDialog = ({ userId }: { userId: string }) => {
  const { deleteUserPopUpState, setDeleteUserPopUpState } = guestInfoPopUpStore(
    (state) => ({
      deleteUserPopUpState: state.deleteUserPopUpState,
      setDeleteUserPopUpState: state.setDeleteUserPopUpState,
    })
  );

  const { resetUserInfo } = useUserInfoStore();
  const { resetLikePostId } = useUserLikeStore();

  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true); // 로딩 상태 시작

    try {
      await FetchDeleteUser({
        resetUserInfo,
        resetLikePostId,
        userId,
      });

      // 삭제 완료 후 새로고침
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  return (
    <DialogForm
      openState={deleteUserPopUpState}
      handleClose={setDeleteUserPopUpState}
      name="deletelDialogShow"
      render={() => (
        <label
          htmlFor=""
          className="block mb-2 text-sm font-medium text-gray-900 float-left"
        ></label>
      )}
    >
      <DialogContent className="font-black text-center">
        <p className="text-lg font-extrabold">정말 탈퇴하시겠어요?</p>
        <p className="text-sm font-light mt-1 float-left">
          탈퇴 버튼 선택시, 계정은 삭제되며 복구되지 않습니다.
        </p>
        {isLoading && ( // 로딩 중일 때만 표시
          <p className="text-sm font-light mt-1 text-red-500">
            삭제중입니다...
          </p>
        )}
      </DialogContent>
      <DialogActions className="w-full">
        <div>
          <DeleteButton onClick={handleDelete} disabled={isLoading}>
            {" "}
            {/* 로딩 중에는 버튼 비활성화 */}
            삭제하기
          </DeleteButton>
        </div>
      </DialogActions>
    </DialogForm>
  );
};
