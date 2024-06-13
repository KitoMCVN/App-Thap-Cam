import React from "react";
import { SidebarLinks } from "./components/SidebarLinks";

const Sidebar: React.FC = () => {
  return (
    <div className="w-72 rounded-lg bg-rose-50 p-3 text-rose-950">
      <SidebarLinks></SidebarLinks>
    </div>
  );
};

export default Sidebar;
