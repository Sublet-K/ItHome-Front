import { TextField } from '@mui/material';

export function AccountPayment() {
  return (
    <div className="mt-2">
      <form className="bg-white border-solid border-2 border-gray-200 rounded px-8 pt-1 pb-8 mb-4">
        <TextField
          id="standard-size-small"
          size="small"
          label="성함"
          variant="standard"
        />
        <div className="mt-2"></div>
        <TextField
          id="standard-size-small"
          size="small"
          label="계좌번호"
          variant="standard"
        />
      </form>
    </div>
  );
}
