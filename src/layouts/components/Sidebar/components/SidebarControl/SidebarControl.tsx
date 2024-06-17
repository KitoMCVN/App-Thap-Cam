import React from "react";
import { useTheme } from "../../../../../hooks";
import { Button } from "../../../../../components/Button";

interface SidebarControlProps {
  className?: string;
}
const SidebarControl: React.FC<SidebarControlProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  console.log(theme);
  return (
    <div
      className={`relative z-[1] mb-2 h-12 overflow-hidden rounded-lg bg-rose-100 dark:bg-neutral-700 ${className}`}
    >
      <Button onClick={toggleTheme}>Ngu vcl</Button>
    </div>
  );
};

export default SidebarControl;
