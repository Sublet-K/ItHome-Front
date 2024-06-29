import styled from "styled-components";
import Link from "next/link";
import tw from "twin.macro";

const Layout = styled.div`
  display: flex
  flexDirection: row
  margin: 1rem 0 1rem 0rem
  gap: 0.5rem
`;

// 모르긴 몰라도 NormalButton (@/app/_PageComponents/NormalButton.ts)에 있는 내용을 그대로 넣었음
const LinkLayout = styled(Link)`
  &:hover {
    background-color: rgb(156 163 175);
    color: rgb(17 24 39);
  }
  ${tw`bg-black clear-both float-end text-white font-semibold py-1 px-2 border border-gray-200 shadow-xl rounded-lg`}
`;
