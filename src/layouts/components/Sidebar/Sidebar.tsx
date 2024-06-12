import React from "react";
import { sidebarData, SidebarDataProps } from "../../../data/sidebar.data";
import { SidebarItem } from "./components/SidebarLink";

const Sidebar: React.FC<SidebarDataProps> = () => {
  const SidebarData = sidebarData();

  return (
    <div className="rounded-lg bg-rose-50 p-3 text-rose-950">
      {SidebarData.map((item) => (
        <SidebarItem
          key={item.id}
          path={item.path}
          title={item.title}
          icon={item.icon}
          notification={item.notification}
        ></SidebarItem>
      ))}
    </div>
  );
};

export default Sidebar;
