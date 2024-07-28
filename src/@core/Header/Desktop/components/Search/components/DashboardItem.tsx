import React from "react";

// `children`을 명시적으로 React.ReactNode로 타입을 지정
type DashboardItemProps = {
  children: React.ReactNode;
};

const DashboardItem: React.FC<DashboardItemProps> = ({ children }) => {
  return (
    <div className="rounded-md hover:bg-gray-200 px-6 py-3 relative">
      {children}
    </div>
  );
};

export default DashboardItem;
