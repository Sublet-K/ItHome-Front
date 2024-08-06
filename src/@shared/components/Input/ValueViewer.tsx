import * as inputStyle from "../../styles/Input.styles";
import { priceToString } from "../StaticComponents/StaticComponents";
import React, { useState } from "react";

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
    <p className="font-light text-gray-900 text-black">
      <span>{arr[0]}</span>
      <span>~</span>
      <span>{arr[1]}</span>
    </p>
  );
};

export const MoneyRangeViewer = ({ arr }: { arr: [number, number] }) => {
  return (
    <div className="flex justify-around mt-4 mb-2 text-black">
      <span>₩{priceToString(arr[0])} / 일</span>
      <span>~</span>
      <span>₩{priceToString(arr[1])} / 일</span>
    </div>
  );
};

export const MoneyRangeViewerWithInput = ({
  arr,
  handlePriceChange,
}: {
  arr: [number, number];
  handlePriceChange: any;
}) => {
  const [localArr, setLocalArr] = useState<[number, number]>(arr);

  const handleInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(event.target.value);
      const updatedArr = [...localArr] as [number, number];
      updatedArr[index] = newValue;
      setLocalArr(updatedArr);
      handlePriceChange(event, updatedArr);
    };

  return (
    <div className="flex flex-wrap justify-around mt-4 mb-2 text-black">
      <div className="mb-4 p-4 border rounded shadow-lg">
        1일
        <div>
          ￦
          <input
            className="w-40"
            type="number"
            value={arr[0] !== 0 ? arr[0] : ""}
            placeholder="0"
            onChange={handleInputChange(0)}
          />
          <span className="flex justify-end">부터</span>
        </div>
      </div>
      <div className="mb-4 p-4 border rounded shadow-lg">
        1일
        <div>
          ￦
          <input
            className="w-40"
            type="number"
            value={arr[1] !== 0 ? arr[1] : ""}
            placeholder="0"
            onChange={handleInputChange(1)}
          />
          <span className="flex justify-end">까지</span>
        </div>
      </div>
    </div>
  );
};
