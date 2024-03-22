import useMediaQuery from '@mui/material/useMediaQuery';

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery('(max-width:743px)');
  return isMobile ? children : null;
};
export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery('(min-width:744px)');
  return isDesktop ? children : null;
};
