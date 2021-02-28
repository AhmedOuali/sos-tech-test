import React, { useState, useRef, useContext, useEffect, FunctionComponent } from 'react'
import { Input, Popconfirm, Form, Tooltip, Space } from 'antd'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import { deserializeDateFormatter } from '../../helpers/dataFormatters'
import './tasksTable.scss'
import ITask from '../../interfaces/ITask'

const EditableContext = React.createContext<any>({})

type GetTableDataSource = (tasks: ITask[]) => ITask[]
export const getTableDataSource: GetTableDataSource = (tasks) => (
  tasks
    .sort((a, b) => {
      if ((!a.id || !b.id) || (a.id > b.id)) {return 1} else {return -1}
    })
    .map((task, index) => ({
          ...task,
          key: index,
          updatedAt: task.updatedAt && deserializeDateFormatter(task.updatedAt),
          createdAt: task.createdAt && deserializeDateFormatter(task.createdAt),
        }
      ),
    )
)

type GetTableColumns = (options: { handleDelete: (id: number) => void }) => {
  title: string,
  dataIndex: string,
  editable?: boolean,
  dataType?: 'text' | 'number',
  sorter?: (a: any, b: any) => number,
  render?: any,
  defaultSortOrder?: any,
  sortDirections?: any
}[]

export const getTableColumns: GetTableColumns = (options) => {
  // const { push } = useRouter()
  const { handleDelete } = options
  return [
    {
      title: 'Titre',
      dataIndex: 'title',
      editable: true,
      dataType: 'text',
    },
    { title: 'brève description', dataIndex: 'shortDesc', editable: true, dataType: 'text' },
    { title: 'longue description', dataIndex: 'longDesc', editable: true, dataType: 'text' },
    { title: 'Date de modification', dataIndex: 'updatedAt' },
    { title: 'Date de création', dataIndex: 'createdAt' },
    {
      title: 'Actions',
      dataIndex: 'operation',
      render: (text, record) =>
        (
          <Space>
            <Popconfirm
              title={`Vous étes sure de vouloir supprimer la catégorie ${record.title}?`}

              onConfirm={() => handleDelete(record.id)}>
              <Tooltip title="Supprimer">
                <DeleteOutlined className='action-button' />
              </Tooltip>
            </Popconfirm>
          </Space>
        ),
    },
  ]
}

interface EditableRowProps {
  index: number;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  dataType: string;
  record: ITask;
  className: string;
  handleSave: (record: ITask) => void;
}

export const EditableRow: React.FC<EditableRowProps> = (props) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

export const EditableCell: FunctionComponent<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  dataType,
  record,
  className,
  handleSave,
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef()
  const form = useContext(EditableContext)

  useEffect(() => {
    if (editing) {
      // @ts-ignore
      inputRef && inputRef.current && inputRef.current.focus()
    }

  }, [editing])

  const toggleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({ [dataIndex]: record[dataIndex] })
  }

  const save = async () => {
    try {
      const values = await form.validateFields()

      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
    }
  }

  let childNode = children

  const inputType = dataType || 'text'
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {/*@ts-ignore*/}
        <Input ref={inputRef} onPressEnter={save} onBlur={save} type={inputType} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    )
  }

  return <td className={className}>{childNode}</td>
}

export const tasksTableComponents = {
  body: {
    row: EditableRow,
    cell: EditableCell,
  },
}
