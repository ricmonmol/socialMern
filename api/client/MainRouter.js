import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";

const MainRouter = () => {
  return (
    <Switch>
      <Route exact path="/" Component={Home} />
    </Switch>
  );
};

export default MainRouter;
