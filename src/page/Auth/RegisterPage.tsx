import { Form, Input, Button, Typography, Divider } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useTheme } from '@/utils/ThemeProvider'
import { IRegisterForm } from '@/types/Auth'

const { Title } = Typography

const RegisterPage = () => {
  const { darkMode } = useTheme()
  const onFinish = (values: IRegisterForm) => {
    console.log('Received values:', values)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center items-center">
        <Title level={2} className={`${darkMode ? 'text-white' : ''}`}>Create Account</Title>
      </div>

      <Form
        name="register"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            prefix={<UserOutlined className={darkMode ? 'text-gray-400' : ''} />}
            placeholder="Username"
            size="large"
            className={`rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input
            prefix={<MailOutlined className={darkMode ? 'text-gray-400' : ''} />}
            placeholder="Email"
            size="large"
            className={`rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className={darkMode ? 'text-gray-400' : ''} />}
            placeholder="Password"
            size="large"
            className={`rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The two passwords do not match!'))
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className={darkMode ? 'text-gray-400' : ''} />}
            placeholder="Confirm Password"
            size="large"
            className={`rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
          />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            block 
            size="large"
            className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 border-none h-12 text-lg"
          >
            Register
          </Button>
        </Form.Item>

        <div className="text-center mt-4">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Already have an account?{' '}
          </span>
          <Link to="/login" className="text-blue-500 hover:underline font-medium">
            Login
          </Link>
        </div>
      </Form>
    </div>
  )
}

export default RegisterPage
