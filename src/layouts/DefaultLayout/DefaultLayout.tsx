import React, { ReactNode } from "react";
import { Navbar } from "../components/Navbar";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DefaultLayout;
