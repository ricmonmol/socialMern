import React from "react";
import { Route, Routes } from "react-router";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Users from "./user/Users";

const MainRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/users" element={<Users />} />
      <Route exact path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default MainRouter;
