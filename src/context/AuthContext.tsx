import React, { FunctionComponent, useEffect, useState } from 'react'
import { RouteProps, withRouter } from 'react-router-dom'
import * as PropTypes from 'prop-types';
import Spinner from '../components/Spinner';
import IUser from '../interfaces/IUser';
import { checkAuthentication } from '../services/auth';

interface AuthContextState {
  isAuth: boolean,
  checked: boolean,
  identity: IUser | null,
}

export const AuthContext = React.createContext<AuthContextState>({
  isAuth: false,
  checked: false,
  identity: null,
});

export const AuthProvider: FunctionComponent<RouteProps> = ({  children }) => {

  const [isAuth, setAuth] = useState<boolean>(false);
  const [identity, setIdentity] = useState<IUser | null>(null)
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    checkAuthentication()
      .then(({ user }) => {
        setAuth(true)
        setIdentity(user)
        setChecked(true)
      }).catch(err => {
      setIdentity(null)
      setChecked(true)
    })
  }, []);

  if (!checked) return <Spinner />;

  return (
    <AuthContext.Provider value={{ isAuth, checked, identity }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
}
