import React from "react";

// `children`을 명시적으로 React.ReactNode로 타입을 지정
type DashboardItemProps = {
  children: React.ReactNode;
  clickedState: boolean;
};

const DashboardItem: React.FC<DashboardItemProps> = ({
  children,
  clickedState,
}: DashboardItemProps) => {
  return (
    <div
      className={`rounded-md px-6 py-3 relative ${
        clickedState
          ? "text-white bg-black"
          : "bg-transparent text-black hover:bg-gray-200"
      }`}
    >
      {children}
    </div>
  );
};

export default DashboardItem;
