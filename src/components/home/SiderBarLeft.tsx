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

const SiderBarLeft = () => {
    const { darkMode } = useTheme()
    const navigate = useNavigate()
    const location = useLocation()

    const menuItems: MenuProps['items'] = [
        {
            label: 'Menu',
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
            label: 'Library',
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
            label: 'Playlist and favorites',
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
        <div className={`min-h-[100vh] max-h-[100vh] w-[240px] flex flex-col p-5 pb-0 pe-1 rounded-l-xl shadow-sm  overflow-y-auto
            ${darkMode ? `bg-[#292929] text-gray-300` : 'bg-[#F9F9F9] text-black'}`}
        >
            <div className="flex justify-center">
                <h1 className="text-xl font-bold mb-4 text-center w-fit
                bg-gradient-to-r from-[#EE10B0] to-[#0E9EEF] text-transparent bg-clip-text">
                    JunMusic
                </h1>
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
    )
}

export default SiderBarLeft