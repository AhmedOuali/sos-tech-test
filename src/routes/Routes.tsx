import React, { FunctionComponent, ReactElement } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/home";
import Login from "../pages/login"
import NoAuthOnlyRoute from './NoAuthOnlyRoute'
import constants from '../constants';
import { RouteProps } from 'react-router-dom'

const Routes: FunctionComponent<RouteProps> = (): ReactElement => (
  <div className="full-width full-height">
    <NoAuthOnlyRoute path={constants.SITEMAP.LOGIN} component={Login} />
    <ProtectedRoute path={constants.SITEMAP.HOME} component={Home} />
  </div>
);
export default Routes;
