import React from "react";
import TitleBar from "./TitleBar";
import { isElectron } from "./utils/isElectron";
import Routes from "./Routes";
import Image from "./components/Image/Image";
import { useClickToCopy, useLanguage, ThemeProvider } from "./hooks";
import { Button } from "./components/Button";
import Tooltip from "./components/Tooltip/Tooltip";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <section className={`min-h-screen w-screen bg-white ${isElectron() ? "rounded-md border border-gray-900/10" : ""}`}>
        <div className="size-full">{isElectron() && <TitleBar />}</div>
        <Routes></Routes>

        <div className="size-96">
          <Image src="https://c4.wallpaperflare.com/wallpaper/448/174/357/neon-4k-hd-best-for-desktop-wallpaper-thumb.jpqg"></Image>
        </div>
      </section>
    </ThemeProvider>
  );
};

export default App;
