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
      <div className={`bg-white h-screen w-screen ${isElectron() ? "rounded-md" : ""}`}>
        <div className="w-screen h-dvh overflow-hidden">
          {isElectron() && (
            <div className="size-full">
              <TitleBar />
            </div>
          )}
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
      </div>
    </ThemeProvider>
  );
};

export default App;
