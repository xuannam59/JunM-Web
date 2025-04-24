import { routes } from '@/utils/constant';
import { useTheme } from '@/utils/ThemeProvider';
import { Image, Menu } from 'antd'
import { TbAlbum, TbLayoutDashboard, TbMicrophone2, TbMusic, TbPlaylist, TbSettings, TbUser, TbVideo } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const SiderBar = () => {
    const { darkMode } = useTheme()
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

    return (
        <>
            {/* Logo */}
            <div className="h-[70px] flex items-center px-6">
                <Image src='/images/logo.webp' width={100} preview={false} />
                <span className="text-2xl font-bold bg-gradient-to-r
            from-[#EE10B0] to-[#0E9EEF] text-transparent bg-clip-text"
                >
                    Admin
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
        </>
    )
}

export default SiderBar