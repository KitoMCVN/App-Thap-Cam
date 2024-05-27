import React from "react";
import TitleBar from "./TitleBar";
import { isElectron } from "./utils/isElectron";
import Routes from "./Routes";
import { useClickToCopy, useLanguage, ThemeProvider } from "./hook";
import { Button } from "./components/Button";
import { UtilsBar } from "./components/UtilsBar";
import Tooltip from "./components/Tooltip/Tooltip";

const App: React.FC = () => {
  const { t, h } = useLanguage();
  const { textAreaRef, copyToClipboard, copySuccess } = useClickToCopy(2000);

  return (
    <ThemeProvider>
      <section className={`min-h-screen w-screen bg-white ${isElectron() ? "rounded-md border border-gray-900/10" : ""}`}>
        <div className="size-full">{isElectron() && <TitleBar />}</div>
        <Routes></Routes>
        <div>
          <h1>{t("greeting")}</h1>
          <button type="button" onClick={h}>
            Đổi ngôn ngữ
          </button>
        </div>
        <UtilsBar />
        <input type="email" name="" ref={textAreaRef} id="" />
        <Button onClick={copyToClipboard}>{copySuccess ? "Copy thành công!" : "Bấm vào để copy"}</Button>
        <Button className="h1" onClick={() => console.log("Hau gay")}>
          Gay
        </Button>
        <Tooltip effect="zoom" content="Vetyeusl" timeout={99999999999999999} direction="top">
          Hí
        </Tooltip>
      </section>
    </ThemeProvider>
  );
};

export default App;
