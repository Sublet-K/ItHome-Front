"use client";

import styled from "styled-components";
import tw from "twin.macro";

export const SecondHead = styled.h2`
  ${tw`text-xl font-extrabold`}
`;
export const LinkHead = styled.a`
  ${tw`text-xl font-extrabold`}
`;
export const Horizon = styled.hr`
  ${tw`h-px bg-gray-400 clear-both`}
`;
export const DetailParagraph = styled.p`
  ${tw`ml-3 font-medium`}
`;
export const InputText = styled.input`
  ${tw`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
`; // InputComponents.js 로 이동.

export const InputTextError = styled.input`
  ${tw`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-600 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 sm:text-sm sm:leading-6`}
`; // InputComponents.js 로 이동.

export const Wrapper = styled.div`
  height: 100vh;
  justify-content: center;
`;

export const DeleteButton = styled.button`
  ${tw`focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-5 py-2.5`}
`;

export const NormalButton = styled.button`
  &:hover {
    background-color: rgb(117, 118, 123);
  }
  ${tw`border p-2.5 bg-gray-800 border-black rounded-lg hover:bg-black`}
`;

export const UploadButton = styled.button`
  &:hover {
    background-color: rgb(0 51 154);
  }
  ${tw`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 items-center`}
`;
export const BlackButton = styled.button`
  &:hover {
    background-color: rgb(117, 118, 123);
  }
  ${tw`text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 items-center`}
`;

export const RedNormalButton = styled.button`
  &:hover {
    background-color: #f00;
  }
  ${tw`focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5`}
`;

export const DisableButton = styled.button`
  ${tw`text-white bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-sm`}
`;

export const InfoButton = styled.button`
  ${tw`py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100`}
`;

export const Checkbox = styled.input`
  ${tw`mr-1 w-4 h-4 text-blue-600`}
`;

export const ImageUploadButton = styled.button``;

export const Label = styled.label`
  ${tw`block mb-0.5 text-sm font-normal text-gray-900`}
`;
export const Image = styled.img`
  width: 100px;
  height: 100px;
  ${tw`shadow-xl rounded-lg`}
`;

export const SvgHoverButton = styled.button`
  ${tw`bg-white hover:bg-gray-100 text-black font-semibold float-right py-1 px-1 rounded-lg ml-4`}
`;

export const JustifyBlock = styled.div`
  ${tw`font-semibold flex justify-between`}
`;

export const PolicyText = styled.p`
  ${tw`font-light text-gray-600 text-xs`}
`;

export const NormalText = styled.p`
  ${tw`text-base font-medium`}
`;

export const FailText = styled.span`
  ${tw`flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1`}
`;
export const Span = styled.span``;

export const BoldText = styled.p`
  ${tw`text-base font-bold`}
`;

export const LargeInputText = styled.input`
  ${tw`block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500`}
`;
