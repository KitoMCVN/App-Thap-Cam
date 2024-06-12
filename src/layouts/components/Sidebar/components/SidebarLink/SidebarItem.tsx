import React from "react";
import { Link } from "react-router-dom";

interface SidebarDataProps {
  path: any;
  title: any;
  icon: string;
  notification?: JSX.Element;
}

const SidebarItem: React.FC<SidebarDataProps> = ({ path, title, icon }) => {
  return (
    <div className="mb-2 w-60 bg-red-50">
      <Link className="block" to={path}>
        <div className="flex p-5">
          <div>{title}</div>
          {icon && <div>{icon}</div>}
        </div>
      </Link>
    </div>
  );
};

export default SidebarItem;
