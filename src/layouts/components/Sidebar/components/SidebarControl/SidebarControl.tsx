import React from "react";
import { useTheme } from "../../../../../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../../../../../hooks/useLanguage";

interface SidebarControlProps {
  className?: string;
}
const SidebarControl: React.FC<SidebarControlProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const { h, language } = useLanguage();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div
      className={`relative z-[1] h-12 overflow-hidden rounded-lg bg-rose-100 dark:bg-neutral-700 ${className}`}
    >
      <div className="flex h-full items-center gap-x-2 p-2 text-lg">
        <div
          className="flex h-8 flex-1 cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-rose-200 dark:hover:bg-neutral-600"
          onClick={h}
        >
          <div>
            <FontAwesomeIcon icon={faLanguage} />
          </div>
          <div className="text-base">
            {language == "vi" ? "Tiếng Việt" : "Tiếng Anh"}
          </div>
        </div>
        <div
          className="flex size-8 cursor-pointer items-center justify-center rounded-md hover:bg-rose-200 dark:hover:bg-neutral-600"
          onClick={toggleTheme}
        >
          {theme == "light" ? (
            <FontAwesomeIcon icon={faSun} />
          ) : (
            <FontAwesomeIcon icon={faMoon} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarControl;
