import { useAppDispatch } from '@/ redux/hook'
import { doLogin } from '@/ redux/reducers/auth.reducer'
import { callLogin } from '@/apis/login.api'
import ButtonGoogleLogin from '@/components/auth/ButtonLoginGoogle'
import { ILoginForm } from '@/types/auth.type'
import { routes } from '@/utils/constant'
import { useTheme } from '@/utils/ThemeProvider'
import { App, Button, Divider, Form, Input, Typography } from 'antd'
import { useState } from 'react'
import { TbLock, TbMail } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'
const { Title } = Typography

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();
  const { message, notification } = App.useApp();
  const { darkMode } = useTheme()
  const navigate = useNavigate();


  const dispatch = useAppDispatch();

  const onFinish = async (values: ILoginForm) => {
    setIsLoading(true);

    const res = await callLogin(values);
    if (res.data) {
      dispatch(doLogin(res.data));
      message.success("Login Successfully!");
      navigate(routes.DEFAULT);
    } else {
      notification.error({
        message: "Login Error",
        description: res.message && Array.isArray(res.message) ? res.message.toString() : res.message
      });
    }
    setIsLoading(false);
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-center items-center">
          <Title level={2} className={`${darkMode ? 'text-white' : ''}`}>Welcome Back</Title>
        </div>

        <Form
          name="login"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          className="space-y-4"
          disabled={isLoading}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: "email", message: "Email improper format" }
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

          <div className="flex justify-between items-center">
            <Form.Item name="remember" valuePropName="checked">
              <label className={`flex items-center cursor-pointer ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <input type="checkbox" className="mr-2" />
                <span>Remember me</span>
              </label>
            </Form.Item>
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>
        </Form>
        <Button
          type="primary"
          block
          size="large"
          className="rounded-lg !bg-gradient-to-r from-purple-500 to-pink-500 !border-none opacity-80 hover:opacity-100"
          loading={isLoading}
          onClick={() => form.submit()}
        >
          Login
        </Button>

        <Divider className={darkMode ? 'text-gray-400' : ''}>or</Divider>

        <ButtonGoogleLogin isLoading={isLoading} />

        <div className="text-center mt-4">
          <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Don't have an account?{' '}
          </span>
          <Link to={`/${routes.REGISTER}`} className="text-blue-500 hover:underline font-medium">
            Register
          </Link>
        </div>

      </div>
    </>
  )
}

export default LoginPage
