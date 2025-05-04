import { routes } from '@/utils/constant'
import { useTheme } from '@/utils/ThemeProvider'
import type { MenuProps } from 'antd'
import { Image, Menu } from 'antd'
import { TbHistory, TbHome, TbPlaylist } from 'react-icons/tb'
import { Link, useLocation } from 'react-router-dom'


const SiderBar = () => {
    const { darkMode } = useTheme()
    const location = useLocation()

    const menuItems: MenuProps['items'] = [
        {
            key: `${routes.DEFAULT}`,
            icon: <TbHome size={20}/>,
            label: <Link to={routes.DEFAULT}>Home</Link>
        },
        {
            key: '/playlists',
            icon: <TbPlaylist size={20}/>,
            label: <Link to="/playlists">Playlists</Link>
        },
        {
            key: '/history',
            icon: <TbHistory size={20}/>,
            label: <Link to="/history">History</Link>
        }
    ]

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="flex justify-center items-center pt-2 h-[70px]">
                    <Link to="/">
                        <Image src='/images/logo.webp' width={120} preview={false} />
                    </Link>
                </div>

                <Menu
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
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