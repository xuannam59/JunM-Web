import { callGetAccount } from "./apis/login.api";
import Routers from "./routers/Router"
import { useEffect } from "react";
import { routes } from "./utils/constant";
import { useAppDispatch } from "./ redux/hook";
import { doGetAccount } from "./ redux/reducers/auth.reducer";


function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        getAccount();
    }, []);

    const getAccount = async () => {
        const routeAut = ["/login", "/register"];
        if (routeAut.includes(window.location.pathname)) {
            return;
        }
        const res = await callGetAccount();
        if (res.data) {
            dispatch(doGetAccount(res.data));
        }
    }

    return (
        <Routers />
    )
}

export default App
