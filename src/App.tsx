import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import * as PropTypes from 'prop-types'

function App({children}) {
  return (
    <div className="App">
      <AuthProvider>
        {children}
      </AuthProvider>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node
}

export default App;


