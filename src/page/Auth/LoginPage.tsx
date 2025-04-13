import { Form, Input, Button, Typography, Divider } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useTheme } from '@/utils/ThemeProvider'
import { FcGoogle } from 'react-icons/fc'
import { ILoginForm } from '@/types/Auth'

const { Title } = Typography

const LoginPage = () => {
  const { darkMode } = useTheme()
  const onFinish = (values: ILoginForm) => {
    console.log('Received values:', values)
  }

  const handleGoogleLogin = () => {
    console.log('Google login clicked')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center items-center">
        <Title level={2} className={`${darkMode ? 'text-white' : ''}`}>Welcome Back</Title>
      </div>

      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            {type: "email", message: "Email improper format"}
          ]}
        >
          <Input
            prefix={<UserOutlined className={darkMode ? 'text-gray-400' : ''} />}
            placeholder="Email"
            size="large"
            className={`rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50'}`}
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
            className={`rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50'}`}
          />
        </Form.Item>

        <div className="flex justify-between items-center">
          <Form.Item name="remember" valuePropName="checked" style={{marginBottom: 0}}>
            <label className={`flex items-center cursor-pointer ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <input type="checkbox" className="mr-2" />
              <span>Remember me</span>
            </label>
          </Form.Item>
          <Link to="/forgot-password" className="text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            block 
            size="large"
            className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 border-none h-12 text-lg"
          >
            Login
          </Button>
        </Form.Item>

        <Divider className={darkMode ? 'text-gray-400' : ''}>or</Divider>

        <Button
          icon={<FcGoogle size={20} />}
          size="large"
          block
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-2 rounded-lg h-12 text-lg"
        >
          Continue with Google
        </Button>

        <div className="text-center mt-4">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Don't have an account?{' '}
          </span>
          <Link to="/register" className="text-blue-500 hover:underline font-medium">
            Register
          </Link>
        </div>
      </Form>
    </div>
  )
}

export default LoginPage
