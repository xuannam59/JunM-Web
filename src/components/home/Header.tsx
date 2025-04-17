import React from 'react';
import { Input, Button, Avatar, Dropdown, MenuProps, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/utils/ThemeProvider';
import { TbArrowLeft, TbArrowRight, TbLayoutDashboard, TbLogout, TbSearch, TbSettings, TbUser } from 'react-icons/tb';

const Header: React.FC = () => {
    const { darkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const items: MenuProps['items'] = [
       {
        key: "dashboard",
        label: "Dashboard",
        icon: <TbLayoutDashboard size={24} />
       },
        {
            key: 'logout',
            label: 'Logout',
            icon: <TbLogout size={24}/>,
        },
        
    ];

    return (
        <header className={`px-[60px] h-[70px] fixed top-0 right-0 left-[240px] flex items-center shadow-sm`}>
            <div className={`flex items-center justify-between w-full`}>
                <div className="flex items-center gap-3">
                    <Button type="text" disabled icon={<TbArrowLeft size={20}/>} />
                    <Button type="text" disabled icon={<TbArrowRight size={20}/>} />
                    <Input 
                        prefix={<TbSearch size={24} className='text-gray-500'/>} 
                        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát, ..." 
                        className={`!w-[440px] h-[40px] !rounded-full ${darkMode ? '!bg-[#2d2d2d]' : '!bg-[#f5f5f5]'} border-none`}
                    />
                </div>
                
                <div className="flex items-center gap-4">
                    <Tooltip title="Cài đặt">
                    <div 
                        className={`${darkMode ? "bg-[#323232]" : "bg-[#F2F2F2]"} p-2 rounded-full cursor-pointer`}
                        onClick={toggleTheme}
                    >
                        <TbSettings size={22} color={darkMode ? '#C2C2C2' :  "#42484E"}/>
                    </div>
                    </Tooltip>
                    <Dropdown menu={{ items }} placement="bottomRight" trigger={["click"]} className='cursor-pointer'>
                        <Avatar icon={<TbUser size={22}/>}/>
                    </Dropdown>
                </div>
            </div>
        </header>
    );
};

export default Header;