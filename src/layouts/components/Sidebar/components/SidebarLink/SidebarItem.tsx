import React from "react";
import { Link } from "react-router-dom";

export interface SidebarDataProps {
  path: any;
  title: any;
  icon: any;
  notification?: any | undefined;
}

const SidebarItem: React.FC<SidebarDataProps> = ({
  path,
  title,
  icon,
  notification,
}) => {
  const formattedNotification =
    notification === "new"
      ? "new"
      : notification
        ? new Intl.NumberFormat("en-US").format(notification)
        : undefined;

  return (
    <div className="mb-2 w-60 rounded-lg bg-red-200/50 hover:bg-rose-300">
      <Link className="block" to={path}>
        <div className="flex px-3 py-3">
          <div className="mr-2">{icon}</div>
          <div>{title}</div>
          {formattedNotification && formattedNotification !== "new" ? (
            <div className="ml-auto rounded-lg bg-rose-950 px-2 pt-[2px] text-sm text-rose-50">
              {formattedNotification}
            </div>
          ) : formattedNotification === "new" ? (
            <div className="ml-auto rounded-lg bg-yellow-600 px-2 pt-[2px] text-sm text-rose-50">
              New
            </div>
          ) : null}
        </div>
      </Link>
    </div>
  );
};

export default SidebarItem;
