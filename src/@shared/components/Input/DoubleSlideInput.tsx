import React from "react";
import { Slider } from "@mui/material";

export const DoubleSlideInput = ({
  value,
  name = "",
  onChange,
  minMax,
}: {
  value: [number, number];
  name: string;
  onChange: (event: Event, value: number[]) => void;
  minMax: [number, number];
}) => {
  return (
    <Slider
      value={value}
      name={name}
      onChange={onChange as (event: Event, value: number | number[]) => void}
      valueLabelDisplay="off"
      min={minMax[0]}
      max={minMax[1]}
    />
  );
};
