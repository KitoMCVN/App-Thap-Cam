import React, { ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";
import { isElectron } from "../../utils/isElectron";

interface DefaultLayoutProps {
  children: ReactNode;
}
const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div
      className={`flex-warp flex h-full gap-2 p-2 ${isElectron() ? "pt-5" : ""}`}
    >
      <Sidebar></Sidebar>
      <div className="h-full w-full rounded-lg p-5 bg-rose-50 dark:bg-neutral-800">
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
