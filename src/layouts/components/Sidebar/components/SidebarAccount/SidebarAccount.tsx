import React from "react";
import { NoLogin } from "./components/NoLogin";

const SiderAccount = () => {
  return (
    <div className="relative z-[1] mb-2 h-12 overflow-hidden rounded-lg bg-rose-100 p-2 dark:bg-neutral-700">
      <NoLogin></NoLogin>
    </div>
  );
};

export default SiderAccount;
