import React from "react";
import { Route, Routes } from "react-router";
import Home from "./core/Home";

const MainRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
    </Routes>
  );
};

export default MainRouter;
