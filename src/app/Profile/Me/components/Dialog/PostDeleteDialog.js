import { DialogForm } from '@shared/components/Popup/Popup';
import { DeleteButton } from '@shared/components/styles/Public.styles';
import { DialogActions, DialogContent } from '@mui/material';

export const PostDeleteDialog = ({
  onChange,
  deletelDialogShow,
  requestKey,
}) => {
  return (
    <DialogForm
      openState={deletelDialogShow}
      handleClose={onChange}
      name="deletelDialogShow"
      render={() => (
        <label
          htmlFor="test"
          className="block mb-2 text-sm font-medium text-gray-900 float-left">
          test
        </label>
      )}>
      <DialogContent className="font-black text-center">
        <p className="text-lg font-extrabold ">게시글을 삭제하시겠습니까?</p>
        <p className="text-sm font-thin mt-1 float-left">
          삭제를 하실 경우 과거 예약정보까지 전부 사라짐을 동의합니다.
        </p>
      </DialogContent>
      <DialogActions>
        <div>
          <form>
            <DeleteButton onClick={() => FetchDeletePost(requestKey)}>
              삭제하기
            </DeleteButton>
          </form>
        </div>
      </DialogActions>
    </DialogForm>
  );
};
