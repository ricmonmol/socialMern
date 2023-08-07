import React from "react";
import { Route, Routes } from "react-router";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import Users from "./user/Users";
import Profile from "./user/Profile";

const MainRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/api/users" element={<Users />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/api/users/:userId" element={<Profile />} />
    </Routes>
  );
};

export default MainRouter;
