import React from 'react';
import * as inputStyle from './styles/Input.styles.js';
import { priceToString } from '@shared/components/StaticComponents/StaticComponents.js';

export const SingleValueViewer = ({ value }) => {
  return (
    <inputStyle.displayFilteringValueWhenModifyingFilter>
      <span>{value}</span>
    </inputStyle.displayFilteringValueWhenModifyingFilter>
  );
};

export const ValueRangeViewer = ({ arr }) => {
  return (
    <inputStyle.displayFilteringValueWhenModifyingFilter>
      <span>{arr[0]}</span>
      <span>~</span>
      <span>{arr[1]}</span>
    </inputStyle.displayFilteringValueWhenModifyingFilter>
  );
};

export const MoneyRangeViewer = ({ arr }) => {
  return (
    <inputStyle.displayFilteringValueWhenModifyingFilter>
      <span>₩{priceToString(arr[0])}</span>
      <span>~</span>
      <span>₩{priceToString(arr[1])}</span>
    </inputStyle.displayFilteringValueWhenModifyingFilter>
  );
};
