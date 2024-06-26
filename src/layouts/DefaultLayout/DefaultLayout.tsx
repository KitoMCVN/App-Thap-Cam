import React, { ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";
import { isElectron } from "../../utils/isElectron";

interface DefaultLayoutProps {
  children: ReactNode;
}
const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div
      className={`flex-warp flex h-full gap-2 md:p-2 ${isElectron() ? "md:pt-5" : ""}`}
    >
      <Sidebar></Sidebar>

      <div className="h-full w-full rounded-lg bg-rose-50 p-5 dark:bg-neutral-800">
        <div className="w-full bg-[#f00] p-2">⫴</div>
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;
