import styled from 'styled-components';
import tw from 'twin.macro';

export const InputTextCss = styled.input`
  ${tw`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
`; // InputComponents.js 로 이동.

export const InputTextErrorCss = styled.input`
  ${tw`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-600 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 sm:text-sm sm:leading-6`}
`; // InputComponents.js 로 이동.

export const displayFilteringValueWhenModifyingFilter = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1em;
  margin-bottom: 0.5em;
  color: rgba(0, 0, 0, 1);
`;
