import Header from '@/components/admin/Header'
import SiderBar from '@/components/admin/SiderBar'
import { useTheme } from '@/utils/ThemeProvider'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpand } from 'react-icons/tb';
import { useAppSelector } from '@/redux/hook';

const AdminLayout = () => {
  const { darkMode } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const auth = useAppSelector(state => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if(auth.isAuthenticated && auth.user.role !=="ADMIN") {
      navigate("/");
    }
  }, []);

  return (
    <div className={`min-h-screen w-full max-w-[2560px] flex ${darkMode ? 'bg-[#121212]' : ''}`}>
      {/* Sidebar */}
      <aside className={`${isCollapsed ? 'w-[80px]' : 'w-[240px]'} h-full flex flex-col fixed left-0 top-0 border-r transition-all duration-300 z-50
        ${darkMode ? 'bg-[#2A2A2A] border-[#3F3F3F]' : 'bg-white border-[#f0f0f0]'}`}
      >
        <SiderBar isCollapsed={isCollapsed} />
      </aside>

      <div className={`flex-1 ${isCollapsed ? 'ml-[80px]' : 'ml-[240px]'} flex flex-col min-h-screen transition-all duration-300`}>
        {/* Header */}
        <header className={`h-[70px] flex items-center justify-between fixed top-0 right-0 ${isCollapsed ? 'left-[80px]' : 'left-[240px]'} border-b z-40 px-6
          ${darkMode ? 'bg-[#2A2A2A] border-[#3F3F3F]' : 'bg-white border-[#f0f0f0]'}`}
        >
          <Button
            type="text"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`${darkMode ? 'text-gray-300' : ''}`}
          >
            {isCollapsed ? <TbLayoutSidebarLeftExpand size={20} /> : <TbLayoutSidebarLeftCollapse size={20} />}
          </Button>
          <Header />
        </header>

        {/* Main Content */}
        <main className={`flex-1 mt-[70px] ${isCollapsed ? 'w-[calc(100vw-80px)]' : 'w-[calc(100vw-240px)]'}
        overflow-y-auto ${darkMode ? 'bg-[#121212] text-gray-300' : 'bg-gray-100 text-black'}`}>
          <div className={`p-4 md:p-6 ${darkMode ? 'bg-[#121212]' : 'bg-gray-100'}`}>
            <div className={`rounded-lg p-6 ${darkMode ? 'bg-[#353535]' : 'bg-white'}`}>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout