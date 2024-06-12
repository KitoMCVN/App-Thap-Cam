import React from "react";
import { sidebarData, SidebarDataProps } from "../../../data/sidebar.data";
import { SidebarItem } from "./components/SidebarLink";

const Sidebar: React.FC<SidebarDataProps> = () => {
  const SidebarData = sidebarData();

  return (
    <div className="rounded-lg bg-rose-200 p-3">
      {SidebarData.map((item) => (
        <SidebarItem path={item.path} title={item.title}></SidebarItem>
      ))}
    </div>
  );
};

export default Sidebar;
