import styled from 'styled-components';
import tw from 'twin.macro';

export const SecondHead = styled.h2`
  ${tw`text-xl font-extrabold`}
`;
export const LinkHead = styled.a`
  ${tw`text-xl font-extrabold`}
`;
export const Horizon = styled.hr`
  ${tw`h-px bg-gray-200 border-0 clear-both`}
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
  display: flex;
  justify-content: center;
`;

export const DeleteButton = styled.button`
  position: relative;
  margin-right: 12px;
  float: right;
  ${tw`bg-[#F62424] hover:bg-red-700 text-white font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded-lg`}
`;

export const NormalButton = styled.button`
  &:hover {
    background-color: rgb(156 163 175);
    color: rgb(17 24 39);
  }
  ${tw`bg-black clear-both float-end text-white font-semibold py-1 px-2 border border-gray-200 shadow-xl rounded-lg`}
`;

export const DisableButton = styled.button`
  ${tw`bg-gray-400 float-end text-black font-semibold py-1 px-2 border border-gray-200 shadow-xl rounded-lg`}
`;

export const InfoButton = styled.button`
  ${tw`bg-white hover:bg-gray-100 text-black font-semibold py-2 px-4 border border-gray-200 shadow-xl rounded-lg`}
`;

export const Checkbox = styled.input`
  ${tw`mr-1 w-4 h-4 text-blue-600`}
`;

export const ImageUploadButton = styled.button`
  display: flex;
  align-items: center;
  ${tw`shadow-xl rounded-lg ml-4`}
`;

export const Label = styled.label`
  ${tw`block mb-0.5 text-sm font-semibold text-gray-900`}
`;
export const Image = styled.img`
  ${tw`shadow-xl rounded-lg ml-4`}
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
  ${`flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1`}
`;
export const Span = styled.span``;
