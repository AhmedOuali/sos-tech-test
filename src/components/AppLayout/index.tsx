import { Button, Layout, Menu } from 'antd'
import React, { FunctionComponent } from 'react'
import * as PropTypes from 'prop-types'
import { RouteProps } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons'
import IUser from '../../interfaces/IUser'

interface AppLayoutProps extends RouteProps {
  menuItems: {key: string, label: string}[]
  handleLogout: () => void,
  identity: IUser | null,
}

const AppLayout: FunctionComponent<AppLayoutProps> = ({children, menuItems, handleLogout, identity}) => {

  return (
    <Layout className="layout">
      <Layout.Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal"  defaultSelectedKeys={['2']}>
          {menuItems && menuItems.map((item) => {
            return <Menu.Item key={item.key}>{item.label}</Menu.Item>
          })}
          <div style={{float: 'right'}}>
            <span style={{marginRight: "4px"}}>{identity && identity.username}</span>
            <Button type="primary" shape="circle"  icon={<LogoutOutlined />}  onClick={handleLogout}/>
          </div>

        </Menu>

      </Layout.Header>
      <Layout.Content style={{ padding: '0 50px', height: "100vh" }}>
        {children}
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>AOS - Developed by Ahmed WALI</Layout.Footer>
    </Layout>
  )
}

AppLayout.propTypes = {
  children: PropTypes.node
}

export default AppLayout
