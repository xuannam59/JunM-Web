import { Form, Input, Button, Typography, Divider } from 'antd'
import { Link } from 'react-router-dom'
import { useTheme } from '@/utils/ThemeProvider'
import { FcGoogle } from 'react-icons/fc'
import { TbLock, TbMail, TbUser } from 'react-icons/tb'
import { IRegisterForm } from '@/types/Auth'

const { Title } = Typography

const RegisterPage = () => {
  const { darkMode } = useTheme()
  const onFinish = (values: IRegisterForm) => {
    console.log('Received values:', values)
  }

  const handleGoogleRegister = () => {
    console.log('Google register clicked')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center items-center">
        <Title level={2} className={`${darkMode ? 'text-white' : ''}`}>Create Account</Title>
      </div>

      <Form
        name="register"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        className="space-y-4"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            prefix={<TbUser className={darkMode ? 'text-gray-400' : ''} />}
            placeholder="Username"
            size="large"
            className={`rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50'}`}
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            {type: "email", message: "Email improper format"}
          ]}
        >
          <Input
            prefix={<TbMail className={darkMode ? 'text-gray-400' : ''} />}
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
            prefix={<TbLock className={darkMode ? 'text-gray-400' : ''} />}
            placeholder="Password"
            size="large"
            className={`rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50'}`}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
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
            prefix={<TbLock className={darkMode ? 'text-gray-400' : ''} />}
            placeholder="Confirm Password"
            size="large"
            className={`rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50'}`}
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

        <Divider className={darkMode ? 'text-gray-400' : ''}>or</Divider>

        <Button
          icon={<FcGoogle />}
          size="large"
          block
          onClick={handleGoogleRegister}
          className="flex items-center justify-center gap-2 rounded-lg h-12 text-lg"
        >
          Continue with Google
        </Button>

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
