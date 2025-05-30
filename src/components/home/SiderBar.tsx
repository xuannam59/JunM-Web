import { useAppSelector } from '@/redux/hook'
import { routes } from '@/utils/constant'
import { useTheme } from '@/utils/ThemeProvider'
import type { MenuProps } from 'antd'
import { Image, Menu } from 'antd'
import { useState } from 'react'
import { TbHistory, TbHome, TbLibrary, TbPlaylist } from 'react-icons/tb'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import RequestLoginModal from '../modals/RequestLoginModal'


const SiderBar = () => {
    const { darkMode } = useTheme()
    const location = useLocation()
    const navigate = useNavigate()
    const [openRequestLoginModal, setOpenRequestLoginModal] = useState(false);

    const auth = useAppSelector(state => state.auth);

    const menuItems: MenuProps['items'] = [
        {
            key: '/library',
            icon: <TbLibrary size={20}/>,
            label: "Thư viện",
            onClick: () => {
                if (!auth.isAuthenticated) {
                    setOpenRequestLoginModal(true)
                    return;
                }
                navigate(`/${routes.LIBRARY}`)
            }
        },
        {
            key: `${routes.DEFAULT}`,
            icon: <TbHome size={20}/>,
            label: <Link to={routes.DEFAULT}>Khám phá</Link>
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

            <RequestLoginModal
                open={openRequestLoginModal}
                onClose={() => setOpenRequestLoginModal(false)}
            />
        </>

    )
}

export default SiderBar