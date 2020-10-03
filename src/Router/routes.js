import React from "react";
import { Switch, Route } from "react-router-dom";
import App from "../components/App";
import Login from "../components/Login";
import Classroom from "../components/Classroom";

const Routes = () => {
  return (
      <Switch>
          <Route path="/" exact component={App} />
          <Route path="/login" exact component={Login} />
          <Route path="/:user/classroom/:code" render={props => <Classroom {...props} />}/>
      </Switch>
  );
};

export default Routes;
