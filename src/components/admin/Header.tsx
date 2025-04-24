import { useAppSelector } from '@/ redux/hook'
import { useTheme } from '@/utils/ThemeProvider'
import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import React from 'react'
import { TbChevronDown, TbHome, TbLogout, TbMoon, TbSettings, TbSun, TbUser } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const Header = () => {
    const { darkMode, toggleTheme } = useTheme();
    const auth = useAppSelector(state => state.auth);
    const dropdownItems: MenuProps['items'] = [
        {
            key: 'profile',
            label: 'Profile',
            icon: <TbUser size={18} />
        },
        {
            key: 'Home',
            label: <Link to="/">Home</Link>,
            icon: <TbHome size={18} />
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
        <>
            <div className="flex items-center justify-end h-full gap-4">
                {/* Theme Toggle */}
                <Button
                    type="text"
                    onClick={toggleTheme}
                    className={darkMode ? 'text-gray-300 hover:text-yellow-400' : ''}
                >
                    {darkMode ? <TbSun size={20} className="text-yellow-400" /> : <TbMoon size={20} />}
                </Button>

                {/* Avatar Dropdown */}
                <Dropdown
                    menu={{ items: dropdownItems, style: { backgroundColor: darkMode ? "#333333" : "#ffffff" } }}
                    trigger={['click']}
                    placement="bottomRight"
                >
                    <div className={`flex items-center gap-2 cursor-pointer ${darkMode ? 'text-gray-300' : ''}`}>
                        <Avatar size={36} src={auth.user.avatar ? auth.user.avatar : "/images/avatar-user.webp"} />
                        <span>Admin</span>
                        <TbChevronDown size={16} />
                    </div>
                </Dropdown>
            </div>
        </>
    )
}

export default Header