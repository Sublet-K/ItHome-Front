"use client";

import styled from "styled-components";

const Layout = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 1em;
`;

export const HomeLayout = ({ children }: { children: JSX.Element }) => {
  return <Layout>{children}</Layout>;
};
