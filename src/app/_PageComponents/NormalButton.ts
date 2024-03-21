import styled from "styled-components";
import tw from "twin.macro";

export const NormalButton = styled.button`
  &:hover {
    background-color: rgb(156 163 175);
    color: rgb(17 24 39);
  }
  ${tw`bg-black clear-both float-end text-white font-semibold py-1 px-2 border border-gray-200 shadow-xl rounded-lg`}
`;
