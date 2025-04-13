import { Outlet } from 'react-router-dom'
import { useTheme } from '@/utils/ThemeProvider'

const AuthLayout = () => {
  const { darkMode } = useTheme()

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className={`w-full max-w-md p-8 rounded-xl shadow-lg ${
        darkMode 
          ? 'bg-gray-800 text-white' 
          : 'bg-white border border-gray-200'
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
  )
}

export default AuthLayout
