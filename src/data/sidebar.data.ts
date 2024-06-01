import { useLanguage } from "../hooks";

export interface SidebarDataProps {
  id: number;
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
      icon: "home",
    },
    {
      id: 2,
      title: "hi", // Assuming you have a translation for "home2"
      path: "/",
      icon: "home",
    },
  ];
};
