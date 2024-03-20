import { ReactNode } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const DropBoxSelect = ({
  state,
  name = "",
  onChange,
  labelName,
  labelId,
  id,
  menuItems,
}: {
  state: string;
  name: string;
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  labelName: string;
  labelId: string;
  id: string;
  menuItems: string[];
}) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id={labelId}>{labelName}</InputLabel>
        <Select
          name={name}
          labelId={labelId}
          id={id}
          value={state}
          label={labelName}
          onChange={onChange}
        >
          {menuItems.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropBoxSelect;
