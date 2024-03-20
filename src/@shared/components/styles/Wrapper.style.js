import { styled } from 'styled-components';
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
`;

export const InputTextError = styled.input`
  ${tw`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-red-600 placeholder:text-gray-400 focus:ring-2 focus:ring-red-500 sm:text-sm sm:leading-6`}
`;

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;
