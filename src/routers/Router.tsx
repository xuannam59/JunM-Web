import AuthLayout from '@/components/Auth/AuthLayout'
import LoginPage from '@/page/Auth/LoginPage'
import RegisterPage from '@/page/Auth/RegisterPage'
import NotFound from '@/page/Error/NotFound'
import HomePage from '@/page/Home/HomePage'
import { routes } from '@/utils/constant'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.DEFAULT} element={<HomePage/>} />
        <Route element={<AuthLayout/>}>
            <Route path={routes.LOGIN} element={<LoginPage/>}/>
            <Route path={routes.REGISTER} element={<RegisterPage/>}/>
        </Route>
        <Route path={routes.NOT_FOUND} element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router