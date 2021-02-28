import React, { FunctionComponent, useEffect, useState } from 'react'
import { RouteProps } from 'react-router-dom'
import * as PropTypes from 'prop-types';
import Spinner from '../components/Spinner';
import IUser from '../interfaces/IUser';
import { checkAuthentication, logout } from '../services/auth'

interface AuthContextState {
  isAuth: boolean,
  setAuth: (value: boolean) => void
  checked: boolean,
  identity: IUser | null,
  dispatchLogout: () => void
}

export const AuthContext = React.createContext<AuthContextState>({
  isAuth: false,
  setAuth: () => {},
  checked: false,
  identity: null,
  dispatchLogout: () => {}
});

export const AuthProvider: FunctionComponent<RouteProps> = ({  children }) => {

  const [isAuth, setAuth] = useState<boolean>(false);
  const [identity, setIdentity] = useState<IUser | null>(null)
  const [checked, setChecked] = useState<boolean>(false);


  useEffect(() => {
    setChecked(false)
    checkAuthentication()
      .then(({ user }) => {
        setAuth(true)
        setIdentity(user)
        setChecked(true)
      }).catch(() => {
      setIdentity(null)
      setChecked(true)
    })
  }, []);

  const dispatchLogout = () => {
    logout()
      .then(() => {
        setAuth(false)
      })
      .catch(() => {})
  }

  if (!checked) return <Spinner />;

  return (
    <AuthContext.Provider value={{ isAuth, checked, identity, dispatchLogout, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
}
