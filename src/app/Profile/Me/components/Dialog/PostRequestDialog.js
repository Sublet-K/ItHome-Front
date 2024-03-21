import { FetchGetRequestByRequestId } from '@shared/components/FetchList/FetchList';
import { DialogForm } from '@shared/components/Popup/Popup';
import { DialogContent } from '@mui/material';
import { useState } from 'react';
import { PostRequest } from '../Info/GetPostRequest';

export function PostRequestDialog({ requestDialogShow, onChange, requestKey }) {
  const [requestInfo, setRequestInfo] = useState([]);

  FetchGetRequestByRequestId(requestKey, setRequestInfo);
  return (
    <DialogForm
      openState={requestDialogShow}
      handleClose={onChange}
      name="requestDialogShow"
      render={() => (
        <label
          htmlFor="test"
          className="block mb-2 text-sm font-medium text-gray-900 float-left">
          test
        </label>
      )}>
      <DialogContent sx={{ width: 512 }} className="text-left">
        <PostRequest requestInfo={requestInfo} />
      </DialogContent>
    </DialogForm>
  );
}
