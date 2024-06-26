import React from "react";
import { SidebarLinks } from "./components/SidebarLinks";
import { SidebarControl } from "./components/SidebarControl";
import { SidebarAccount } from "./components/SidebarAccount";

const Sidebar: React.FC = () => {
  return (
    <div className="flex min-w-64 flex-col rounded-lg bg-rose-50 p-3 text-rose-950 dark:bg-neutral-800 dark:text-rose-50">
      <SidebarAccount></SidebarAccount>
      <SidebarLinks className="flex-1"></SidebarLinks>
      <SidebarControl className=""></SidebarControl>
    </div>
  );
};

export default Sidebar;
