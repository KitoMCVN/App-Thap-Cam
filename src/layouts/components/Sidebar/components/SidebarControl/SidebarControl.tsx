import React from "react";
import { useTheme } from "../../../../../hooks";
import { Button } from "../../../../../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

interface SidebarControlProps {
  className?: string;
}
const SidebarControl: React.FC<SidebarControlProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={`relative z-[1] mb-2 h-12 overflow-hidden rounded-lg bg-rose-100 dark:bg-neutral-700 ${className}`}
    >
      <Button onClick={toggleTheme}>
        {theme == "light" ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
      </Button>
    </div>
  );
};

export default SidebarControl;
