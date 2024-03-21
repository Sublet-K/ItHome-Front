import { DialogForm } from '@shared/components/Popup/Popup';
import { DialogContent } from '@mui/material';
import { RequestByPostKeyInfo } from '../Info/RequestByPostKeyInfo';

export const RequestRespondDialog = ({
  respondPopUpState,
  onChange,
  request,
}) => {
  return (
    <DialogForm
      openState={respondPopUpState}
      handleClose={onChange}
      name="respondPopUpState"
      render={() => (
        <label
          htmlFor="test"
          className="block mb-2 text-sm font-medium text-gray-900 float-left">
          test
        </label>
      )}>
      <DialogContent className="text-left">
        {request.Post.length > 0 ? (
          <RequestByPostKeyInfo Post={request.Post} />
        ) : (
          <p>아직 매칭이 되지 않았습니다.</p>
        )}
      </DialogContent>
    </DialogForm>
  );
};
