import React, { FunctionComponent, useContext, useEffect, useState } from 'react'
import { RouteProps } from 'react-router-dom'
import * as PropTypes from 'prop-types';
import ITask from '../interfaces/ITask';
import { getAllTasks } from '../services/taskServices'
import { AuthContext } from './AuthContext';

interface TasksContextState {
  tasks: ITask[] | null,
  loadTasks: () => void,
  loadingTasks: boolean,
}

export const TasksContext = React.createContext<TasksContextState>({
  tasks: null,
  loadTasks: () => {},
  loadingTasks: false,
});

export const TasksProvider: FunctionComponent<RouteProps> = ({  children }) => {
  const [tasks, setTasks] = useState<ITask[] | null>(null);
  const [loadingTasks, setLoadingTasks] = useState<boolean>(false);
  const { isAuth } = useContext(AuthContext);

  const loadTasks = () => {
    setLoadingTasks(true)
    getAllTasks()
      .then((tasks ) => {
        setTasks(tasks)
        setLoadingTasks(false)
      }).catch(() => {
      setTasks(null)
      setLoadingTasks(false)
    })
  }

  useEffect(() => {
    if (isAuth) loadTasks()
  }, [isAuth]);

  return (
    <TasksContext.Provider value={{ tasks, loadingTasks, loadTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

TasksProvider.propTypes = {
  children: PropTypes.node
}
