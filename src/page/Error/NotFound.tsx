import { Button, Typography } from 'antd'
import { Link } from 'react-router-dom'
import Lottie from 'lottie-react'
import notFoundAnimation from '@/assets/animations/not-found.json'
import { useTheme } from '@/utils/ThemeProvider'

const { Title, Text } = Typography

const NotFound = () => {
  const { darkMode } = useTheme()

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <Lottie animationData={notFoundAnimation} loop={true} />
        </div>
        
        <Title level={1} className={`mb-4 ${darkMode ? 'text-white' : ''}`}>
          Oops! Page Not Found
        </Title>
        
        <Text className={`text-lg mb-8 block ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </Text>

        <Link to="/">
          <Button 
            type="primary" 
            size="large"
            className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 border-none h-12 text-lg px-8"
          >
            Go Back Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound