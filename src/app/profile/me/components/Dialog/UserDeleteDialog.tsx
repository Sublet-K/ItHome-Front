import { DialogActions, DialogContent } from "@mui/material";
import { FetchDeleteUser } from "@shared/components/FetchList/FetchList";
import { DialogForm } from "@shared/components/Popup/Popup";
import { DeleteButton } from "@shared/styles/Public.styles";
import { guestInfoPopUpStore } from "@store/GuestInfoStore";
import { useUserInfoStore } from "@store/UserInfoStore";
import { useUserLikeStore } from "@store/UserLikeStore";
export const UserDeleteDialog = ({ userId }: { userId: string }) => {
  const { deleteUserPopUpState, setDeleteUserPopUpState } = guestInfoPopUpStore(
    (state) => ({
      deleteUserPopUpState: state.deleteUserPopUpState,
      setDeleteUserPopUpState: state.setDeleteUserPopUpState,
    })
  );
  const { resetUserInfo } = useUserInfoStore(); // 로그인 테스트 (true: 로그인, false: 로그아웃)
  const { resetLikePostId } = useUserLikeStore();
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
        <p className="text-lg font-extrabold ">정말 탈퇴하시겠어요?</p>
        <p className="text-sm font-light mt-1 float-left">
          탈퇴 버튼 선택시, 계정은 삭제되며 복구되지 않습니다.
        </p>
      </DialogContent>
      <DialogActions className="w-full">
        <div>
          <form>
            <DeleteButton
              onClick={() => {
                FetchDeleteUser({
                  resetUserInfo,
                  resetLikePostId,
                  userId,
                });
              }}
            >
              삭제하기
            </DeleteButton>
          </form>
        </div>
      </DialogActions>
    </DialogForm>
  );
};
