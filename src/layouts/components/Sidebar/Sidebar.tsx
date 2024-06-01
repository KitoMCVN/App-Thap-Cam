import React from "react";
import { sidebarData, SidebarDataProps } from "../../../data/sidebar.data";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../hooks";

const Sidebar: React.FC<SidebarDataProps> = () => {
  const { t, h } = useLanguage();
  const SidebarData = sidebarData();

  return (
    <div className="">
      {SidebarData.map((item) => (
        <div key={item.id}>
          <h3>{item.path && <Link to={item.path}>{item.title}</Link>}</h3>
          <p>{item.path}</p>
        </div>
      ))}
      <h1>{t("home")}</h1>
      <div onClick={h}>Chuyen nn</div>
    </div>
  );
};

export default Sidebar;
