import React from "react";
import TitleBar from "./TitleBar";
import { isElectron } from "./utils/isElectron";
import Routes from "./Routes";

const App: React.FC = () => {
  return (
    <div className={`min-h-screen w-screen bg-white ${isElectron() ? "rounded-md border border-gray-900/10" : ""}`}>
      <div className="size-full">{isElectron() && <TitleBar />}</div>
      <Routes></Routes>
    </div>
  );
};

export default App;
