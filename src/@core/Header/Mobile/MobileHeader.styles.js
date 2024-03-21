import { styled } from 'styled-components';
import tw from 'twin.macro';

export const SearchBut = styled.button`
  ${tw`align-middle select-none w-full font-extrabold transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 border border-gray-900 text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] flex rounded-3xl items-center gap-4`}
`;

export const WrapBut = styled.div`
  margin: 1rem 1rem 1rem 1rem;
`;

export const CircleIcon = styled.div`
  ${tw` w-10 h-10 grid place-items-center border rounded-full border-gray-900 ml-3 mr-5 my-3 transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-gray-900 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85]`}
`;
