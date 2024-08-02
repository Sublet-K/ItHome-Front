import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

const CustomSlider = styled(Slider)({
  color: "black", // 슬라이더 색상을 검은색으로 설정
  "& .MuiSlider-thumb": {
    boxShadow: "none", // 애니메이션 효과 제거
    "&:hover, &.Mui-focusVisible, &.Mui-active": {
      boxShadow: "none", // 애니메이션 효과 제거
    },
  },
  "& .MuiSlider-rail": {
    color: "black", // 레일 색상을 검은색으로 설정
  },
  "& .MuiSlider-track": {
    color: "black", // 트랙 색상을 검은색으로 설정
  },
});

export const DoubleSlideInput = ({
  value,
  name = "",
  onChange,
  minMax,
  step,
}: {
  value: [number, number];
  name: string;
  onChange: (event: Event, value: number[]) => void;
  minMax: [number, number];
  step: number;
}) => {
  return (
    <CustomSlider
      value={value}
      name={name}
      onChange={onChange as (event: Event, value: number | number[]) => void}
      valueLabelDisplay="off"
      min={minMax[0]}
      max={minMax[1]}
      step={step}
    />
  );
};
