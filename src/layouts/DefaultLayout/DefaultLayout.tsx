import React, { ReactNode } from "react";
import { Sidebar } from "../components/Sidebar";

interface DefaultLayoutProps {
  children: ReactNode;
}
const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div>
      <Sidebar id={0}></Sidebar>
      <div>{children}</div>
    </div>
  );
};

export default DefaultLayout;
