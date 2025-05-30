import Lottie from 'lottie-react';
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import loadingAnimation from "@/assets/animations/loading.json"
import { useTheme } from '@/utils/ThemeProvider';

const ConfirmGoogle = () => {
    const { darkMode } = useTheme()
    const { access_token } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (access_token) {
            window.localStorage.setItem("junm_access_token", access_token);
            navigate("/");
        }
    }, []);
    return (
        <div className={`h-[100vh] w-[100vw] flex justify-center items-center 
        ${darkMode ? "bg-[#292929]" : "bg-[#F9F9F9]"}`}>
            <div className="w-40">
                <Lottie animationData={loadingAnimation} loop={true} />
            </div>
        </div>
    )
}

export default ConfirmGoogle