import { callToggleLikeSong } from '@/apis/song.api';
import { useAppSelector } from '@/redux/hook';
import { App, Button, Tooltip } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { TbDots, TbHeart, TbHeartFilled } from 'react-icons/tb';


const SongInfo: React.FC = () => {
    const [animation, setAnimation] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const {message, notification} = App.useApp();

    const auth = useAppSelector(state => state.auth);
    const {isAuthenticated, user} = auth;
    const currentSong = useAppSelector(state => state.song.currentSong);

    useEffect(() => {
        if(currentSong && currentSong.title && currentSong.title.length > 27) {
          setAnimation(true);
        } else {
          setAnimation(false);
        }
    }, [currentSong]);

    useEffect(() => {
        setIsLiked(currentSong.likes.some(like => like.user_id === user.user_id));
    }, [currentSong.likes, user.user_id]);

    const handleToggleLikeSong = useCallback(async() => {
        if(!isAuthenticated) {
            message.error("Please login to like song");
            return;
        }
        const res = await callToggleLikeSong(currentSong.song_id);
        if(res.data){
            message.success(res.data);
            setIsLiked(!isLiked);
        }else{
            notification.error({
                message: "Like error",
                description: res.message
            });
        }
    }, [currentSong.song_id, isAuthenticated, message, notification, isLiked]);

  return (
    <div className="w-[30%] flex items-center">
        <div className="flex items-center">
            <div className="w-[64px] h-[64px] rounded-sm overflow-hidden mr-4">
            <img
                src={currentSong.thumbnail_url || "/images/default-thumbnail.webp"}
                alt={currentSong.title || "song-thumb"}
                className="w-full h-full object-cover"
            />
            </div>
            <div className="flex flex-col max-w-[200px]">
            <div className="relative w-full overflow-hidden">
                <div className={`flex w-[200%] whitespace-nowrap ${animation && "marquee-animation"}`}>
                <div className="w-[100%] pr-2.5 text-sm">
                    {currentSong.title || "Song name"}
                </div>
                {animation &&
                    <div className="w-[100%] pr-2.5 text-sm" aria-hidden="true">
                    {currentSong.title || "Song name"}
                    </div>
                }
                </div>
            </div>
            <span className="text-sm text-gray-500 truncate">{currentSong.artist.artist_name || "Tên ca sĩ"}</span>
            </div>
            <div className="flex items-center ml-2.5">
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
                <Tooltip title="Xem thêm" color=''>
                    <Button type='text' className='hover:!text-[#8f5cff] transition' shape='circle'>
                        <TbDots size={20} />
                    </Button>
                </Tooltip>
            </div>
        </div>
    </div>
  );
};

export default SongInfo; 