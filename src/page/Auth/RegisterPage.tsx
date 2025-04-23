import { Form, Input, Button, Typography, Divider, App } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '@/utils/ThemeProvider'
import { TbLock, TbMail, TbUser } from 'react-icons/tb'
import { IRegisterForm } from '@/types/auth.type'
import { useState } from 'react'
import ButtonGoogleLogin from '@/components/auth/ButtonLoginGoogle'
import { callRegister } from '@/apis/login.api'
import { routes } from '@/utils/constant'

const { Title } = Typography

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {message, notification} = App.useApp();
  const navigate = useNavigate();
  const { darkMode } = useTheme()
  const [form] = Form.useForm();

  const onFinish = async (values: IRegisterForm) => {
    setIsLoading(true);
    const res = await callRegister(values);
    if(res.data) {
      message.success("Register successfully!");
      navigate(`/${routes.LOGIN}`);
    }else {
      notification.error({
        message: "Register Error",
        description: res.message && Array.isArray(res.message) ? res.message.toString() : res.message
      });
    }
    setIsLoading(false);
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
        form={form}
        disabled={isLoading}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            prefix={<TbUser size={20} className={darkMode ? 'text-gray-400' : ''} />}
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
            prefix={<TbMail size={20} className={darkMode ? 'text-gray-400' : ''} />}
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
            prefix={<TbLock size={20} className={darkMode ? 'text-gray-400' : ''} />}
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
            prefix={<TbLock size={20} className={darkMode ? 'text-gray-400' : ''} />}
            placeholder="Confirm Password"
            size="large"
            className={`rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50'}`}
          />
        </Form.Item>
      </Form>
      <Button 
        type="primary" 
        htmlType="submit" 
        block 
        size="large"
        className="rounded-lg !bg-gradient-to-r from-purple-500 to-pink-500 !border-none opacity-80 hover:opacity-100"
        onClick={() => form.submit()}
        loading={isLoading}
      >
        Register
      </Button>

    <Divider className={darkMode ? 'text-gray-400' : ''}>or</Divider>

    <ButtonGoogleLogin isLoading={isLoading} />

    <div className="text-center mt-4">
      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
        Already have an account?{' '}
      </span>
      <Link to={`/${routes.LOGIN}`}className="text-blue-500 hover:underline font-medium">
        Login
      </Link>
    </div>
      
    </div>
  )
}

export default RegisterPage
