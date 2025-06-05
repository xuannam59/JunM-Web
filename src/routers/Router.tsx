import AdminLayout from '@/layouts/AdminLayout'
import AuthLayout from '@/layouts/AuthLayout'
import HomeLayout from '@/layouts/HomeLayout'
import ArtistPage from '@/page/admin/artist/ArtistPage'
import DashboardPage from '@/page/admin/dashboard/DashboardPage'
import PlayListPage from '@/page/admin/playlist/PlayListPage'
import SettingPage from '@/page/admin/setting/SettingPage'
import SongPage from '@/page/admin/song/SongPage'
import UserPage from '@/page/admin/user/UserPage'
import VideoPage from '@/page/admin/video/VideoPage'
import ConfirmGoogle from '@/page/auth/ConfirmGoogle'
import LoginPage from '@/page/auth/LoginPage'
import RegisterPage from '@/page/auth/RegisterPage'
import NotFound from '@/page/error/NotFound'
import HomePage from '@/page/home/HomePage'
import LibraryPage from '@/page/library/LibraryPage'
import PlaylistDetail from '@/page/playlist/PlaylistDetail'
import PlaylistPage from '@/page/playlist/PlaylistPage'
import { routes } from '@/utils/constant'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<HomeLayout />}>
                    <Route path={routes.DEFAULT} element={<HomePage />} />
                    <Route path={routes.LIBRARY} element={<LibraryPage/>} />
                    <Route path={routes.PLAYLIST}>
                        <Route index element={<PlaylistPage />} />
                        <Route path={":id"} element={<PlaylistDetail />} />
                    </Route>
                </Route>
                <Route element={<AuthLayout />}>
                    <Route path={routes.LOGIN} element={<LoginPage />} />
                    <Route path={routes.REGISTER} element={<RegisterPage />} />
                </Route>
                <Route path={routes.ADMIN} element={<AdminLayout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path={routes.ADMIN_USER} element={<UserPage />} />
                    <Route path={routes.ADMIN_ARTIST} element={<ArtistPage />} />
                    <Route path={routes.ADMIN_SONG} element={<SongPage />} />
                    <Route path={routes.ADMIN_VIDEO} element={<VideoPage />} />
                    <Route path={routes.ADMIN_PLAYLIST} element={<PlayListPage />} />
                    <Route path={routes.ADMIN_SETTING} element={<SettingPage />} />
                </Route>
                <Route path={routes.NOT_FOUND} element={<NotFound />} />
                <Route path={routes.GOOGLE} element={<ConfirmGoogle />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Routers