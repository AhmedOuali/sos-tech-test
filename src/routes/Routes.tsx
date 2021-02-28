import React, { FunctionComponent, ReactElement } from "react";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../pages/home";
import Login from "../pages/login"
import NoAuthOnlyRoute from './NoAuthOnlyRoute'
import constants from '../constants';

const Routes: FunctionComponent<any> = (): ReactElement => (
  <div className="full-width full-height">
    <NoAuthOnlyRoute path={constants.SITEMAP.LOGIN} component={Login} />
    <ProtectedRoute path={constants.SITEMAP.HOME} component={Home} />
  </div>
);
export default Routes;
