import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DefaultRouter } from "./routers/router";
import "./App.scss";

const App: React.FC = () => {
  return (
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
  );
};

export default App;
