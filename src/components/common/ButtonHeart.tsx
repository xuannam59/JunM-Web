import { callToggleLikeSong } from '@/apis/song.api';
import { useAppSelector } from '@/redux/hook';
import { App, Button, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { TbHeart, TbHeartFilled } from 'react-icons/tb';
import RequestLoginModal from '../modals/RequestLoginModal';
import { ISong } from '@/types/song.type';

interface IProp {
    song: ISong;
}

const ButtonHeart = ({song}: IProp) => {
    const {message, notification} = App.useApp();
    const {isAuthenticated, user} = useAppSelector(state => state.auth);

    const [isLiked, setIsLiked] = useState(false);
    const [isOpenRequestLoginModal, setIsOpenRequestLoginModal] = useState(false);

    const handleToggleLikeSong = useCallback(async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if(!isAuthenticated) {
            setIsOpenRequestLoginModal(true);
            return;
        }
        const res = await callToggleLikeSong(song.song_id);
        if(res.data){
            message.success(res.data);
            setIsLiked(!isLiked);
        }else{
            notification.error({
                message: "Like error",
                description: res.message
            });
        }
    }, [song.song_id, isAuthenticated, message, notification, isLiked]);

    useEffect(() => {
        setIsLiked(song.likes.includes(user.user_id));
    }, [song.likes, user.user_id]);

  return ( <>
    <Tooltip title={isLiked ? "Bỏ yêu thích" : "Yêu thích"}>
        <Button 
            type='text' 
            className="hover:!text-[#FF0000] transition" 
            shape="circle"
            onClick={handleToggleLikeSong}
        >
            {isLiked ? 
                <TbHeartFilled size={20} className='text-[#FF0000]'/>
                :
                <TbHeart size={20}/>
            }
        </Button>
    </Tooltip>

    <RequestLoginModal 
        open={isOpenRequestLoginModal} 
        onClose={() => setIsOpenRequestLoginModal(false)} 
    />
  </>
  )
}

export default ButtonHeart