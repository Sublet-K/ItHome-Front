import React from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

const CustomSlider = styled(Slider)({
  color: "black",
  transition: "none", // 애니메이션 효과 제거
  "& .MuiSlider-thumb": {
    "&:hover, &.Mui-focusVisible, &.Mui-active": {
      boxShadow: "none", // 애니메이션 효과 제거
    },
  },
  "& .MuiSlider-rail": {
    color: "black",
  },
  "& .MuiSlider-track": {
    color: "black",
  },
});

export const SingleSlideInput = ({
  name = "",
  value,
  onChange,
  minMax,
}: {
  name: string;
  value: number;
  onChange: (event: Event, value: number | number[]) => void;
  minMax: [number, number];
}) => {
  return (
    <CustomSlider
      name={name}
      value={value}
      onChange={onChange}
      valueLabelDisplay="off"
      min={minMax[0]}
      max={minMax[1]}
    />
  );
};
