import React from "react";
import { Slider } from "@mui/material";

export const DoubleSlideInput = ({
  value,
  name = "",
  onChange,
  minMax,
}: {
  value: [number, number];
  name?: string;
  onChange: (e: Event, num: number[] | number) => void;
  minMax: [number, number];
}) => {
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
