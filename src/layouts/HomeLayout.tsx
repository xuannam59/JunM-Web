import { Outlet } from 'react-router-dom'
import { useTheme } from '@/utils/ThemeProvider'
import Header from '@/components/home/Header';
import SiderBarLeft from '@/components/home/SiderBarLeft';
import SiderBarRight from '@/components/home/SiderBarRight';
const HomeLayout = () => {
  const { darkMode } = useTheme();
  return (
    <>
      <div className={`w-full h-screen flex flex-col items-center justify-center 
        `}
      >
        <div className={`min-h-screen w-full max-w-[2560px] flex items-center justify-start
          ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
          <div className={`min-h-[100vh] max-h-[100vh] transition-all duration-300`}>
            <SiderBarLeft />
          </div>
          <div className={`flex flex-col items-center justify-st w-full h-full overflow-hidden transition-all duration-300 
            ${darkMode ? 'bg-[#1E1E1E]' : 'bg-white'}`}>
            <Header />
            <Outlet />
          </div>
          <div className={`min-h-[100vh] max-h-[100vh] transition-all duration-300`}>
            <SiderBarRight />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeLayout
