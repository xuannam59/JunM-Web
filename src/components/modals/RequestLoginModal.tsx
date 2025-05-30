import { Modal, Button } from "antd"
import { useNavigate } from "react-router-dom"
import Lottie from "lottie-react"
import requestLoginAnimation from "@/assets/animations/request-login.json"
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { routes } from "@/utils/constant";

interface IProp {
    open: boolean;
    onClose: () => void;
}

const RequestLoginModal = ({open, onClose}: IProp) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        onClose();
        navigate(`/${routes.LOGIN}`);
    }

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            width={450}
        >
            <div className="flex flex-col items-center py-6">
                <div className="w-64 h-64 mb-4">
                    <Lottie 
                        animationData={requestLoginAnimation}
                        loop={true}
                    />
                </div>
                <h3 className="text-xl font-semibold mb-2">Đăng nhập để tiếp tục</h3>
                <p className="text-gray-500 text-center mb-6">
                    Vui lòng đăng nhập để sử dụng tính năng này. Nếu bạn chưa có tài khoản, hãy đăng ký ngay.
                </p>
                <ButtonPrimary
                    onClick={handleLogin}
                    title="Đăng nhập"
                    className="w-full"
                />
            </div>
        </Modal>
    )
}

export default RequestLoginModal