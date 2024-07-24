import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ReactNode } from "react";

export function BookPaymentForm({
  paySelect,
  onPaySelectHandle,
}: {
  paySelect: string;
  onPaySelectHandle: (
    event: SelectChangeEvent<string>,
    child: ReactNode
  ) => void;
}) {
  return (
    <FormControl fullWidth>
      {" "}
      <InputLabel id="demo-simple-select-label">결제 수단</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={paySelect}
        label="Payment Method"
        onChange={onPaySelectHandle}
      >
        <MenuItem value={"account"}>계좌</MenuItem>
        <MenuItem value={"card"}>카드</MenuItem>
      </Select>
    </FormControl>
  );
}
