import React from "react";

const MobileDashboardItem = ({
  href,
  desc,
}: {
  href: string;
  desc: string;
}) => {
  return (
    <a
      href={href}
      // ??? <- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white"
      // className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
      className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
      aria-current="page"
    >
      {desc}
    </a>
  );
};

export default MobileDashboardItem;
