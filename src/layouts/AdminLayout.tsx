import { Avatar, Button, Dropdown, Menu, MenuProps } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useTheme } from '@/utils/ThemeProvider'
import { TbAlbum, TbChevronDown, TbLayoutDashboard, TbLogout, TbMicrophone2, TbMoon, TbMusic, TbPlaylist, TbSettings, TbSun, TbUser, TbVideo } from 'react-icons/tb'
import { routes } from '@/utils/constant'

const AdminLayout = () => {
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();

  // Menu items cho sidebar
  const menuItems = [
    {
      key: `/${routes.ADMIN}`,
      icon: <TbLayoutDashboard size={20} />,
      label: <Link to={""}>Dashboard</Link>,
    },
    {
      key: `/${routes.ADMIN}/${routes.ADMIN_USER}`,
      icon: <TbUser size={20} />,
      label: <Link to={routes.ADMIN_USER}>Users</Link>,
    },
    {
      key: `/${routes.ADMIN}/${routes.ADMIN_ARTIST}`,
      icon: <TbMicrophone2 size={20} />,
      label: <Link to={routes.ADMIN_ARTIST}>Artists</Link>,
    },
    {
      key: `/${routes.ADMIN}/${routes.ADMIN_SONG}`,
      icon: <TbMusic size={20} />,
      label: <Link to={routes.ADMIN_SONG}>Songs</Link>,
    },
    {
      key: `/${routes.ADMIN}/${routes.ADMIN_VIDEO}`,
      icon: <TbVideo size={20} />,
      label: <Link to={routes.ADMIN_VIDEO}>Videos</Link>,
    },
    {
      key: `/${routes.ADMIN}/${routes.ADMIN_ALBUM}`,
      icon: <TbAlbum size={20} />,
      label: <Link to={routes.ADMIN_ALBUM}>Albums</Link>,
    },
    {
      key: `/${routes.ADMIN}/${routes.ADMIN_PLAYLIST}`,
      icon: <TbPlaylist size={20} />,
      label: <Link to={routes.ADMIN_PLAYLIST}>PlayList</Link>,
    },
    {
      key: `/${routes.ADMIN}/${routes.ADMIN_SETTING}`,
      icon: <TbSettings size={20} />,
      label: <Link to={routes.ADMIN_SETTING}>Settings</Link>,
    }
  ];

  // Dropdown items cho avatar
  const dropdownItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <TbUser size={18} />
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <TbSettings size={18} />
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <TbLogout size={18} />,
      danger: true
    }
  ];

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-[#121212]' : ''}`}>
      {/* Sidebar */}
      <aside className={`w-[240px] h-full flex flex-col fixed left-0 top-0 border-r
        ${darkMode ? 'bg-[#2A2A2A] border-[#3F3F3F]' : 'bg-white border-[#f0f0f0]'}`}
      >
        {/* Logo */}
        <div className="h-[70px] flex items-center px-6">
          <span className="text-xl font-bold bg-gradient-to-r
            from-[#EE10B0] to-[#0E9EEF] text-transparent bg-clip-text"
          >
            Admin JunM
          </span>
        </div>

        {/* Menu Items */}
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className={`border-0 flex-1 overflow-y-auto
            ${darkMode ? '!bg-[#2A2A2A]' : '!bg-white'} !border-none`}
          style={{
            fontSize: '14px',
          }}
          theme={darkMode ? 'dark' : 'light'}
        />
      </aside>

      {/* Main Content Wrapper */}
      <div className={`flex-1 ml-[240px] flex flex-col min-h-screen`}
      >
        {/* Header */}
        <header className={`h-[70px] fixed top-0 right-0 left-[240px] border-b z-50 px-6
          ${darkMode ? 'bg-[#2A2A2A] border-[#3F3F3F]' : 'bg-white border-[#f0f0f0]'}`}
        >
          <div className="flex items-center justify-end h-full gap-4">
            {/* Theme Toggle */}
            <Button 
              type="text"
              icon={darkMode ? <TbSun size={20} className="text-yellow-400" /> : <TbMoon size={20} />}
              onClick={toggleTheme}
              className={darkMode ? 'text-gray-300 hover:text-yellow-400' : ''}
            />

            {/* Avatar Dropdown */}
            <Dropdown menu={{ items: dropdownItems }} trigger={['click']} placement="bottomRight">
              <div className={`flex items-center gap-2 cursor-pointer ${darkMode ? 'text-gray-300' : ''}`}>
                <Avatar size={36} src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                <span>Admin</span>
                <TbChevronDown size={16} />
              </div>
            </Dropdown>
          </div>
        </header>

        {/* Main Content */}
        <main className={`flex-1 p-6 mt-[70px] overflow-y-auto ${darkMode ? 'bg-[#2A2A2A] text-gray-300' : 'bg-gray-100 text-black'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout