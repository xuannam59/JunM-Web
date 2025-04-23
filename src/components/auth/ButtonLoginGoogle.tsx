import { Button } from "antd"
import React from "react"
import { FcGoogle } from "react-icons/fc"

interface IProps {
    isLoading: boolean
}

const baseURL = import.meta.env.VITE_BACKEND_URL as string;

const ButtonGoogleLogin: React.FC<IProps> = ({isLoading}) => {
    const handleGoogleLogin = () => {
        window.location.href = `${baseURL}/api/v1/auths/google/login`;
    }

  return (
   <>
    <Button
      icon={<FcGoogle size={20}/>}
      size="large"
      block
      loading={isLoading}
      onClick={handleGoogleLogin}
      className="flex items-center justify-center gap-2 rounded-lg h-12 text-lg"
    >
      Continue with Google
    </Button>
   </>
  )
}

export default ButtonGoogleLogin