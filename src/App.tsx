import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TitleBar from "./TitleBar";
import { isElectron } from "./utils/isElectron";
import { ThemeProvider } from "./hooks";
import { DefaultRouter } from "./routers/router";
import "./App.scss";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <section
        className={`flex h-screen w-screen flex-col bg-white ${
          isElectron() ? "rounded-md" : ""
        }`}
      >
        <div
          id={isElectron() ? "app" : ""}
          className="h-full overflow-hidden font-['Space_Grotesk',sans-serif]"
        >
          {isElectron() && <TitleBar />}
          <Router>
            <Routes>
              {DefaultRouter.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <route.layout>
                      <route.component />
                    </route.layout>
                  }
                />
              ))}
            </Routes>
          </Router>
        </div>
      </section>
    </ThemeProvider>
  );
};

export default App;
