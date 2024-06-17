import React from "react";
import { SidebarLinks } from "./components/SidebarLinks";
import { SidebarControl } from "./components/SidebarControl";

const Sidebar: React.FC = () => {
  return (
    <div className="sm:flex hidden w-[73px] flex-col rounded-lg bg-rose-50 p-3 text-rose-950 md:min-w-64 dark:bg-neutral-800 dark:text-rose-50">
      <SidebarLinks className="flex-1"></SidebarLinks>
      <SidebarControl className=""></SidebarControl>
    </div>
  );
};

export default Sidebar;
