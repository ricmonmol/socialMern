import React from "react";
import { Route, Routes } from "react-router";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import Users from "./user/Users";

const MainRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/users" element={<Users />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/signin" element={<Signin />} />
    </Routes>
  );
};

export default MainRouter;
