import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const DropBoxSelect = ({
  state,
  name = '',
  onChange,
  labelName,
  labelId,
  id,
  menuItems,
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
          onChange={onChange}>
          {menuItems.map(item => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DropBoxSelect;
