import React, { FunctionComponent, ReactElement, useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import * as PropTypes from 'prop-types'
import constants from '../constants'

const NoAuthOnlyRoute: FunctionComponent<RouteProps> = ({ component: Component, render, ...rest }): ReactElement => {
  const { isAuth } = useContext(AuthContext);
  if (isAuth) return <Redirect to={constants.SITEMAP.HOME} />;
  debugger
  if (render) return <Route {...rest} render={render} />;
  return <Route {...rest} component={Component} />;
};

NoAuthOnlyRoute.propTypes = {
  children: PropTypes.node,
  render: PropTypes.func,
  component: PropTypes.any
}

export default NoAuthOnlyRoute;
