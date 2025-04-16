import React from 'react';
import { Input, Button, Avatar, Dropdown, MenuProps } from 'antd';
import {
    LeftOutlined, 
    RightOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/utils/ThemeProvider';
import { TbArrowLeft, TbArrowRight, TbSearch } from 'react-icons/tb';

const Header: React.FC = () => {
    const { darkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'Account Settings',
            icon: <SettingOutlined />,
        },
        {
            key: '2',
            label: 'Logout',
            icon: <LogoutOutlined />,
        },
    ];

    return (
        <header className={`w-full px-8 py-4 `}>
            <div className={`flex items-center justify-between`}>
            <div className="flex items-center gap-3">
                <Button type="text" disabled icon={<TbArrowLeft size={20}/>} />
                <Button type="text" disabled icon={<TbArrowRight size={20}/>} />
                <Input 
                    prefix={<TbSearch size={20} className='text-gray-500'/>} 
                    placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát, ..." 
                    className={`!w-[440px] h-[40px] !rounded-full ${darkMode ? 'bg-[#2d2d2d]' : 'bg-[#f5f5f5]'} border-none`}
                />
            </div>
            
            <div className="flex items-center gap-4">
                <Button 
                    onClick={toggleTheme}
                    type="text"
                >
                    {darkMode ? '🌙' : '☀️'}
                </Button>
                <Dropdown menu={{ items }} placement="bottomRight">
                    <Avatar icon={<UserOutlined />}/>
                </Dropdown>
            </div>
            </div>
        </header>
    );
};

export default Header;