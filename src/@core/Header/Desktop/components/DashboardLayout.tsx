import React from "react";

const DashboardLayout = ({ href, desc }: { href: string; desc: string }) => {
  return (
    <a
      href={href}
      // className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
      className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
      aria-current="page"
    >
      {desc}
    </a>
  );
};

export default DashboardLayout;
