import React, { FunctionComponent, ReactElement, useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import constants from "../constants";
import * as PropTypes from 'prop-types'
import NoAuthOnlyRoute from './NoAuthOnlyRoute'

const ProtectedRoute: FunctionComponent<RouteProps> = ({ component: Component, render, ...rest }): ReactElement => {
  const { isAuth } = useContext(AuthContext);
  if (!isAuth) return <Redirect to={`${constants.SITEMAP.LOGIN}`} />;
  if (render) return <Route {...rest} render={render} />;
  return <Route {...rest} component={Component} />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  render: PropTypes.func,
  component: PropTypes.any
}

export default ProtectedRoute;
