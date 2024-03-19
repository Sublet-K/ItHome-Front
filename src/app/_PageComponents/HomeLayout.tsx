"use client";

import styled from "@emotion/styled";

const Layout = styled.div`
  marginBottom: '10rem'
  display: 'flex'
  flexDirection: 'column'
  alignItems: 'center'
  width: 'auto'
`;

export const HomeLayout = ({
  children,
}: {
  children: (JSX.Element | string)[];
}) => {
  return <Layout>{children}</Layout>;
};
