import React, { FunctionComponent } from 'react'
import './App.css';
import { AuthProvider } from './context/AuthContext';
import * as PropTypes from 'prop-types'
import { TasksProvider } from './context/TasksContext';

const App: FunctionComponent = ({children}) => {
  return (
    <div className="App">
      <AuthProvider>
        <TasksProvider>
          {children}
        </TasksProvider>
      </AuthProvider>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.node
}

export default App;


