import { useLanguage } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons"; // Import the icon you need
import React from "react";

export interface SidebarDataProps {
  id?: number;
  title?: string;
  path?: string;
  icon?: string;
}

export const sidebarData = (): SidebarDataProps[] => {
  const { t } = useLanguage();

  return [
    {
      id: 1,
      title: t("home"),
      path: "/",
      icon: "faHouse",
    },
  ];
};
