import React, { useEffect, useState } from "react";
import { useLanguage } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMessage } from "@fortawesome/free-solid-svg-icons";

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
    },
    {
      id: 2,
      title: t("ai-chat"),
      path: "/setting",
      icon: <FontAwesomeIcon icon={faMessage} />,
      notification: "new",
    },
  ];
};
