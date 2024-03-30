import React from "react";
import * as inputStyle from "../../styles/Input.styles";
import { priceToString } from "../StaticComponents/StaticComponents";

export const SingleValueViewer = ({ value }: { value: string }) => {
  return (
    <inputStyle.displayFilteringValueWhenModifyingFilter>
      <span>{value}</span>
    </inputStyle.displayFilteringValueWhenModifyingFilter>
  );
};

export const ValueRangeViewer = ({ arr }: { arr: [number, number] | [string, string] }) => {
  return (
    <inputStyle.displayFilteringValueWhenModifyingFilter>
      <span>{arr[0]}</span>
      <span>~</span>
      <span>{arr[1]}</span>
    </inputStyle.displayFilteringValueWhenModifyingFilter>
  );
};

export const MoneyRangeViewer = ({ arr }: { arr: [number, number] }) => {
  return (
    <inputStyle.displayFilteringValueWhenModifyingFilter>
      <span>₩{priceToString(arr[0])}</span>
      <span>~</span>
      <span>₩{priceToString(arr[1])}</span>
    </inputStyle.displayFilteringValueWhenModifyingFilter>
  );
};
