"use client";

import styled from "styled-components";

const Layout = styled.div`
  margin-bottom: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
`;

export const HomeLayout = ({ children }: { children: JSX.Element }) => {
  return <Layout>{children}</Layout>;
};
