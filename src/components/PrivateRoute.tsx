import React  from "react";
import { Route, Redirect, RouteProps as ReactDOMRouteProps, } from "react-router-dom";

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

export const PrivateRoute = ({ component: Component, ...rest }: RouteProps) => {
  console.log('render routes')
  return (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("jwt") ? (
        <Component />
      ) : (
        <Redirect
          to={{ pathname: "/login", state: { from: props.location } }}
        />
      )
    }
  />
)};
