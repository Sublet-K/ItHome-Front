import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export function BookPaymentForm({ paySelect, onPaySelectHandle }) {
  return (
    <FormControl fullWidth>
      {' '}
      여기서 에러 하나 있음
      <InputLabel id="demo-simple-select-label">결제 수단</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={paySelect}
        label="Payment Method"
        onChange={onPaySelectHandle}>
        <MenuItem value={'account'}>계좌</MenuItem>
        <MenuItem value={'card'}>카드</MenuItem>
      </Select>
    </FormControl>
  );
}
