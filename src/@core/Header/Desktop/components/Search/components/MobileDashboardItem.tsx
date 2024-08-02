import React from "react";

// `children`을 명시적으로 React.ReactNode로 타입을 지정
type DashboardItemProps = {
  children: React.ReactNode;
};

const MobileDashboardItem: React.FC<DashboardItemProps> = ({ children }) => {
  return <div className="">{children}</div>;
};

export default MobileDashboardItem;
