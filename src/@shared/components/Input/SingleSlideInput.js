import React from 'react';
import Slider from '@mui/material/Slider';

export const SingleSlideInput = ({ name = '', value, onChange, minMax }) => {
  return (
    <Slider
      name={name}
      value={value}
      onChange={onChange}
      valueLabelDisplay="off"
      min={minMax[0]}
      max={minMax[1]}
    />
  );
};
