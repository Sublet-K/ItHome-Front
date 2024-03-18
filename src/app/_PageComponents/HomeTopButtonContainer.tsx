import styled from "styled-components";
import Link from "next/link";

const Layout = styled.div`
  display: flex
  flexDirection: row
  margin: 1rem 0 1rem 0rem
  gap: 0.5rem
`;

export const HomeTopButtonContainer = () => (
  <Layout>
    <Link href="/Request">요청서 제출하기</Link>
    <Link href="/">같은 커뮤니티 확인하기</Link>
  </Layout>
);
