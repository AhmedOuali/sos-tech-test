import React, { FunctionComponent, ReactElement, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import constants from "../constants";

const ProtectedComponent: FunctionComponent = (props): ReactElement => {
  const { isAuth } = useContext(AuthContext);
  if (!isAuth) return <Redirect to={`/${constants.SITEMAP.LOGIN}`} />;
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default ProtectedComponent;
