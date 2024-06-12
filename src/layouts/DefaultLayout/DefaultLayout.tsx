import React, { ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";

interface DefaultLayoutProps {
  children: ReactNode;
}
const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div className="flex-warp flex h-full gap-5 p-5">
      <Sidebar></Sidebar>
      <div className="h-full w-full rounded-lg bg-rose-50 p-5">{children}</div>
    </div>
  );
};

export default DefaultLayout;
