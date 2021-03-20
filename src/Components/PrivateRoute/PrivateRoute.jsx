import React from "react";
import { Redirect, Route } from "react-router";
import { auth } from "./../../Firebase";

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export const PrivateRoute2 = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (auth.currentUser ? <Redirect to="/home" /> : children)}
    />
  );
};

export default PrivateRoute;
