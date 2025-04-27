import Header from '@/components/admin/Header'
import SiderBar from '@/components/admin/SiderBar'
import { useTheme } from '@/utils/ThemeProvider'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen w-full max-w-[2560px] flex ${darkMode ? 'bg-[#121212]' : ''}`}>
      {/* Sidebar */}
      <aside className={`w-[240px] h-full flex flex-col fixed left-0 top-0 border-r
        ${darkMode ? 'bg-[#2A2A2A] border-[#3F3F3F]' : 'bg-white border-[#f0f0f0]'}`}
      >
        <SiderBar />
      </aside>

      <div className={`w-full ml-[240px] flex flex-col min-h-screen`}
      >
        {/* Header */}
        <header className={`h-[70px] fixed top-0 right-0 left-[240px] border-b z-50 px-6
          ${darkMode ? 'bg-[#2A2A2A] border-[#3F3F3F]' : 'bg-white border-[#f0f0f0]'}`}
        >
          <Header />
        </header>

        {/* Main Content */}
        <main className={`flex-1 p-6 mt-[70px] overflow-y-auto ${darkMode ? 'bg-[#2A2A2A] text-gray-300' : 'bg-gray-100 text-black'}`}>
          <div className={`p-6 rounded-lg ${darkMode ? 'bg-[#353535]' : 'bg-white'}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout