import React, { Fragment, FunctionComponent } from 'react'
import { Button, Table } from 'antd'
import ITask from '../../interfaces/ITask'
import { getTableColumns, getTableDataSource, tasksTableComponents } from './utils'
import { RouteProps } from 'react-router-dom'
import { FolderAddFilled } from '@ant-design/icons'

interface TasksTableProps extends RouteProps {
  loading?: boolean,
  tasks: ITask[] | null,
  handleDelete: (id: number) => void,
  handleUpdate: (task: ITask) => void,
  handleAdd: () => void,
}

const TasksTable: FunctionComponent<TasksTableProps> = (props) => {

  const { loading, tasks, handleDelete, handleUpdate, handleAdd } = props

  const columns = getTableColumns({ handleDelete }).map(col => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        dataType: col.dataType,
        defaultSortOrder: col.defaultSortOrder,
        sortDirections: col.sortDirections,
        sorter: col.sorter,
        handleSave: (data) => {handleUpdate(data)},

      }),
    }
  })

  const dataSource = getTableDataSource(tasks || [])

  return (
    <Fragment>
      <br />
      <Button type="primary" icon={<FolderAddFilled />} onClick={() => handleAdd()}>
        Nouvelle tache
      </Button>
      <br />
    <Table
      columns={columns}
      components={tasksTableComponents}
      rowClassName={() => 'editable-row'}
      bordered
      dataSource={dataSource}
      loading={loading}
    />

    </Fragment>
  )
}

export default TasksTable
