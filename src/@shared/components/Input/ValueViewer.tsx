import * as inputStyle from "../../styles/Input.styles";
import { priceToString } from "../StaticComponents/StaticComponents";

export const SingleValueViewer = ({ value }: { value: string }) => {
  return (
    <inputStyle.displayFilteringValueWhenModifyingFilter className="float-left">
      <p className="font-light text-lg">{value}</p>
    </inputStyle.displayFilteringValueWhenModifyingFilter>
  );
};

export const ValueRangeViewer = ({
  arr,
}: {
  arr: [number, number] | [string, string];
}) => {
  return (
    <p className="font-light text-gray-900">
      <span>{arr[0]}</span>
      <span>~</span>
      <span>{arr[1]}</span>
    </p>
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
