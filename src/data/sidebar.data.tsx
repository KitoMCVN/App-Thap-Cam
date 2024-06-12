import React, { useEffect, useState } from "react";
import { useLanguage } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faHome } from "@fortawesome/free-solid-svg-icons";

export interface SidebarDataProps {
  id?: number;
  title?: string;
  path?: string;
  icon?: JSX.Element;
  notification?: number | string;
}

export const sidebarData = (): SidebarDataProps[] => {
  const { t } = useLanguage();

  return [
    {
      id: 1,
      title: t("home"),
      path: "/",
      icon: <FontAwesomeIcon icon={faHome} />,
      notification: 2122,
    },
    {
      id: 2,
      title: t("setting"),
      path: "/",
      icon: <FontAwesomeIcon icon={faGear} />,
      notification: "new",
    },
  ];
};
