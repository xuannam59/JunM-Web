import { useTheme } from '@/utils/ThemeProvider'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { 
    HomeOutlined, 
    CompassOutlined, 
    CustomerServiceOutlined, 
    ClockCircleOutlined, 
    PlaySquareOutlined, 
    HeartOutlined, 
    UnorderedListOutlined,
    PlusCircleOutlined
} from '@ant-design/icons'

const SiderBar = () => {
    const { darkMode } = useTheme()
    const navigate = useNavigate()
    const location = useLocation()

    const menuItems: MenuProps['items'] = [
        {
            type: 'group',
            children: [
                {
                    key: '/',
                    icon: <HomeOutlined />,
                    label: 'Home',
                },
                {
                    key: '/discover',
                    icon: <CompassOutlined />,
                    label: 'Discover',
                },
                {
                    key: '/albums',
                    icon: <CustomerServiceOutlined />,
                    label: 'Albums',
                },
                {
                    key: '/artists',
                    icon: <CustomerServiceOutlined />,
                    label: 'Artists',
                },
            ],
        },
        {
            type: 'group',
            children: [
                {
                    key: '/recently',
                    icon: <ClockCircleOutlined />,
                    label: 'Recently Added',
                },
                {
                    key: '/most-played',
                    icon: <PlaySquareOutlined />,
                    label: 'Most played',
                },
            ],
        },
        {
            type: 'group',
            children: [
                {
                    key: '/favorites',
                    icon: <HeartOutlined />,
                    label: 'Your favorites',
                },
                {
                    key: '/playlist',
                    icon: <UnorderedListOutlined />,
                    label: 'Your playlist',
                },
                {
                    key: 'add-playlist',
                    icon: <PlusCircleOutlined />,
                    label: 'Add playlist',
                    className: 'text-[#2E9CFF] hover:text-[#2E9CFF]',
                },
            ],
        }
    ]

    const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
        if (key === 'logout') {
            // Xử lý logout
            console.log('Logout clicked')
            return
        }
        if (key === 'add-playlist') {
            // Xử lý thêm playlist
            console.log('Add playlist clicked')
            return
        }
        navigate(key)
    }

    return (
        <>
        <div className="flex flex-col items-center">
            <div className="flex justify-center pt-3">
                <span className="text-2xl font-bold mb-4 text-center w-fit
                bg-gradient-to-r from-[#EE10B0] to-[#0E9EEF] text-transparent bg-clip-text">
                    JunMusic
                </span>
            </div>

            <Menu
                mode="inline"
                selectedKeys={[location.pathname]}
                items={menuItems}
                onClick={handleMenuClick}
                className={`border-0 ${darkMode ? '!bg-[#292929]' : '!bg-[#F9F9F9]'} !border-none`}
                style={{
                    fontSize: '14px',
                }}
                theme={darkMode ? 'dark' : 'light'}
            />
             </div>
        </>
       
    )
}

export default SiderBar