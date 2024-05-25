import React, { ReactNode } from "react";
import { Navbar } from "../components/Navbar";
import useHover from "../../hook/useHover";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  const [hovered, eventHandlers] = useHover();

  return (
    <div>
      <div>
        <Navbar></Navbar>
      </div>
      <div>{children}</div>
      <div {...eventHandlers} className={`w-64 h-64 flex items-center justify-center cursor-pointer select-none ${hovered ? "bg-blue-300" : "bg-gray-300"}`}>
        {hovered ? "Hovered!" : "Hover over me!"}
      </div>
    </div>
  );
};

export default DefaultLayout;
