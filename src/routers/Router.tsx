import AdminLayout from '@/layouts/AdminLayout'
import AuthLayout from '@/layouts/AuthLayout'
import HomeLayout from '@/layouts/HomeLayout'
import AlbumPage from '@/page/Admin/Album/AlbumPage'
import ArtistPage from '@/page/Admin/Artist/ArtistPage'
import DashboardPage from '@/page/Admin/Dashboard/DashboardPage'
import PlayListPage from '@/page/Admin/PlayList/PlayListPage'
import SettingPage from '@/page/Admin/Setting/SettingPage'
import SongPage from '@/page/Admin/Song/SongPage'
import UserPage from '@/page/Admin/User/UserPage'
import VideoPage from '@/page/Admin/Video/VideoPage'
import LoginPage from '@/page/Auth/LoginPage'
import RegisterPage from '@/page/Auth/RegisterPage'
import NotFound from '@/page/Error/NotFound'
import HomePage from '@/page/Home/HomePage'
import { routes } from '@/utils/constant'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout/>}>
          <Route path={routes.DEFAULT} element={<HomePage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path={routes.LOGIN} element={<LoginPage />} />
          <Route path={routes.REGISTER} element={<RegisterPage />} />
        </Route>
        <Route path={routes.ADMIN} element={<AdminLayout/>}>
          <Route index element={<DashboardPage/>}/>
          <Route path={routes.ADMIN_USER} element={<UserPage/>}/>
          <Route path={routes.ADMIN_ARTIST} element={<ArtistPage/>}/>
          <Route path={routes.ADMIN_SONG} element={<SongPage/>}/>
          <Route path={routes.ADMIN_VIDEO}element={<VideoPage/>}/>
          <Route path={routes.ADMIN_ALBUM} element={<AlbumPage/>}/>
          <Route path={routes.ADMIN_PLAYLIST} element={<PlayListPage/>}/>
          <Route path={routes.ADMIN_SETTING} element={<SettingPage/>}/>
        </Route>
        <Route path={routes.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers