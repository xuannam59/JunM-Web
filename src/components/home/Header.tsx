import { useAppDispatch, useAppSelector } from '@/ redux/hook';
import { doLogout } from '@/ redux/reducers/auth.reducer';
import { callLogout } from '@/apis/auth.api';
import { routes } from '@/utils/constant';
import { useTheme } from '@/utils/ThemeProvider';
import { App, Avatar, Button, Dropdown, Input, MenuProps, Tooltip } from 'antd';
import React from 'react';
import { TbArrowLeft, TbArrowRight, TbLayoutDashboard, TbLogout, TbMoon, TbSearch, TbSettings, TbSun } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const {message, notification} = App.useApp();
    const auth = useAppSelector(state => state.auth);
    const { darkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const items: MenuProps['items'] = [
        
        ...(auth.user.role === "ADMIN" ? 
            [{
                key: "dashboard",
                label: <Link to={routes.ADMIN}>Dashboard</Link>,
                icon: <TbLayoutDashboard size={24} />
            }] :
        []),
        {
            key: 'logout',
            label: 'Logout',
            icon: <TbLogout size={24} />,
            onClick: () => handleLogout()
        },

    ];

    const handleLogout = async () => {
        const res = await callLogout();
        if(res.data) {
            message.success(res.data);
            dispatch(doLogout());
        }else {
            notification.error({
                message: "Logout error",
                description:res.message
            })
        }
    }

    return (
        <>
            <div className={`flex items-center justify-between w-full`}>
                <div className="flex items-center gap-3">
                    <Button type="text" disabled icon={<TbArrowLeft size={20} />} />
                    <Button type="text" disabled icon={<TbArrowRight size={20} />} />
                    <Input
                        prefix={<TbSearch size={24} className='text-gray-500' />}
                        placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát, ..."
                        className={`!w-[440px] h-[40px] !rounded-full ${darkMode ? '!bg-[#2d2d2d]' : '!bg-[#f5f5f5]'} border-none`}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        type="text"
                        onClick={toggleTheme}
                        className={darkMode ? 'text-gray-300 hover:text-yellow-400' : ''}
                    >
                        {darkMode ? <TbSun size={20} className="text-yellow-400" /> : <TbMoon size={20} />}
                    </Button>
                    <Tooltip title="Cài đặt">
                        <div
                            className={`${darkMode ? "bg-[#323232]" : "bg-[#F2F2F2]"} p-2 rounded-full cursor-pointer`}
                        >
                            <TbSettings size={22} color={darkMode ? '#C2C2C2' : "#42484E"} />
                        </div>
                    </Tooltip>  
                   
                    {auth.isAuthenticated ?  
                    <Dropdown
                        menu={{ items, style: { backgroundColor: darkMode ? "#333333" : "#ffffff" } }}
                        placement="bottomRight"
                        trigger={["click"]}
                        className='cursor-pointer'
                    >
                        <Avatar src={auth.user.avatar ? auth.user.avatar : "/images/avatar-user.webp"} size={40} />
                    </Dropdown> 
                    : 
                    <div className="flex gap-2">
                        <Button type='primary' onClick={() => navigate("/login")}>Đăng nhập</Button>
                        <Button color="primary" variant="outlined" onClick={() => navigate("/register")}>Đăng ký</Button>
                    </div>
                    }
                </div>
            </div>
        </>
    );
};

export default Header;