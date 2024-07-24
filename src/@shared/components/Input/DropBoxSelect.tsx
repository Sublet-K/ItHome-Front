import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ReactNode } from "react";

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
  return menuItems ? (
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
  ) : (
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
        ></Select>
      </FormControl>
    </Box>
  );
};

export default DropBoxSelect;
