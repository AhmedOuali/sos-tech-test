import React, { Fragment, FunctionComponent, useContext } from 'react'
import AppLayout from '../../components/AppLayout'
import TasksTable from '../../components/TasksTable'
import { TasksContext } from '../../context/TasksContext'
import { createTask, deleteTask, updateTask } from '../../services/taskServices'
import ITask from '../../interfaces/ITask'
import { AuthContext } from '../../context/AuthContext'

const Home: FunctionComponent = () => {
  const { tasks, loadingTasks, loadTasks,  } = useContext(TasksContext)
  const {dispatchLogout, identity} = useContext(AuthContext)
  debugger

  const handleDelete = (id: number) => {
    deleteTask(id)
      .then(() => {
        loadTasks()
      }).catch(() => {})
  }

  const handleUpdate = (task: ITask) => {
    task.id && updateTask(task.id, task).then(() => {
      loadTasks()
    }).catch(() => {})
  }

  const handleAddTask = () => {
    const newCategoryData = {
      title: '-',
      longDesc: '-',
      shortDesc: '-',
    }
    createTask(newCategoryData).then(() => {
      loadTasks()
    }).catch(() => {})
  }

  const menuItems = [
    { key: '1', label: 'Home' },
    { key: '2', label: tasks ? `Taches (${tasks.length})` : 'Taches' },
    { key: '3', label: "About" },
  ]

  return (
    <Fragment>
      <AppLayout menuItems={menuItems} handleLogout={dispatchLogout} identity={identity}>
          <TasksTable tasks={tasks} handleAdd={handleAddTask} handleDelete={handleDelete} handleUpdate={handleUpdate}
                      loading={loadingTasks} />
      </AppLayout>
    </Fragment>
  )
}

export default Home
