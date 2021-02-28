import React, { FunctionComponent, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Checkbox, Alert } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login } from '../../services/auth'
import './login.scss'
import { AuthContext } from '../../context/AuthContext'

const Login: FunctionComponent = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const { setAuth } = useContext(AuthContext)
  const [loading, setLoading] = useState<boolean>(false)
  const history = useHistory()
  const push = history.push
  const onSubmit = values => {
    setLoading(true)
    login(values, { disableDefaultErrorMessage: true, push })
      .then(() => {
        // setLoading(false)
        setAuth(true)
      }).catch(err => {
      // setLoading(false)
      setAuth(false)
      setLoading(false)
      setErrorMessage(err.message)
    })
  }

  return (
    <div className='login-background'>
      <Form
        name="normal_login"
        className='login-form'
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Veuillez saisir l\'adresse mail !' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Veuillez saisir votre nom mot de passe!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
            Log in
          </Button>
          {/*Or <a href="">register now!</a>*/}
        </Form.Item>
        {
          errorMessage && <Alert message={errorMessage} type="error" showIcon />
        }
      </Form>
    </div>
  )
}

export default Login
