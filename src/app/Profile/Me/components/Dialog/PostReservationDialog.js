import { DialogForm } from '@shared/components/Popup/Popup';
import { ReservationByPostKeyInfo } from '../Info/ReservationByPostKeyInfo';
import { DialogContent } from '@mui/material';

export function PostReservationDialog({
  onChange,
  reservationDialogShow,
  requestKey,
}) {
  return (
    <DialogForm
      openState={reservationDialogShow}
      handleClose={onChange}
      name="reservationDialogShow"
      render={() => (
        <label
          htmlFor="test"
          className="block mb-2 text-sm font-medium text-gray-900 float-left">
          test
        </label>
      )}>
      <DialogContent sx={{ width: 512 }} className="text-left">
        <ReservationByPostKeyInfo requestKey={requestKey} />
      </DialogContent>
    </DialogForm>
  );
}
