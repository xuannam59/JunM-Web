import { Outlet } from 'react-router-dom'
import { useTheme } from '@/utils/ThemeProvider'
import Lottie from 'lottie-react'
import musicAnimation from '@/assets/animations/music.json'

const AuthLayout = () => {
  const { darkMode } = useTheme()

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="hidden lg:flex w-1/2 items-center justify-center p-8">
        <div className="max-w-md">
          <Lottie animationData={musicAnimation} loop={true} />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className={`w-full max-w-md p-8 rounded-xl ${
          darkMode 
            ? 'bg-gray-800 text-white' 
            : 'bg-white'
        }`}>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Music App
            </h1>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Welcome to your music journey
            </p>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
