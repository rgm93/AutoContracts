import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth.jsx";
import RtlLayout from "layouts/RTL.jsx";
import AdminLayout from "layouts/Admin.jsx";

import './index.css';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "assets/scss/material-dashboard-pro-react.scss?v=1.5.0";
import 'focus-visible/dist/focus-visible.min';

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
      <Switch>
        <Route path="/auth" component={AuthLayout} />
        <Route path="/admin" component={AdminLayout} />
        <Redirect from="/" to="/auth/login" />
      </Switch>
  </Router>,
  document.getElementById("root")
);
