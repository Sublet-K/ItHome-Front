import React from "react";

// `children`을 명시적으로 React.ReactNode로 타입을 지정
type DashboardItemProps = {
  children: React.ReactNode;
};

const MobileDashboardItem: React.FC<DashboardItemProps> = ({ children }) => {
  return (
    <div className="block rounded-md px-3 py-2 text-base font-medium font-semibold hover:bg-gray-700">
      {children}
    </div>
  );
};

export default MobileDashboardItem;
