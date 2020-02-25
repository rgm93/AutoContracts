import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthProvider from './AuthProvider'
import AuthLayout from "layouts/Auth.jsx";
import AdminLayout from "layouts/Admin.jsx";

const Router = (props) => (
    <Switch>
      <Route path="/auth/" component={AuthLayout} />
      <PrivateRoute path="/admin/" component={AdminLayout} />
      <Redirect from="/" to="/auth/login" />
    </Switch>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
    {...rest}
    render={props =>
        AuthProvider.getAuth() ? (
        <Component {...props} />
        ) : (
        <Redirect to={{ pathname: "/auth/login"}} />
        )
    }
    />
);

  export default Router;