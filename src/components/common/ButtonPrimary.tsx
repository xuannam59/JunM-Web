import { Button } from 'antd'

interface IProp {
    onClick: () => void;
    title: string;
    className?: string;
    icon?: React.ReactNode;
    loading?: boolean;
}

const ButtonPrimary = ({onClick, title, className, icon, loading}: IProp) => {
  return (
    <Button
        type='primary'
        onClick={onClick}
        loading={loading}
        className={`
          !bg-gradient-to-r from-purple-500 to-pink-500 !border-none opacity-80 hover:opacity-100 
          hover:!bg-gradient-to-tl
          ${className}`}
    >
        {icon}
        <span className='font-medium'>
            {title}
        </span>
    </Button>
  )
}

export default ButtonPrimary