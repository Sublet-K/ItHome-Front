import React from 'react';
import { Slider } from '@mui/material';

export const DoubleSlideInput = ({ value, name = '', onChange, minMax }) => {
  return (
    <Slider
      value={value}
      name={name}
      onChange={onChange}
      valueLabelDisplay="off"
      min={minMax[0]}
      max={minMax[1]}
    />
  );
};
