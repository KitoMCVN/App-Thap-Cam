import React from "react";
import { useLanguage } from "../../../hooks";

const Navbar: React.FC = () => {
  const { t, h } = useLanguage();
  return (
    <div>
      <h1>Navbar</h1>
      <h1 className="bg-red-900">{t("farewell")}</h1>
    </div>
  );
};

export default Navbar;
