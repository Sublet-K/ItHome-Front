"use client";

import styled from "styled-components";
import Link from "next/link";
import { NormalButton } from "@shared/styles/Public.styles";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 0 1rem 0;
  gap: 0.5rem;
`;

export const HomeTopButtonContainer = ({
  isLogined,
}: {
  isLogined: boolean;
}) => (
  <Layout>
    <NormalButton>
      <Link href="/Request">요청서 제출하기</Link>
    </NormalButton>
    <NormalButton>
      <Link href="/">같은 커뮤니티 확인하기</Link>
    </NormalButton>
  </Layout>
);
